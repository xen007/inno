import { FaMoon, FaSun, FaUser } from 'react-icons/fa';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import ResetPass from '../components/ResetPass';
import Login from '../components/Login';
import Registration from '../components/Registration';

function BasicExample() {
  const { auth, logout } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState({ login: false, register: false, changePassword: false });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [greetingText, setGreetingText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      setGreetingText(`Hello, ${auth.username || 'User'}!`);
    } else {
      setGreetingText("Vous n'êtes pas connecté !");
    }
  }, [auth]);

  const handleLogout = async () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      try {
        localStorage.removeItem('auth');
        localStorage.removeItem('questions');
        await logout();
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error logging out:', error);
        alert('Échec de déconnexion. Veuillez réessayer.');
      }
    }
  };

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const togglePopup = (type, state) => setShowPopup((prev) => ({ ...prev, [type]: state }));

  return (
    <Navbar expand="lg" className={`sticky-top ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Container>
        {/* Branding */}
        <Navbar.Brand>
          <Link to="/" className={`navbar-brand ${isDarkMode ? 'text-light' : 'text-dark'}`}>
            IntelliQuiz
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto d-flex align-items-center justify-content-center">
            {/* Theme Toggle */}
            <button
              className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'} me-3`}
              onClick={toggleTheme}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />} {isDarkMode ? ' Light Mode' : ' Dark Mode'}
            </button>

            {/* Navigation Links */}
            <Link to="/" className={`nav-link ${isDarkMode ? 'text-light' : 'text-dark'}`}>Acceuil</Link>

            {/* Greeting Text */}
            <span className={`mx-3 fw-semibold ${isDarkMode ? 'text-light' : 'text-dark'}`}>
              {greetingText}
            </span>

            {/* User Menu Dropdown */}
            <NavDropdown
              align="end"
              title={
                <span className={`align-items-center ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                  <FaUser className="me-1" />
                </span>
              }
              className="dropdown-menu-end"
            >
              {auth ? (
                <>
                  <NavDropdown.Item>utilisateur: {auth.username || 'N/A'}</NavDropdown.Item>
                  <NavDropdown.Item>Matricule: {auth.matricule || 'N/A'}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Deconnecter
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => togglePopup('changePassword', true)}>
                    Changer le mot de passe
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item onClick={() => togglePopup('login', true)}>Se connecter</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => togglePopup('register', true)}>S'enregistrer</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Login Popup */}
      {showPopup.login && (
        <Login
          onClose={() => togglePopup('login', false)}
          onLogin={(user) => {
            setGreetingText(`Hello, ${user.username || 'User'}!`);
            togglePopup('login', false);
          }}
        />
      )}

      {/* Registration Popup */}
      {showPopup.register && (
        <Registration
          onClose={() => togglePopup('register', false)}
          onRegister={(user) => {
            setGreetingText(`Hello, ${user.username || 'User'}!`);
            togglePopup('register', false);
          }}
        />
      )}

      {/* Password Reset Popup */}
      {showPopup.changePassword && (
        <ResetPass onClose={() => togglePopup('changePassword', false)} />
      )}
    </Navbar>
  );
}

export default BasicExample;
