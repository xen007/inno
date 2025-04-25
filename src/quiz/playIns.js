import React, { Fragment } from "react";
import Entete from "../general_component/entete";
import Footer from "../general_component/Footer";
import '../style/instruction.scss';
import { Helmet } from "react-helmet";
import idea from "./img/idea.jpg";
import brain from "./img/brain.jpg";
import mark from "./img/question-mark.jpg";
import { Link } from "react-router-dom";
import { BiIntersect } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import Select from "./select";

export default function PlayIns() {
    return (
        <Fragment>
            <Helmet>
                <title>Quiz-Instructions</title>
            </Helmet>
            <Entete />
            <div className="instructions d-flex align-items-center justify-content-center">
                <div className="content-wrapper bg-dark text-light rounded p-4">
                    <h1 className="text-center mb-4">Comment répondre aux Questions</h1>
                    <p className="text-center">Assurez-vous de bien lire avant de continuer...</p>
                    <ul className="list-unstyled">
                        <li className="mb-3">Choisir la matière dans laquelle vous voulez réviser</li>
                        <li className="mb-3">
                            Choisir la matière dans laquelle vous voulez réviser
                            <div className="text-center">
                                <img src={brain} className="img-fluid my-3 rounded" alt="brain exercise" />
                            </div>
                        </li>
                        <li className="mb-3">
                            Choisir la matière dans laquelle vous voulez réviser
                            <div className="text-center">
                                <img src={mark} className="img-fluid my-3 rounded" alt="brain exercise" />
                            </div>
                        </li>
                        <li className="mb-3">
                            Choisir la matière dans laquelle vous voulez réviser
                            <div className="text-center">
                                <img src={idea} className="img-fluid my-3 rounded" alt="brain exercise" />
                            </div>
                        </li>
                        <li className="mb-3">
                            Selecting a 50-50 lifeline by clicking the icon
                            <span className="lifel"><BiIntersect /></span> will remove 2 wrong answers
                        </li>
                        <li className="mb-3">
                            Using a hint by clicking
                            <span className="lifel"><HiLightBulb /></span> will remove 1 wrong answer from the list leaving three possibilities
                        </li>
                    </ul>
                    <div className="text-center mt-4">
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                            {/* Button - Left */}
                            <Link to="/" className="btn btn-warning mb-2 mb-md-0 me-md-3">
                                Non, Acceuil
                            </Link>

                            {/* Select Component - Right */}
                            <Select />
                        </div>
                    </div>


                </div>
            </div>
            {/* <Footer /> */}
        </Fragment>
    );
}
