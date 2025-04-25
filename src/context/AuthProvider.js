// src/context/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../utils/config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // Check localStorage for login state on app load
    const checkLoginStatus = () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          setAuth(JSON.parse(user)); // Restore user session
        } else {
          setAuth(null); // Clear session if user is not found
        }
      } catch (error) {
        console.error('Error retrieving user from localStorage:', error);
        setAuth(null); // Ensure clean state on error
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth.php`, { username, password });

      if (response.data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user in localStorage
        setAuth(response.data.user); // Update auth state
        return { status: 'success', message: 'Login successful', user: response.data.user };
      }

      return { status: 'error', message: response.data.message || 'Login failed' }; // Handle failed login
    } catch (error) {
      console.error('Login error:', error);
      return { status: 'error', message: 'An error occurred during login. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${config.apiBaseUrl}/logout.php`);
      localStorage.removeItem('user'); // Clear session storage
      setAuth(null); // Reset auth state
    } catch (error) {
      console.error('Logout error:', error);
      setAuth(null); // Ensure clean state on error
    }
  };

  const isLoggedIn = () => {
    return auth !== null; // Returns true if a user is authenticated
  };

  const getUserRole = () => {
    return auth?.role || null; // Safely retrieve role or return null
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, getUserRole, setAuth, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
