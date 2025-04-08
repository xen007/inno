import React, { Fragment, Component } from "react";
import Entete from "../general_component/entete";
import { Helmet } from "react-helmet";
import { BiIntersect } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import { BsClock } from "react-icons/bs";
import '../style/begin.scss';
import isEmpty from "./utils/isEmpty";
import M from 'materialize-css';
import correctNotif from '../quiz/audio/correct-answer.mp3';
import wrongNotif from '../quiz/audio/wrong-answer.mp3';
import buttonSound from '../quiz/audio/button-sound.mp3';
import withNavigate from "./utils/withNavigate";
import classnames from 'classnames';

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
        this.interval = null
    }

    componentDidMount() {
        this.fetchQuestions();
        this.startTimer()
    }

    fetchQuestions = () => {
        fetch('http://localhost/inno/api/question.php')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                this.setState(
                    {
                        questions: data,
                        loading: false
                    },
                    () => {
                        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
                        this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion);
                    }
                );
            })
            .catch((error) => {
                this.setState({
                    error: error.message,
                    loading: false
                });
                console.error('Error fetching questions:', error);
            });
    };

    displayQuestion = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(questions)) {
            currentQuestion = questions[currentQuestionIndex] || {};
            nextQuestion = questions[currentQuestionIndex + 1] || {};
            previousQuestion = questions[currentQuestionIndex - 1] || {};
            const answer = currentQuestion.answer || '';
            this.setState(
                {
                    currentQuestion,
                    nextQuestion,
                    previousQuestion,
                    numberOfQuestions: questions.length,
                    previousRandomNumbers: [],
                    answer
                },
                () => {
                    this.showOptions();
                    this.handleDisableButton()
                }
            );
        } else {
            alert("No questions available.");
        }
    };

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
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
        if (this.state.nextQuestion !== undefined) {
            this.setState(
                (prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex + 1
                }),
                () => {
                    this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                }
            );
        }
    };

    handlePrevBtnClick = () => {
        this.playBtnSound();
        if (this.state.previousQuestion !== undefined) {
            this.setState(
                (prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex - 1
                }),
                () => {
                    this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                }
            );
        }
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
        this.setState(
            (prevState) => ({
                score: prevState.score + 1,
                correctAnswers: prevState.correctAnswers + 1,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                numberOfAnswered: prevState.numberOfAnswered + 1
            }),
            () => {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        );
    };

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(
            (prevState) => ({
                wrongAnswers: prevState.wrongAnswers + 1,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                numberOfAnswered: prevState.numberOfAnswered + 1
            }),
            () => {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        );
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
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            while (true) {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
                    options.forEach((option, index) => {
                        if (index === randomNumber) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }));
                        }
                    });
                    break;
                }
                if (this.state.previousRandomNumbers.length >= 3) break;
            }
        }
    };

    handleFiftyFifty = () => {
        if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });
            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        randomNumbers.push(randomNumber);
                        count++;
                    } else {
                        while (true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                                randomNumbers.push(newRandomNumber);
                                count++;
                                break;
                            }
                        }
                    }
                }
            } while (count < 2);
            options.forEach((option, index) => {
                if (randomNumbers.includes(index)) {
                    option.style.visibility = 'hidden';
                }
            });
            this.setState((prevState) => ({
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFiftyFifty: true
            }));
        }
    };

    startTimer = () => {
        const countDownTime = Date.now() + 180000000
        this.interval = setInterval(() => {
            const now = new Date()
            const distance = countDownTime - now

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            if (distance < 0) {
                clearInterval(this.interval)
                this.setState({
                    time: {
                        seconds: 0,
                        minutes: 0
                    }
                }, () => {
                    alert('Quiz ended')
                    this.props.navigate('/revisions')
                })
            } else {
                this.setState({
                    time: {
                        seconds,
                        minutes
                    }
                })
            }
        }, 1000)
    }

    handleDisableButton = () => {
        const { previousQuestion, nextQuestion, currentQuestionIndex, numberOfQuestions } = this.state;
        this.setState({
            previousButtonDisabled: previousQuestion === undefined || currentQuestionIndex === 0,
            nextButtonDisabled: nextQuestion === undefined || currentQuestionIndex + 1 === numberOfQuestions
        });
    };

    render() {
        const { loading, error, currentQuestion, currentQuestionIndex, numberOfQuestions, hints, fiftyFifty, time } = this.state;

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
                    {loading && <div>Loading questions...</div>}
                    {error && <div>Error: {error}</div>}
                    {!loading && !error && (
                        <Fragment>
                            <h2>Hello sur la page de commencement</h2>
                            <div className="lifeline-contain">
                                <p className="lifeline">
                                    <span onClick={this.handleFiftyFifty}><BiIntersect className="lifeline-icon" /></span>
                                    <>{fiftyFifty}</>
                                </p>
                                <p className="lifeline">
                                    <span onClick={this.handleHints}><HiLightBulb className="lifeline-icon" /></span>
                                    <>{hints}</>
                                </p>
                            </div>
                            <div>
                                <p className="lifeline-contain">
                                    <span>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                                    <span className="lifeline">{time.minutes}:{time.seconds} <BsClock /></span>
                                </p>
                            </div>
                            <h5>{currentQuestion.question}</h5>
                            <div className="option-contain">
                                <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                                <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                            </div>
                            <div className="option-contain">
                                <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                                <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                            </div>
                            <div className="btn-contain">
                                <button
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
                                </button>
                                <button
                                    id="quit-btn"
                                    onClick={this.handleBtnClick}
                                    className="btn btn-danger"
                                >
                                    Quit
                                </button>
                            </div>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        )
    }

}
export default withNavigate(Begin)