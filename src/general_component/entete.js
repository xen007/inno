import {  useState } from 'react';
import '../style/entete.css';
import {Link} from "react-router-dom";
import { FaTimes } from "react-icons/fa";
const Entete = () => {

   const [mobile, setmobile] = useState(true);

   const shownavbar = () =>{
    if(mobile){
      setmobile(false);
    }
    else{
      setmobile(true);
    }
   }
  
    return ( 

        <div className=" navbar navbar-expand-lg navbar-dark bg-dark"  >
            <div className="container-fluid">
    <a className="navbar-brand " href="#">INNOSOFT</a>
   
    <div className=" Entete" >
      <ul className= {mobile? 'navbar-nav': 'nav-mobile'} >
        <li className="nav-item">
          <Link to="/" className="nav-link active a text-light" aria-current="page" href="#">Accueil</Link>
        </li>
        <li className="nav-item">
          <Link to="/Service" className="nav-link active a text-light" >Prestation de Services</Link>
        </li>
        <li className="nav-item">
          <Link to="/Formation" className="nav-link active a text-light" >Nos formations</Link>
        </li>
        <li className="nav-item">
          <Link to="/produit" className="nav-link active a text-light" >Produits</Link>
        </li>
        <li className="nav-item">
          <Link to="/revisions" className="nav-link active a text-light" >Revisions</Link>
        </li>
      </ul>
    <button  className="valide navbar-toggler" onClick={shownavbar} >
      {
        mobile? (<span className="navbar-toggler-icon"></span>):(<FaTimes/>)
      }
    </button>
    </div>
  </div>
</div>
     );
}
 
export default Entete;