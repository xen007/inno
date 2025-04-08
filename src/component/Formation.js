import Footer from "../general_component/Footer";
import Entete from "../general_component/entete";
import '../style/formation.css';
import coche from '../img/coche.png'
import etudiante from '../img/jeune.png'
import  enfant from '../img/enfant.jpg'
import ado from '../img/ado.jpg'
import adulte1 from '../img/adulteInt.jpg'
import adulte2 from '../img/adulteAv.jpg'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Formation = () => {

    return (  
        <div className="Formation ">
            <Entete/>
            <div className=" container container-fluid"> 
            <div className="row formation_explique "> 
           
            <motion.div className="col-md-7 forme"
             
             initial={{x:-100,opacity:0}} animate={{x:0,opacity:1}}
             whileInView={{x:0,opacity:1}}
              transition={{delay:0.2, x:{type:"spring",
             stiffness:60}, 
             opacity:{duration:1}, 
             ease:'easeIn', duration:1}}>  
            <h1 style={{color:"#0d6efd"}}><strong>Besoin d'une formation en Informatique ?</strong></h1>
            <p style={{fontSize:'1.2em', textAlign:'justify'}}>Pour vous garantir une vie professionnnelle idéale, nous mettons à votre disposition des modules de formations de premier choix.</p>
            <div className="row module ">  
            <motion.ul className="col-md-6">
            <li> <img src={coche} alt=""/>Formation MS Office</li> 
            <li> <img src={coche} alt=""/>Formation sur WINDOW</li> 
            <li> <img src={coche} alt=""/>Maintenance Informatique</li>
            <li> <img src={coche} alt=""/>Vidéo Projection</li>
            </motion.ul> 
            <motion.ul className="col-md-6">
            <li> <img src={coche} alt=""/> Découvrir l'ordinateur</li>
            <li> <img src={coche} alt=""/>Infographie et montage vidéo</li> 
            <li> <img src={coche} alt=""/>Internet et Multimédia </li> 
            <li> <img src={coche} alt=""/>Programmation </li>  
            </motion.ul> 
            <motion.button className="">Nos offres de formations</motion.button>
            </div>
            </motion.div>
            <div className="col-md-5 image">  
            <img src={etudiante} alt=""/>
            </div>
             </div> 
            <div className="row formation container"> 
            <div className="row modform ">  
            <h2 className="text-center" > Formation Jeune</h2>
            <Link to = {"/Formation/Jeune_Inter"} className="jeu1 jeune col-md-5 ml nav-link active ">
            <div className="imagerie row " > 
            <img src={enfant} alt=""/>
            </div>
            
            <h4> Formation pour jeune débutant </h4>
            <p>Vous etes un jeune et vous debutez en informatique ? Cette formation est faites pour vous</p>
             </Link>
             <Link to = {"/Formation/Jeune_Av"} className=" jeune col-md-5 nav-link active">
             <div className="imagerie row"> 
            <img src={ado} alt=""/>
            </div>
             <h4> Formation pour jeune intermédiaire </h4>
            <p>Vous avez des connaissances en informatique et vous souhaitez vous approfondir ? Suivez notre formation qui vous garantie un apprentissage au top</p>
             </Link> 
                </div> 
                <div className="row modform modform2">  
                <h2 className="text-center">Formation Adulte</h2> 
                <Link to = {"/Formation/Adulte_Inter"} className="jeu1 jeune col-md-5 ml nav-link active">
                <div className="imagerie row"> 
            <img src={adulte1} alt=""/>
            </div>
             <h4> Formation Adulte débutant </h4>
            <p>Vous souhaitez avoir des notions en informatique ? Inscrivez vous à notre formation qui vous garantie des cours de qualité.</p>
             </Link> 
             <Link to = {"/Formation/Adulte_Av"} className="jeune col-md-5 nav-link active">
             <div className="imagerie row"> 
            <img src={adulte2} alt=""/>
            </div>
             <h4> Formation Adulte intermédiaire </h4>
            <p>il y'a rien de mieux que de se recycler pour etre plus efficace en entreprise. Venez faire votre mise à niveau pour etre un employé performant et à jour.</p>
             </Link> 
            </div>
            </div> 
            </div> 
            <Footer/>
        </div>
    );
}
 
export default Formation;