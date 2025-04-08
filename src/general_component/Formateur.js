import boss from "../img/boss.jpg";
import jospin from "../img/jospin.jpg";
import '../style/formateur.css'
const Formateur
 = () => {
    return ( 
        <div className="Formateur">

              <h1 className="text-center"> NOTRE EQUIPE</h1>
              <div className="row"> 
              
              <ul className="row"> 
                  <li className="col-md-4"><img src={boss} alt="" className="profil"/><p className=""> NGOUNOU Bertrand</p> <strong className=""> PDG INNO-SOFT</strong></li>
                  <li className="col-md-4"><img src={jospin} alt="" className="profil"/> <p className=""> ZINDER Jospin</p><strong className=""> INFORMATICIEN</strong></li>
              </ul>
              <ul className="row">
                  </ul>
              </div>
        </div>

     );
}
 
export default Formateur