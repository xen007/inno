import React, { Component, Fragment } from "react";
import withNavigate from "./utils/withNavigate";
import Entete from "../general_component/entete";
import { Helmet } from "react-helmet";
import { BiCheckCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hintsUsed: 0,
            fiftyFiftyUsed: 0
        };
    }

    componentDidMount() {
        const { location } = this.props;
        console.log('Location:', JSON.stringify(location, null, 2)); // Log the location object in a readable format
        if (location && location.state && location.state.playerStats) {
            console.log("Player stats found:", JSON.stringify(location.state.playerStats, null, 2)); // Log player stats if found in a readable format
            this.setState({
                score: (location.state.playerStats.score / location.state.playerStats.numberOfQuestions) * 100,
                numberOfQuestions: location.state.playerStats.numberOfQuestions,
                numberOfAnswered: location.state.playerStats.numberOfAnswered,
                correctAnswers: location.state.playerStats.correctAnswers,
                wrongAnswers: location.state.playerStats.wrongAnswers,
                hintsUsed: location.state.playerStats.hintsUsed,
                fiftyFiftyUsed: location.state.playerStats.fiftyUsed
            });
        } else {
            console.error("Player stats not found in location.state");
        }
        console.log(this.props); // Log props
    }

    render() {
        const {
            score,
            numberOfQuestions,
            numberOfAnswered,
            correctAnswers,
            wrongAnswers,
            hintsUsed,
            fiftyFiftyUsed
        } = this.state;

        // Remark Logic
        let remark;
        if (score <= 30) {
            remark = 'You need more practice';
        } else if (score > 30 && score <= 50) {
            remark = 'You were almost at passing';
        } else if (score > 50 && score <= 70) {
            remark = 'You can do better';
        } else if (score >= 71 && score <= 84) {
            remark = 'You did great';
        } else {
            remark = 'You are almost a genius!';
        }

        // Stats Conditional Display
        const stats = (numberOfQuestions === 0) ? (
            <Fragment>
                <h1 className="no-stats text-center">Pas de Stats Disponible</h1>
                <div className="d-flex justify-content-center mt-3">
                    <Link to="/revisions" className="btn btn-warning mx-2">Retour à l'Acceuil</Link>
                    <Link to="/playIns/begin" className="btn btn-primary mx-2">Essayer une Session</Link>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className="container mt-4">
                    <h2 className="text-center">Quiz Summary</h2>
                    <div className="text-center my-3">
                        <BiCheckCircle size={48} style={{ color: "green" }} />
                        <h1>Fin de la Session</h1>
                        <h4>{remark}</h4>
                        <h3>Votre score: {score.toFixed(2)}%</h3>
                    </div>

                    <div className="row">
                        <div className="col-6 text-end font-weight-bold">Nombre de Questions:</div>
                        <div className="col-6">{numberOfQuestions}</div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-end font-weight-bold">Nombre de Questions répondus:</div>
                        <div className="col-6">{numberOfAnswered}</div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-end font-weight-bold">Réponses Correctes:</div>
                        <div className="col-6">{correctAnswers}</div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-end font-weight-bold">Réponses éronées:</div>
                        <div className="col-6">{wrongAnswers}</div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-end font-weight-bold">Hints :</div>
                        <div className="col-6">{hintsUsed}</div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-end font-weight-bold">50/50s :</div>
                        <div className="col-6">{fiftyFiftyUsed}</div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Link to="/" className="btn btn-warning mx-2 ">Retour à L'Acceuil</Link>
                        <Link to="/playIns/" className="btn btn-primary mx-2">Essayer encore</Link>
                    </div>
                </div>
            </Fragment>
        );

        return (
            <Fragment>
                <Entete />
                <Helmet>
                    <title>Quiz-Stats</title>
                </Helmet>
                {stats}
            </Fragment>
        );
    }
}

export default withNavigate(Summary);
