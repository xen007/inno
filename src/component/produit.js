import Footer from "../general_component/Footer";
import Entete from "../general_component/entete";
import "../style/service.css";
import desktop from "../img/desktop.jpg";
import energy from '../img/energy.jpg'
import log from '../img/login.png'
import pharm from '../img/pharm.png'
import dash from '../img/dash.png'
import { motion } from "framer-motion";

export default function Produit() {

    return (
        <div className="Services">

            <Entete />
            <div className="All container container-fluid">
                <div >
                    <img style={{ width: '100%', height: '300px', objectFit: 'cover' }} src={energy} alt='' />
                    <p className="nosP">Nos produits</p>
                </div>

                <div className="presentation row">
                    <motion.div className="blue-bar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }} style={{ width: '100px', height: '5px', backgroundColor: '#0d6efd', margin: '0 45%' }}>
                    </motion.div>
                    <h1 style={{ marginTop: '' }}><span> Smart School Manager </span></h1>


                    <motion.div className="video_presentation photo  col-md-6" id="tof1" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: 'easeIn', duration: 1 }}>

                        <img src={log} alt="" />
                    </motion.div>
                    <motion.div className=" col-md-6" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: 'easeIn', duration: 1 }}>
                        <p>L'application web SSM (Smart School Manager) est l'application adapté pour vous! Oui vous qui devez gérer un établissement scolaire que ce soit maternelle,primaire ou secondaire de manière éfficace.
                            Vous pourrez alors traiter et gérer facilement votre pédgogie et avoir plus de temps pour vous...
                        </p>
                    </motion.div>

                </div>
                <div className="presentation row">
                    <motion.div className="blue-bar" initial={{ opacity: 0 }} animate={{ opacity: 3 }} transition={{ duration: 1 }} style={{ width: '100px', height: '5px', backgroundColor: '#0d6efd', margin: '0 45%' }}>
                    </motion.div>
                    <h1 style={{ marginTop: '' }}><span> GesPharm </span></h1>
                    <motion.div className=" col-md-6" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: 'easeIn', duration: 1 }}>
                        <p>
                            Le logiciel GesPharm est le logiciel sur mésure pour gérer de manière fluide votre pharmacie. Vous aurez accès aux taches des differents acteurs de votre système de vente et les produits seront accessible en temps rééel.
                        </p>
                    </motion.div>
                    <motion.div className="video_presentation photo  col-md-6" id="tof1" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: 'easeIn', duration: 1 }}>

                        <img src={pharm} alt="" />
                    </motion.div>


                </div>
                
                <div className="row " style={{ marginTop: "40px" }}>
                <motion.div className="blue-bar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={{ width: '100px', height: '5px', backgroundColor: '#0d6efd',margin:'0 45%' }}>
                </motion.div>
                    <motion.h1 className="text-center pb-4" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, y: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: 'easeIn', duration: 1 }}> Fonctionnalités </motion.h1>
                    <motion.p
                        animate={{ y: 0, opacity: 1 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 0.2, y: {
                                type: "spring",
                                stiffness: 60
                            },
                            opacity: { duration: 1 },
                            ease: 'easeIn', duration: 1
                        }}>
                    </motion.p>
                    <motion.div className="row mobile" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, y: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: 'easeIn', duration: 1 }}>
                        <div className="app_mobile native col-md-5">
                            <div className="row" style={{ background: '#0d6efd' }}>
                                <h3 className="text-center text-light"> Application web SSM</h3>
                            </div>
                            <div className="row p-3">
                                <ul>
                                    <h4>ELEVES</h4>
                                    <li>Gestion des élèves</li>
                                    <li>Ajout des élèves</li>
                                    <li>Modification des élèves</li>
                                    <li>Inscription et scolarité des élèves</li>
                                    <li>Génération des bulletins des élèves</li>
                                    <li>...</li>
                                    <h4>MATIERES</h4>
                                    <li>Enregistrement des matières</li>
                                    <li>Modification</li>
                                    <li>Affectation aux enseignants</li>
                                    <li>...</li>
                                    <h4>CLASSES</h4>
                                    <li>Enregistrement des classes</li>
                                    <li>Modification des classes</li>
                                    <li>Affectation aux enseignants</li>
                                    <li>... </li>
                                    <h4>ENSEIGNANTS</h4>
                                    <li>Enregistrement des enseignants</li>
                                    <li>Access aux emplois de temps</li>
                                    <li>Access aux notes </li>
                                    <li>... </li>
                                    <h4>AUTRES</h4>
                                    <li>création des comptes pour enseignants</li>
                                    <li>Gestion de scolatité et inscriptions</li>
                                    <li>Sauvegarde</li>
                                    <li>Parametrages </li>
                                    <li>... </li>


                                </ul>
                            </div>

                        </div>
                        <div className="app_mobile hybrid p-10 col-md-5">
                            <div className="row" style={{ background: '#6c757d' }}>
                                <h3 className="text-center text-light "> Logiciel GesPharm</h3>
                            </div>
                            <div className="row p-3">
                                <h4>VENTES</h4>
                                <li> Enregistrement des produits </li>
                                <li> Supression des produits </li>
                                <li> Modification des produits </li>
                                <li> Bénéfice journalier,mensuel et annuel </li>
                                <li> Courbes des ventes de produits </li>
                                <li> Génération de la commande </li>
                                <li> Activité de caisse journalière et mensuelle </li>
                                <li> Facturation des produits </li>
                                <li>... </li>
                                <h4>PERSONNELS</h4>
                                <li> Enregistrement du personnel </li>
                                <li> Modification et supression du personnel </li>
                                <li>... </li>
                                <h4>FOURNISSEURS</h4>
                                <li> Enregistrement des fournisseurs</li>
                                <li> Modification et supressiont des fournisseurs</li>
                                <li>... </li>
                            </div>

                        </div>
                    </motion.div>
                </div>
                <div className="presentation row">
                <motion.div className="blue-bar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={{ width: '100px', height: '5px', backgroundColor: '#0d6efd',margin:'20px 45% 0 ', }}>
                </motion.div>
                    <h1> Vues</h1>

                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        </div>
                        <div class="carousel-inner caroussP">
                            <div class="carousel-item active ">
                                <img src={log} class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src={dash} class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src={pharm} class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src={pharm} class="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}