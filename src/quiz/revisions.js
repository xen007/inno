import React, { Fragment } from "react";
import Entete from '../general_component/entete'
import '../style/revision.scss'

import "../style/styles.scss"
import { Helmet } from "react-helmet";
import { BiCube } from "react-icons/bi";
import { Link } from "react-router-dom";
export default function Revisions(){
    return(
        <Fragment>
            <Helmet> <title>Quiz</title> </Helmet>
            
        <div id="hom">
        <Entete />
            <section>
                <div>
                    <span  > <BiCube className="cube" /> </span>
                </div>
                <h1>Quiz App</h1>
                <div className="play">
                    <Link to='/playIns' className="btn btn-success play"> Start </Link>
                </div>
                <div className="auth-cont">
                    <Link to='/login' className="btn btn-primary auth-btn">Login</Link>
                    <Link to='/signup' className="btn btn-secondary auth-btn">SignUp</Link>
                </div>
            </section>

            
        </div>
        </Fragment>
    )
}