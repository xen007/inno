// Importation des modules
import React, { useEffect, useState } from "react";
import config from "./config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

// Fonction principale
export default function Select() {
  // Déclaration des états
  const [show, setShow] = useState(false); // Modal visibility
  const [matiereData, setMatiereData] = useState([]); // List of filtered subjects
  const [classe, setClasse] = useState([]); // List of all classes
  const [matiere, setMatiere] = useState([]); // List of all subjects
  const [chap, setChap] = useState([]); // List of all chapters

  const [enable, setEnable] = useState(true); // Enable/disable dropdowns
  const [text, setText] = useState("Selectionnez d'abord la classe"); // Dynamic placeholder text

  // State for form data
  const [formValue, setFormValue] = useState({
    classe: "",
    matiere: "",
  });

  const navigate = useNavigate(); // React Router navigation hook

  // Function to show/hide modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const reqdata = await fetch(`${config.apiBaseUrl}/class.php`);
        const resdata = await reqdata.json();
        setClasse(resdata); // Assumes PHP returns an array of class objects
      } catch (error) {
        console.error("Error fetching classes:", error);
        alert("Erreur lors du chargement des classes.");
      }
    };

    const fetchSubjects = async () => {
      try {
        const reqdata = await fetch(`${config.apiBaseUrl}/matiere.php`);
        const resdata = await reqdata.json();
        setMatiere(resdata); // Assumes PHP returns an array of subject objects
      } catch (error) {
        console.error("Error fetching subjects:", error);
        alert("Erreur lors du chargement des matières.");
      }
    };

    fetchClasses();
    fetchSubjects();
  }, []);

  // Handle selection changes
  const handleClass = (e) => {
    const selectedClass = Number(e.target.value);
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      classe: selectedClass,
    })); // Save the selected value

    if (selectedClass !== "") {
      setEnable(false);
      setText("Selectionnez la matière");
      setMatiereData(
        matiere.filter((subject) => subject.id_classe === selectedClass)
      ); // Filter subjects based on selected class
    } else {
      setText("Selectionnez d'abord la classe");
      setMatiereData([]);
      setEnable(true);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    })); // Update the specific field in formValue

    if (name === "matiere") {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        matiere: value, // Store the selected matiere ID
      }));
    }
  };

  const handleSubmit = () => {
    // Navigate to the desired page without exposing matiere in the URL
    navigate("/playIns/begin", { state: formValue });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Continuer
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Formulaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Remplissez les champs</h3>
          <div className="row mb-3">
            {/* Select Classe */}
            <div className="form-group col-md-4">
              <label className="mb-2">Classe</label>
              <select
                name="classe"
                className="form-control"
                onChange={handleClass}
              >
                <option value="">Selectionnez la classe</option>
                {classe.map((nData, index) => (
                  <option key={index} value={nData.id_classe}>
                    {nData.nom_classe}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Matière */}
            <div className="form-group col-md-4">
              <label className="mb-2">Matière</label>
              <select
                id="matiere"
                name="matiere"
                disabled={enable}
                className="form-control"
                onChange={handleInput}
              >
                <option value="">{text}</option>
                {matiereData.map((nData, index) => (
                  <option key={index} value={nData.id_matiere}>
                    {nData.nom_mat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="btn btn-secondary">
            Fermer
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
