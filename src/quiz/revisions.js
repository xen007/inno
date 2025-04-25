import React, { Fragment, useState } from "react";
import Entete from "../general_component/entete";
import "../style/revision.scss";
import Registration from "../components/Registration";
import "../style/styles.scss";
import { Helmet } from "react-helmet";
import { BiCube } from "react-icons/bi";
import { Link } from "react-router-dom";
import Login from "../components/Login";

export default function Revisions() {
    const [popupType, setPopupType] = useState(null);
    const handlePopupClose = () => {
        setPopupType(null);
    };

    return (
        <Fragment>
            <Helmet>
                <title>Quiz</title>
            </Helmet>
            <Entete />
            <div id="hom" className="d-flex align-items-center justify-content-center">
                <section className=" text-center py-4">
                    <div>
                        <span>
                            <BiCube className="cube" />
                        </span>
                    </div>
                    <h1>Quiz App</h1>
                    <div className="auth-cont mt-4">
                        <Link
                            to="/playIns"
                            className="btn btn-success play w-100 mb-3"
                        >
                            Commencer
                        </Link>
                        <button
                            className="btn btn-primary auth-btn w-100 mb-3"
                            onClick={() => setPopupType("login")}
                            disabled={popupType !== null}
                        >
                            Se connecter
                        </button>
                        <button
                            className="btn btn-warning auth-btn w-100"
                            onClick={() => setPopupType("registration")}
                            disabled={popupType !== null}
                        >
                            Créer un compte
                        </button>
                    </div>

                    {popupType === "login" && <Login onClose={handlePopupClose} />}
                    {popupType === "registration" && <Registration onClose={handlePopupClose} />}
                </section>
            </div>
        </Fragment>
    );
}
