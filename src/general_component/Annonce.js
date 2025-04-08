import "../style/annonce.css";
import { motion } from "framer-motion";

const Annonce = () => {

       
    return ( 

        <motion.div className="Annonce" initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:2}}>
            
            <p>Les inscriptions pour  <strong> vacance 100% </strong>  TIC sont lancés ! Veuillez nous contacter pour plus d'information</p>
        </motion.div>  
     );
}
 
export default Annonce
;