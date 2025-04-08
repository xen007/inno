import "./bootstrap-5.0.2-dist/css/bootstrap.min.css";

import './App.css';
import Accueil from "./component/Accueil";
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Services from "./component/Services";
import Formation from "./component/Formation";
import Jeune from "./component/Jeune_Av";
import JeuneInter from "./component/Jeune_Inter";
import AdulteAv from "./component/Adulte_Av";
import AdulteInter from "./component/Adulte_Inter"
import Produit from "./component/produit";
import Revisions from "./quiz/revisions";
import PlayIns from "./quiz/playIns";
import Begin from "./quiz/begin";
import Summary from "./quiz/summary";

function App() {
  return (
    <div className="App">
      <Router> 
       <Routes>
        <Route path={'/'} element={<Accueil/>}  />
        <Route path={'/Service'} element={<Services/>}  />
        <Route path={'/Formation'} element={<Formation/>}  />
        <Route path={'/Formation/Jeune_Av'} element={<Jeune/>}  />
        <Route path={'/Formation/Jeune_Inter'} element={<JeuneInter/>}  />
        <Route path={'/Formation/Adulte_Av'} element={<AdulteAv/>} />
        <Route path={'/Formation/Adulte_Inter'} element={<AdulteInter/>} />
        <Route path={'/produit'} element={<Produit/>} />
        <Route path={'/Revisions'} element={<Revisions />} />
        <Route path={'/playIns'} element={<PlayIns />} />
        <Route path={'/playIns/begin'} element={<Begin/>} />
        <Route path={'/PlayIns/summary'} element={<Summary/>} />
     </Routes>
    </Router>
    </div>
  );
}

export default App;
