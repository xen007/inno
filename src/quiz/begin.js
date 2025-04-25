import React, { Fragment, Component } from "react";
import Entete from "../general_component/entete";
import { Helmet } from "react-helmet";
import { BiIntersect } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import { BsClock } from "react-icons/bs";
import '../style/begin.scss'
import correctNotif from '../quiz/audio/correct-answer.mp3'
import wrongNotif from '../quiz/audio/wrong-answer.mp3'
import buttonSound from '../quiz/audio/button-sound.mp3'
import withNavigate from "./utils/withNavigate";
import { AuthContext } from '../context/AuthProvider';
import config from "../utils/config";

class Begin extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: "",
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
             isLoggedIn: false,
        };
        this.interval = null;
    }

    componentDidMount() {
        const auth = this.context.auth; // Access auth from AuthContext
        if (auth) {
            // User is logged in - proceed accordingly
            this.setState(
                { isLoggedIn: true },
                () => this.fetchQuestions()
            );
        } else {
            // User is not logged in - handle gracefully
            this.setState(
                { isLoggedIn: false },
                () => this.fetchQuestions()
            );
        }

        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchQuestions = async () => {
        const { location } = this.props;
        const formValue = location?.state || {}; // Ensure location.state is defined
    
        try {
            const response = await fetch(`${config.apiBaseUrl}/question.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValue),
            });
    
            if (!response.ok) {
                throw new Error("Echc lors de la recherche. Verifiez svp.");
            }
    
            const data = await response.json();
    
            if (Array.isArray(data) && data.length > 0) {
                let questionsToDisplay;
    
                if (this.state.isLoggedIn) {
                    // Shuffle all questions for logged-in users
                    questionsToDisplay = this.shuffleArray(data);
                } else {
                    // Slice first 5 questions and then shuffle them for not logged-in users
                    const firstFiveQuestions = data.slice(0, 5);
                    questionsToDisplay = this.shuffleArray(firstFiveQuestions);
                }
    
                this.setState({
                    questions: questionsToDisplay,
                    loading: false,
                    numberOfQuestions: questionsToDisplay.length,
                }, () => {
                    this.displayQuestion(questionsToDisplay);
                });
            } else {
                this.setState({ loading: false });
                alert("Pas de Questions Disponible.");
            }
        } catch (error) {
            this.setState({
                error: error.message,
                loading: false,
            });
            console.error("Erreur lors de la Recherche:", error);
        }
    };
    
    shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
        }
        return shuffled;
    };
    
    displayQuestion = (questions = this.state.questions) => {
        const { currentQuestionIndex, numberOfQuestions } = this.state;
    
        if (questions.length === 0 || currentQuestionIndex < 0 || currentQuestionIndex >= numberOfQuestions) {
            alert("Index inexistant ou pas de questions.");
            return;
        }
    
        // Use the existing showOptions method to reset visibility
        this.showOptions();
    
        const currentQuestion = questions[currentQuestionIndex] || {};
        const nextQuestion = questions[currentQuestionIndex + 1] || null;
        const previousQuestion = questions[currentQuestionIndex - 1] || null;
        const answer = currentQuestion.answer || '';
    
        this.setState(
            {
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer,
            },
            () => {
                this.handleDisableButton();
            }
        );
    };
    
    renderAuthMessage = () => {
        const { isLoggedIn } = this.state;

        return isLoggedIn ? (
            <p className="auth-message">Vous êtes Connecté!</p>
        ) : (
            <p className="auth-message">Vous n'êtes pas Connecté ! Vous aurez droit à 5 questions.</p>
        );
    };




    handleOptionClick = (e) => {
        const selectedOption = e.target.getAttribute('data-answer');
        if (selectedOption.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                document.getElementById('correctN').play();
            }, 300);
            this.correctAnswer();
        } else {
            setTimeout(() => {
                document.getElementById('wrongN').play();
            }, 300);
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
        if (window.confirm('Etes-vous sûr de vouloir Quitter?')) {
            this.props.navigate('/'); // Use navigate function passed as prop
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
// Custom toast function
showToast = (message, type) => {
    const toast = document.createElement('div');
    toast.innerText = message;
    Object.assign(toast.style, {
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px 20px',
        color: '#fff',
        backgroundColor: type === 'correct' ? 'green' : 'red',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        textAlign: 'center',
        minWidth: 'fit-content',
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        document.body.removeChild(toast);
    }, 1500); // Display length (in ms)
};

// Function to handle correct answers
correctAnswer = () => {
    this.showToast('Correct', 'correct'); // Show custom toast
    this.setState(
        (prevState) => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            numberOfAnswered: prevState.numberOfAnswered + 1,
        }),
        () => {
            if (this.state.currentQuestionIndex < this.state.numberOfQuestions - 1) {
                this.setState(
                    (prevState) => ({
                        currentQuestionIndex: prevState.currentQuestionIndex + 1,
                    }),
                    () => {
                        this.displayQuestion(this.state.questions);
                    }
                );
            } else {
                this.endGame();
            }
        }
    );
};

// Function to handle wrong answers
wrongAnswer = () => {
    navigator.vibrate(1000); // Vibrate for feedback
    this.showToast('Wrong', 'wrong'); // Show custom toast

    this.setState(
        (prevState) => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            numberOfAnswered: prevState.numberOfAnswered + 1,
        }),
        () => {
            if (this.state.currentQuestionIndex < this.state.numberOfQuestions - 1) {
                this.setState(
                    (prevState) => ({
                        currentQuestionIndex: prevState.currentQuestionIndex + 1,
                    }),
                    () => {
                        this.displayQuestion(this.state.questions);
                    }
                );
            } else {
                this.endGame();
            }
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
        alert('Fin de la Session!');
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
        const { currentQuestion, currentQuestionIndex, numberOfQuestions, hints, fiftyFifty, time, loading, error } = this.state;
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        return (
            <Fragment>
                <Entete />
                <Helmet><title>Commencer</title></Helmet>
                <Fragment>
                    <audio id="correctN" src={correctNotif}></audio>
                    <audio id="wrongN" src={wrongNotif}></audio>
                    <audio id="buttonS" src={buttonSound}></audio>
                </Fragment>
                <div className="questions container py-4">
                    <h2 className="text-center mb-4">Bienvenue Sur la page des Questions</h2>
                    {this.renderAuthMessage()}
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="lifeline">
                            <span onClick={this.handleFiftyFifty}>
                                <BiIntersect className="lifeline-icon" />
                            </span>
                            {fiftyFifty}
                        </p>
                        <p className="lifeline">
                            <span onClick={this.handleHints}>
                                <HiLightBulb className="lifeline-icon" />
                            </span>
                            {hints}
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                        <span className="lifeline">
                            {time?.minutes}:{time?.seconds} <BsClock />
                        </span>
                    </div>

                    <h5 className="text-center mb-3">{currentQuestion.question}</h5>
                    <div className="option-contain row">
                        <div className="col-12 col-md-6 mb-3">
                            <p onClick={this.handleOptionClick} className="option btn btn-outline-primary w-100" data-answer={currentQuestion.optionA}>{currentQuestion.optionA}</p>
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <p onClick={this.handleOptionClick} className="option btn btn-outline-primary w-100" data-answer={currentQuestion.optionB}>{currentQuestion.optionB}</p>
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <p onClick={this.handleOptionClick} className="option btn btn-outline-primary w-100" data-answer={currentQuestion.optionC}>{currentQuestion.optionC}</p>
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <p onClick={this.handleOptionClick} className="option btn btn-outline-primary w-100" data-answer={currentQuestion.optionD}>{currentQuestion.optionD}</p>
                        </div>
                    </div>
                    <div className="btn-contain d-flex flex-row flex-xs-column justify-content-between">
  {/* <button
    className="btn btn-secondary mb-0"
    id="previous-btn"
    onClick={this.handleBtnClick}
    disabled={this.state.previousButtonDisabled}
  >
    Previous
  </button> */}
  <button
    className="btn btn-success mb-0"
    id="next-btn"
    onClick={this.handleBtnClick}
    disabled={this.state.nextButtonDisabled}
  >
    Suivant
  </button>
  <button
    id="quit-btn"
    onClick={this.handleBtnClick}
    className="btn btn-danger mb-0"
  >
    Quitter
  </button>
</div>

                </div>
            </Fragment>
        );

    }
}

export default withNavigate(Begin);

