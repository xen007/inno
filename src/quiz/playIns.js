import React, { Fragment } from "react";
import Entete from '../general_component/entete'
import Footer from '../general_component/Footer'
import '../style/instruction.scss'
import { Helmet } from "react-helmet";
import idea from './img/idea.jpg'
import brain from './img/brain.jpg'
import mark from './img/question-mark.jpg'
import { Link } from "react-router-dom";
import { BiBulb, BiIntersect } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import Select from "./select";
export default function PlayIns(){
    return(
        <Fragment>
            <Helmet> <title>Quiz-Instructions</title> </Helmet>
            <Entete />
            <div className="instructions">
                <h1 >Comment répondre aux Questions</h1>
                <p>Assurez-vous de bien lire avant de continuer..</p>
                <ul className="browser-default" id="main-list">
                    <li>Choisir la matiere dans laquelle vous voulez réviser</li>
                    <li>Choisir la matiere dans laquelle vous voulez réviser</li>
                    <li>
                        Choisir la matiere dans laquelle vous voulez réviser
                    </li>
                        <img src={brain} className="ima"  alt="brain exercise"/>
                    <li>
                        Choisir la matiere dans laquelle vous voulez réviser
                    </li>
                        <img src={mark}  className="ima"  alt="brain exercise"/>
                    <li>
                        Choisir la matiere dans laquelle vous voulez réviser
                    </li>
                        <img src={idea} className="ima" alt="brain exercise"/>
                    <li>
                        Choisir la matiere dans laquelle vous voulez réviser
                        <ul id="sublist">
                            <li>2 50-50 chances</li>
                            <li>5 hints</li>
                        </ul>
                        
                    </li>
                    <li>
                        Selecting a 50-50 lifetime by clicking the icon
                        <span className="lifel"><BiIntersect /> </span>
                        will remove 2 wrong answers
                    </li>
                        <img src={idea}  className="ima"  alt="brain exercise"/>
                    <li>
                        Using a hint by clicking 
                        <span className="lifel"><HiLightBulb /> </span>
                        will remove 1 wrong answer from the list leaving threee possibilities 
                    </li>
                    <img src={brain}  className="ima"  alt="brain exercise"/>
                   
                    <li>Feell free to leave the quiz if not stable</li>
                    <li>Feell free to leave the quiz if not stable</li>
                    <li>Feell free to leave the quiz if not stable</li>
                </ul>
                <div id="bottom">
                    <span className="lr"><Link to='/' className="btn btn-primary">No take me to home </Link> </span>
                    <Select />
                </div>
            </div>

            <Footer />
        </Fragment>
    )
}