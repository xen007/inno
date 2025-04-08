import { FaPhone} from "react-icons/fa";
import '../style/footer.css'
const Footer
 = () => {
    return ( 
        <div className="footer bg-dark"> 
        <div className="row">
         <div className="lien col-md-6"> 
         <p>© Copyright 2023. innosoft All rights reserved</p>
         </div>
         <div className="lien col-md-6"> 
         <p ><strong style={{textDecoration:"underline"}}>Contact:</strong> <FaPhone style={{width:"15px", height:"15px", marginLeft:"30px"}}/> (+237) 699383788 / 676464423 / 222 241698</p>
         </div>
         </div>
         </div>
     );
}
 
export default Footer;