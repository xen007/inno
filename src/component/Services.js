import Footer from "../general_component/Footer";
import Entete from "../general_component/entete";
import "../style/service.css";
import desktop from "../img/desktop.jpg";
import img2 from "../img/img2.png"
import { motion } from "framer-motion";
import Formateur from "../general_component/Formateur";

const Services
 = () => {
    return ( 

        <div className="Services">
           
            <Entete/>
            <div className="All container container-fluid">
            <div className="presentation row">
            <motion.div className="presentation_text col-md-6" initial={{x:-100,opacity:0}} animate={{x:0,opacity:1}} whileInView={{x:0,opacity:1}} transition={{delay:0.2, x:{type:"spring", stiffness:60}, opacity:{duration:1}, ease:'easeIn', duration:1}}>
            <h1 style={{marginTop:'-50px'}}> Developpement<span> ressources web </span> pour vos entreprises </h1> 
             <p>Avez vous besoin d'un site vitrine pour la promotion des activités de votre entreprise ? Ou encore d'une application web pour la gestion de vos ressources (stock, personnel etc) ou pour un usage divers ? INNO-SOFT 
                se propose comme votre partenaire idéal pour la conception de vos solutions web qui répondront aux exigences de qualité-prix et qui bien-sur, vous satisferont à 100%. </p>
        </motion.div>
        <motion.div className="video_presentation photo  col-md-6" id="tof1"initial={{x:100,opacity:0}} animate={{x:0,opacity:1}} whileInView={{x:0,opacity:1}} transition={{delay:0.2, x:{type:"spring", stiffness:60}, opacity:{duration:1}, ease:'easeIn', duration:1}}> 
        
        <img src={img2} alt=""/>
        </motion.div>
            </div>
            <div className="row " style={{marginTop:"40px"}}>
            <motion.h1 className="text-center pb-4" initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}} whileInView={{y:0,opacity:1}} transition={{delay:0.2, y:{type:"spring", stiffness:60}, opacity:{duration:1}, ease:'easeIn', duration:1}}> Developpement <span> d'application </span>  mobile </motion.h1>
            <motion.p 
             animate={{y:0,opacity:1}}
              whileInView={{y:0,opacity:1}}
               transition={{delay:0.2, y:{type:"spring",
              stiffness:60}, 
              opacity:{duration:1}, 
              ease:'easeIn', duration:1}}> INNO-SOFT se propose pour le développement de vos solutions mobiles. Notre vision de travail est d'impliquer aux maximum le client dans le processus de conception de son logiciel afin de ressortir la ressource idéale. Nous offrons à nos clients l'expertise necessaire dans le cas du style du logiciel (Hybride ou Native) pour leur offrir un système qui sera en total adéquation avec le service rendu. </motion.p>
            <motion.div className="row mobile" initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} whileInView={{y:0,opacity:1}} transition={{delay:0.2, y:{type:"spring", stiffness:60}, opacity:{duration:1}, ease:'easeIn', duration:1}}>
            <div className="app_mobile native col-md-5">
            <div className="row" style={{background:'#0d6efd'}}> 
            <h3 className="text-center text-light"> Application mobile native</h3>
            </div>
            <div className="row p-3"> 
            <h4> Avantages</h4> 
            <ul>
            <li>Application rapide, fluide avec une bonne réactivité</li>
            <li> S’adapte parfaitement aux capacités du téléphone</li>
            <li> Peut communiquer avec les autres applications du téléphone.</li>
            
            </ul> 
            </div>
            <div className="row p-3"> 
            <h4> Inconvénient </h4> 
            <li> Développement de plusieurs versions pour être disponible sur les différents systèmes d’exploitation.</li>
            <li> Application coûteuse et longue à développer</li>
            </div>
            </div>
            <div className="app_mobile hybrid p-10 col-md-5">
            <div className="row" style={{background:'#6c757d'}}> 
            <h3 className="text-center text-light "> Application mobile hybrid</h3>
            </div>
            <div className="row p-3"> 
            <h4> Avantages</h4>
            <li> Développement rapide </li>
            <li> Peu coûteuse </li> 
            <li> Utilisation des fonctionnalités du téléphone </li> 
            <li> Disponible sur tous les stores. </li>  
            </div>
            <div className="row p-3"> 
            <h4> Inconvénient </h4> 
            <li>  </li>
            <li> Développement rapide </li>
            </div>
            </div>
        </motion.div>
        </div>
        <div className="presentation row">
        <h1> Application   <span> Desktop </span></h1>
        <div className="video_presentation photo col-md-6"> 
        <img src={desktop} alt=""/>
        </div>
        <div className="presentation_text col-md-6">
             
             <p>Certains défis technologiques exigent les performances d’une application native, conçue pour vivre en symbiose avec son système d’exploitation et sa plateforme matérielle. INNO-SOFT possède une grande expertise dans le développement des applications professionnelles pour vos système d'exploitation WINDOW.</p>
        </div>
        </div>

        </div>
        <Formateur/>
        <Footer/>
            </div>
            
           
     );
}
 
export default Services
;