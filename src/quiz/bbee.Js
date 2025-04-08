// import React, { Fragment, Component } from "react";
// import Entete from "../general_component/entete";
// import { Helmet } from "react-helmet";
// import { BiIntersect } from "react-icons/bi";
// import { HiLightBulb } from "react-icons/hi";
// import { BsClock } from "react-icons/bs";
// import '../style/begin.scss'
// import questions from './question.json'
// import isEmpty from "./utils/isEmpty";
// import M from 'materialize-css'
// import correctNotif from '../quiz/audio/correct-answer.mp3'
// import wrongNotif from '../quiz/audio/wrong-answer.mp3'
// import buttonSound from '../quiz/audio/button-sound.mp3'
// import { set } from "react-hook-form";
// import withNavigate from "./utils/withNavigate";

// class Begin extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             questions,
//             currentQuestion: {},
//             nextQuestion: {},
//             previousQuestion: {},
//             answer: '',
//             numberOfQuestions: 0,
//             numberOfAnswered: 0,
//             currentQuestionIndex: 0,
//             score: 0,
//             correctAnswers: 0,
//             wrongAnswers: 0,
//             hints: 5,
//             fiftyFifty: 2,
//             usedFiftyFifty: false,
//             previousRandomNumbers: [],
//             time: {}
//         }

//     }
//     componentDidMount() {
//         const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state
//         this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion)
//     }
//     displayQuestion = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
//         let { currentQuestionIndex } = this.state
//         if (!isEmpty(this.state.questions)) {
//             questions = this.state.questions
//             currentQuestion = questions[currentQuestionIndex]
//             nextQuestion = questions[currentQuestionIndex + 1]
//             previousQuestion = questions[currentQuestionIndex - 1]
//             const answer = currentQuestion.answer
//             this.setState({
//                 currentQuestion,
//                 nextQuestion,
//                 previousQuestion,
//                 numberOfQuestions: questions.length,
//                 previousRandomNumbers: [],
//                 answer
//             }, () => {
//                 this.showOptions()
//             })
//         }
//     }
//     handleOptionClick = (e) => {
//         if (e.target.innerHTML.toLowerCase() === this.state.answer.toLocaleLowerCase()) {
//             setTimeout(() => {
//                 document.getElementById('correctN').play()
//             }, 500);

//             this.correctAnswer()
//         } else {
//             setTimeout(() => {
//                 document.getElementById('wrongN').play()
//             }, 500);
//             this.wrongAnswer()
//         }
//     }
//     handleNxtBtnClick = () => {
//         this.playBtnSound()
//         if (this.state.nextQuestion !== undefined) {
//             this.setState(prevState => ({
//                 currentQuestionIndex: prevState.currentQuestionIndex + 1

//             }), () => {
//                 this.displayQuestion(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
//             })
//         }
//     }
//     handlePrevBtnClick = () => {
//         this.playBtnSound()
//         if (this.state.previousQuestion !== undefined) {
//             this.setState(prevState => ({
//                 currentQuestionIndex: prevState.currentQuestionIndex - 1

//             }), () => {
//                 this.displayQuestion(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
//             })
//         }
//     }
//     handleQuitBtnClick = () => {
//         this.playBtnSound()
//         if (window.confirm('Are you sure to quit ??')) {
//             this.props.navigate('/revisions');  // Use navigate function passed as prop
//         }
//     }
//     handleBtnClick = (e) => {
//         switch (e.target.id) {
//             case 'next-btn':
//                 this.handleNxtBtnClick()
//                 break;
//             case 'previous-btn':
//                 this.handlePrevBtnClick()
//                 break;
//             case 'quit-btn':
//                 this.handleQuitBtnClick()
//                 break;

//             default:
//                 break;
//         }


//     }
//     playBtnSound = () => {
//         document.getElementById('buttonS').play()
//     }
//     correctAnswer = () => {
//         M.toast({
//             html: 'Correct',
//             classes: 'toast-valid',
//             displayLength: 1500
//         })
//         this.setState(prevState => ({
//             score: prevState.score + 1,
//             correctAnswers: prevState.correctAnswers + 1,
//             currentQuestionIndex: prevState.currentQuestionIndex + 1,
//             numberOfAnswered: prevState.numberOfAnswered + 1
//         }), () => {
//             this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
//         })
//     }
//     wrongAnswer = () => {
//         navigator.vibrate(1000)
//         M.toast({
//             html: 'wrong',
//             classes: 'toast-invalid',
//             displayLength: 1500
//         })
//         this.setState(prevState => ({
//             wrongAnswers: prevState.wrongAnswers + 1,
//             currentQuestionIndex: prevState.currentQuestionIndex + 1,
//             numberOfAnswered: prevState.numberOfAnswered + 1
//         }), () => {
//             this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
//         })
//     }
//     showOptions = () => {
//         const options = Array.from(document.querySelectorAll('.option'))
//         options.forEach(option => {
//             option.style.visibility = 'visible'
//         })
//         this.setState({
//             usedFiftyFifty: false
//         })
//     }
//     handleHints = () => {
//         if (this.state.hints > 0) {
//             const options = Array.from(document.querySelectorAll('.option'))
//             let indexOfAnswer

//             options.forEach((option, index) => {
//                 if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
//                     indexOfAnswer = index
//                 }
//             })

//             while (true) {
//                 const randomNumber = Math.round(Math.random() * 3)
//                 if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
//                     options.forEach((option, index) => {
//                         if (index === randomNumber) {
//                             option.style.visibility = 'hidden'
//                             this.setState((prevState) => ({
//                                 hints: prevState.hints - 1,
//                                 previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
//                             }))
//                         }
//                     })
//                     break
//                 }
//                 if (this.state.previousRandomNumbers.length >= 3) break
//             }
//         }
//     }
//     handleFiftyFifty = () =>{
//         if(this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false){
//             const options = document.querySelectorAll('.option')
//             const randomNumbers = []
//             let indexOfAnswer 

//             options.forEach((option,index) =>{
//                 if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
//                     indexOfAnswer = index 
//                 }
//             })
//             let count = 0
//             do{
//                 const randomNumber = Math.round(Math.random() * 3)
//                 if(randomNumber !== indexOfAnswer){
//                     if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer) ){
//                         randomNumbers.push(randomNumber)
//                         count ++
//                     }else{
//                         while(true){
//                             const newRandomNumber = Math.round(Math.random() * 3)
//                             if(!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)){
//                                 randomNumbers.push(newRandomNumber)
//                                 count ++
//                                 break
//                             }
//                         }
//                     }
//                 }
//             }while(count < 2)
//             options.forEach((option, index) => {
//                 if (randomNumbers.includes(index)){
//                     option.style.visibility = 'hidden'
//                 }
//             })
//             this.setState(prevState => ({
//                 fiftyFifty: prevState.fiftyFifty - 1,
//                 usedFiftyFifty: true
//             }))
//         }
//     }

//     render() {
//         const { currentQuestion, currentQuestionIndex, numberOfQuestions, hints, fiftyFifty } = this.state
//         return (
//             <Fragment>
//                 <Entete />
//                 <Helmet><title>Start</title></Helmet>
//                 <Fragment>
//                     <audio id="correctN" src={correctNotif}></audio>
//                     <audio id="wrongN" src={wrongNotif}></audio>
//                     <audio id="buttonS" src={buttonSound}></audio>
//                 </Fragment>
//                 <div className="questions">
//                     <h2>Hello sur la page de commencement</h2>
//                     <div className="lifeline-contain">
//                         <p className="lifeline">
//                             <span onClick={this.handleFiftyFifty}><BiIntersect className="lifeline-icon" /> </span>
//                             < >{fiftyFifty}</>
//                         </p>
//                         <p className="lifeline">
//                             <span onClick={this.handleHints}><HiLightBulb className="lifeline-icon" /> </span>
//                             < >{hints}</>
//                         </p>
//                     </div>
//                     <div>
//                         <p className="lifeline-contain">
//                             <span >{currentQuestionIndex + 1} of {numberOfQuestions} </span>
//                             <span className="lifeline ">2:15 <span> <BsClock /></span></span>
//                         </p>
//                     </div>
//                     <h5>{currentQuestion.question}</h5>
//                     <div className="option-contain">
//                         <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
//                         <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>

//                     </div>
//                     <div className="option-contain">
//                         <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
//                         <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
//                     </div>
//                     <div className="btn-contain">
//                         <button id="previous-btn" onClick={this.handleBtnClick} className="btn btn-secondary">Previous</button>
//                         <button id="next-btn" onClick={this.handleBtnClick} className="btn btn-success">Next</button>
//                         <button id="quit-btn" onClick={this.handleBtnClick} className="btn btn-danger">Quit</button>
//                     </div>

//                 </div>

//             </Fragment>
//         )
//     }
// }
// export default withNavigate(Begin)

import React, { Fragment, Component } from "react";
import Entete from "../general_component/entete";
import { Helmet } from "react-helmet";
import { BiIntersect } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import { BsClock } from "react-icons/bs";
import '../style/begin.scss'
import questions from './question.json'
import isEmpty from "./utils/isEmpty";
import M from 'materialize-css'
import correctNotif from '../quiz/audio/correct-answer.mp3'
import wrongNotif from '../quiz/audio/wrong-answer.mp3'
import buttonSound from '../quiz/audio/button-sound.mp3'
import { set } from "react-hook-form";
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
        try {
            const response = await fetch('http://localhost/inno/api/question.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({
                questions: data,
                loading: false,
                numberOfQuestions: data.length // Update the number of questions here
            });
            this.displayQuestion(data);
        } catch (error) {
            this.setState({
                error: error.message,
                loading: false
            });
            console.error('Error fetching questions:', error);
        }
    };
    
    displayQuestion = (questions = this.state.questions) => {
        const { currentQuestionIndex, numberOfQuestions } = this.state;
        if (questions.length === 0) {
            alert("No questions available.");
            return;
        }
    
        if (currentQuestionIndex < 0 || currentQuestionIndex >= numberOfQuestions) {
            return; // Ensure index is within bounds
        }
    
        const currentQuestion = questions[currentQuestionIndex] || {};
        const nextQuestion = questions[currentQuestionIndex + 1] || {};
        const previousQuestion = questions[currentQuestionIndex - 1] || {};
        const answer = currentQuestion.answer || '';
    
        this.setState({
            currentQuestion,
            nextQuestion,
            previousQuestion,
            previousRandomNumbers: [],
            answer
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
        console.log(playerStats);
        setTimeout(() => {
            this.props.navigate('/');
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
                    <h2>Hello sur la page de commencement</h2>
                    <div className="lifeline-contain">
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
                    </div>
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

                </div>

            </Fragment>
        )
    }
}
export default withNavigate(Begin)
