import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { logout } from '../utils/auth'; // Import the logout function
import config from '../utils/config';
import './Login.css';

const Login = ({onClose}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [showActivationPopup, setShowActivationPopup] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check activation status on component mount
    const checkActivationStatus = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/chk_activ.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        if (result.statut !== '1') {
          setShowActivationPopup(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    logout(); // Call the logout function when the component mounts
    checkActivationStatus(); // Check activation status
  }, []);

  const handleActivationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/chk_activ.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activationCode })
      });
      const result = await response.json();
      if (result.statut === '1') {
        setShowActivationPopup(false);
      } else {
        alert(result.error || 'Activation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(identifier, password);
    if (response.status === 'success') {
      const { role, username, matricule } = response.user;
      sessionStorage.setItem('userRole', role); // Store the user role in session storage
      sessionStorage.setItem('username', username); // Store the username in session storage
      sessionStorage.setItem('matricule', matricule); // Store the matricule in session storage

      if (role !== '') {
        onClose()
        navigate('/playIns');
      } else {
        navigate('/revisions');
      }
    } else {
      alert(response.message || 'Login failed');
    }
  };

  return (

        
        <div className="registration-popup">
      
      
      {!showActivationPopup && (
        <div className="login-form">
            <div className="popup-overlay">
              <div className="popup-container">
                <button className="popup-close-btn" onClick={onClose}>✖</button>
                <form onSubmit={handleSubmit} className="login-form">
                  <h2>Connexion</h2>
                  <input
                    type="text"
                    placeholder="Username or Matricule"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Se connecter</button>
                </form>
              </div>
            </div>
         </div>
  
      )}
    </div>
  );
};
export default Login;
//eace5004c49e156