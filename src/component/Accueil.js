import Contact from "../general_component/Contact";
import Entete from "../general_component/entete";
import Footer from "../general_component/Footer";
import "../style/accueil.css";





const Accueil = () => {

      
    return ( 

        <div className="Accueil"> 
        <Entete/>
        <div className=" contenu ">
        <div className="titre col-md-6 pt-2">
        <h1 style={{textAlign:'left'}}> INNO-SOFT</h1>
        <h2> Votre partenaire idéal pour le développement des applications </h2>
        <p className="">INNO-SOFT est une entreprise spécialisée dans le développement des applications web, mobiles et Desktops. Nous proposons à nos clients des solutions personnalisées, qui répondent aux besoins de chacun. INNO-SOFT est constituée d'une équipe professionnelle de développeur utilisant les dernières technologies pour créer des applications robustes et évolutives offrant une expérience utilisateur intuitive et agréable. </p>
        <button className="btn btn-primary" > Contactez-nous </button>
        </div>
        <div className="vide col-md-6">
            
            </div>
        </div>
        <Contact />
        <Footer/>
        </div>
     );
}
 
export default Accueil;