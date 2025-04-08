import React, { Fragment, Component } from "react";
import Entete from "../general_component/entete";
import { Helmet } from "react-helmet";
import { BiIntersect } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import { BsClock } from "react-icons/bs";
import '../style/begin.scss'
import M from 'materialize-css'
import correctNotif from '../quiz/audio/correct-answer.mp3'
import wrongNotif from '../quiz/audio/wrong-answer.mp3'
import buttonSound from '../quiz/audio/button-sound.mp3'
import withNavigate from "./utils/withNavigate";

class Begin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnswered: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            previousRandomNumbers: [],
            time: {},
            loading: true,
            error: null,
            nextButtonDisabled: false,
            previousButtonDisabled: true,
        };
        this.interval = null;
    }

    componentDidMount() {
        this.fetchQuestions();
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchQuestions = async () => {
        const { location } = this.props; // Access location provided by withNavigate HOC
        const formValue = location.state; // Retrieve data passed through navigate
    
        try {
            const response = await fetch('http://localhost/inno/api/question.php', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValue), 
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch questions. Please check your backend.');
            }
    
            const data = await response.json();
    
            if (Array.isArray(data) && data.length > 0) {
                this.setState({
                    questions: data,
                    loading: false,
                    numberOfQuestions: data.length,
                }, () => {
                    this.displayQuestion(data); // Ensure questions are displayed after state update
                });
            } else {
                this.setState({ loading: false });
                alert("No questions available.");
            }
        } catch (error) {
            this.setState({
                error: error.message,
                loading: false,
            });
            console.error('Error fetching questions:', error);
        }
    };
    
    displayQuestion = (questions = this.state.questions) => {
        const { currentQuestionIndex, numberOfQuestions } = this.state;
    
        if (questions.length === 0 || currentQuestionIndex < 0 || currentQuestionIndex >= numberOfQuestions) {
            alert("Invalid question index or no questions available.");
            return;
        }
    
        const currentQuestion = questions[currentQuestionIndex] || {};
        const nextQuestion = questions[currentQuestionIndex + 1] || null;
        const previousQuestion = questions[currentQuestionIndex - 1] || null;
        const answer = currentQuestion.answer || '';
    
        this.setState({
            currentQuestion,
            nextQuestion,
            previousQuestion,
            answer,
        }, () => {
            this.showOptions();
            this.handleDisableButton();
        });
    };
        handleOptionClick = (e) => {
        const selectedOption = e.target.getAttribute('data-answer');
        if (selectedOption.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                document.getElementById('correctN').play();
            }, 500);
            this.correctAnswer();
        } else {
            setTimeout(() => {
                document.getElementById('wrongN').play();
            }, 500);
            this.wrongAnswer();
        }
    };

    handleNxtBtnClick = () => {
        this.playBtnSound();
        this.setState(
            (prevState) => {
                // Check if there are more questions ahead
                if (prevState.currentQuestionIndex < prevState.numberOfQuestions - 1) {
                    return { currentQuestionIndex: prevState.currentQuestionIndex + 1 };
                }
                return null; // Do nothing if there are no more questions ahead
            },
            () => {
                if (this.state.currentQuestionIndex >= this.state.numberOfQuestions) {
                    this.endGame();
                } else {
                    this.displayQuestion(this.state.questions);
                }
            }
        );
    };

    handlePrevBtnClick = () => {
        this.playBtnSound();
        this.setState(
            (prevState) => {
                // Check if there are previous questions
                if (prevState.currentQuestionIndex > 0) {
                    return { currentQuestionIndex: prevState.currentQuestionIndex - 1 };
                }
                return null; // Do nothing if there are no previous questions
            },
            () => {
                this.displayQuestion(this.state.questions);
            }
        );
    };

    handleQuitBtnClick = () => {
        this.playBtnSound();
        if (window.confirm('Are you sure to quit?')) {
            this.props.navigate('/revisions'); // Use navigate function passed as prop
        }
    };

    handleBtnClick = (e) => {
        switch (e.target.id) {
            case 'next-btn':
                this.handleNxtBtnClick();
                break;
            case 'previous-btn':
                this.handlePrevBtnClick();
                break;
            case 'quit-btn':
                this.handleQuitBtnClick();
                break;
            default:
                break;
        }
    };

    playBtnSound = () => {
        document.getElementById('buttonS').play();
    };

    correctAnswer = () => {
        M.toast({
            html: 'Correct',
            classes: 'toast-valid',
            displayLength: 1500
        });

        this.setState((prevState) => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            numberOfAnswered: prevState.numberOfAnswered + 1
        }), () => {
            if (this.state.currentQuestionIndex < this.state.numberOfQuestions - 1) {
                this.setState((prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex + 1
                }), () => {
                    this.displayQuestion(this.state.questions);
                });
            } else {
                this.endGame();
            }
        });
    };

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong',
            classes: 'toast-invalid',
            displayLength: 1500
        });

        this.setState((prevState) => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            numberOfAnswered: prevState.numberOfAnswered + 1
        }), () => {
            if (this.state.currentQuestionIndex < this.state.numberOfQuestions - 1) {
                this.setState((prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex + 1
                }), () => {
                    this.displayQuestion(this.state.questions);
                });
            } else {
                this.endGame();
            }
        });
    };

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));
        options.forEach((option) => {
            option.style.visibility = 'visible';
        });
        this.setState({
            usedFiftyFifty: false
        });
    };

    handleHints = () => {
        if (this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option')).filter(option => option.style.visibility !== 'hidden');
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.getAttribute('data-answer').toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            // Ensure there are more than just the correct answer remaining
            if (options.length > 1) {
                let removed = false;
                while (!removed) {
                    const randomNumber = Math.floor(Math.random() * options.length);
                    if (randomNumber !== indexOfAnswer) {
                        options[randomNumber].style.visibility = 'hidden';
                        this.setState((prevState) => ({
                            hints: prevState.hints - 1
                        }));
                        removed = true;
                    }
                }
            }
        }
    };

    handleFiftyFifty = () => {
        if (this.state.fiftyFifty > 0 && !this.state.usedFiftyFifty) {
            const options = Array.from(document.querySelectorAll('.option')).filter(option => option.style.visibility !== 'hidden');
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.getAttribute('data-answer').toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            // Ensure there are more than two options left
            if (options.length > 2) {
                let removedCount = 0;
                while (removedCount < 2) {
                    const randomNumber = Math.floor(Math.random() * options.length);
                    if (randomNumber !== indexOfAnswer && options[randomNumber].style.visibility !== 'hidden') {
                        options[randomNumber].style.visibility = 'hidden';
                        removedCount++;
                    }
                }
                this.setState((prevState) => ({
                    fiftyFifty: prevState.fiftyFifty - 1,
                    usedFiftyFifty: true
                }));
            }
        }
    };

    startTimer = () => {
        const countDownTime = Date.now() + 180000000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        seconds: 0,
                        minutes: 0
                    }
                }, () => {
                    this.endGame();
                });
            } else {
                this.setState({
                    time: {
                        seconds,
                        minutes
                    }
                });
            }
        }, 1000);
    };

    handleDisableButton = () => {
        const { previousQuestion, nextQuestion, currentQuestionIndex, numberOfQuestions } = this.state;
        this.setState({
            previousButtonDisabled: previousQuestion === undefined || currentQuestionIndex === 0,
            nextButtonDisabled: nextQuestion === undefined || currentQuestionIndex + 1 === numberOfQuestions
        });
    };
    endGame = () => {
        alert('Quiz has ended');
        const state = this.state;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnswered: state.numberOfAnswered,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            fiftyUsed: 2 - state.fiftyFifty,
            hintsUsed: 5 - state.hints
        };

        setTimeout(() => {
            this.props.navigate('/playIns/summary', {
                state: { playerStats }
            });

        }, 1000);
    };

    render() {
        const { currentQuestion, currentQuestionIndex, numberOfQuestions, hints, fiftyFifty, time } = this.state
        return (
            <Fragment>
                <Entete />
                <Helmet><title>Start</title></Helmet>
                <Fragment>
                    <audio id="correctN" src={correctNotif}></audio>
                    <audio id="wrongN" src={wrongNotif}></audio>
                    <audio id="buttonS" src={buttonSound}></audio>
                </Fragment>
                <div className="questions">
                    <h2>Hello sur la page de lancement</h2>
                    {/* <div className="lifeline-contain">
                        <p className="lifeline">
                            <span onClick={this.handleFiftyFifty}><BiIntersect className="lifeline-icon" /> </span>
                            < >{fiftyFifty}</>
                        </p>
                        <p className="lifeline">
                            <span onClick={this.handleHints}><HiLightBulb className="lifeline-icon" /> </span>
                            < >{hints}</>
                        </p>
                    </div>
                    <div>
                        <p className="lifeline-contain">
                            <span >{currentQuestionIndex + 1} of {numberOfQuestions} </span>
                            <span className="lifeline">{time.minutes}:{time.seconds} <BsClock /></span>
                        </p>
                    </div> */}
                    <h5>{currentQuestion.question}</h5>
                    <div className="option-contain">
                        <p onClick={this.handleOptionClick} className="option" data-answer={currentQuestion.optionA}>{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option" data-answer={currentQuestion.optionB}>{currentQuestion.optionB}</p>
                    </div>
                    <div className="option-contain">
                        <p onClick={this.handleOptionClick} className="option" data-answer={currentQuestion.optionC}>{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option" data-answer={currentQuestion.optionD}>{currentQuestion.optionD}</p>
                    </div>

                    <div className="btn-contain">
                        {/* <button
                            className="btn btn-secondary"
                            id="previous-btn"
                            onClick={this.handleBtnClick}
                            disabled={this.state.previousButtonDisabled}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-success"
                            id="next-btn"
                            onClick={this.handleBtnClick}
                            disabled={this.state.nextButtonDisabled}
                        >
                            Next
                        </button> */}
                        <button
                            id="quit-btn"
                            onClick={this.handleBtnClick}
                            className="btn btn-danger"
                        >
                            Quit
                        </button>
                    </div>

                </div>

            </Fragment>
        )
    }
}
export default withNavigate(Begin)
