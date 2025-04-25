import React, { useState, useEffect } from "react";
import './Registration.css'; // Import the CSS file
import { register } from '../utils/auth'; // Import the register function

function Registration({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [matricule, setMatricule] = useState(''); // New state for matricule
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isFormValid = username && matricule && passwordStrength === 'Strong' && passwordMatch;
    setIsFormValid(isFormValid);
  }, [username, matricule, passwordStrength, passwordMatch]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  const validatePassword = (value) => {
    const strength = /^(?=.*\d).{4,}$/.test(value) ? 'Strong' : 'Weak';
    setPasswordStrength(strength);
    setPasswordMatch(value === confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await register(username, matricule, password, confirmPassword, role);
        if (response.status === 'success') {
          alert('Compte créé avec succès!');
          onClose();
        } else {
          alert(response.message || 'Échec de la création du compte');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    } else {
      alert('Remplissez les champs correctement.');
    }
  };

  return (
    <div className="registration-popup">
      <div className="registration-popup-content container">
        <h3 className="text-center mb-4">Création de Compte</h3>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom d'utilisateur:</label>
            <input 
              type="text" 
              name="username"
              className="form-control"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Matricule:</label>
            <input 
              type="text" 
              name="matricule"
              className="form-control"
              value={matricule} 
              onChange={(e) => setMatricule(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe:</label>
            <input 
              type="password" 
              name="password"
              className="form-control"
              value={password} 
              onChange={handlePasswordChange}
              required
            />
            <small className={`password-strength ${passwordStrength.toLowerCase()} form-text`}>
              {passwordStrength} (min 4 chars, 1 number)
            </small>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmation Mot de passe:</label>
            <input 
              type="password" 
              name="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {!passwordMatch && (
              <small className="password-error form-text text-danger">Passwords do not match</small>
            )}
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between mt-4 gap-2">
            <button 
              type="submit" 
              className="btn btn-success w-100" 
              disabled={!isFormValid}
            >
              Enregistrer
            </button>
            <button 
              type="button" 
              className="btn btn-danger w-100" 
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
