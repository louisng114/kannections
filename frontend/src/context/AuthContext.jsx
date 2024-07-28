import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import KannectionsApi from '../helpers/api';

const AuthContext = createContext();

// functions for user authentication
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      KannectionsApi.token = storedToken;
      fetchUserFromToken(storedToken);
    }
  }, []);

  const fetchUserFromToken = async (token) => {
    try {
      const decoded = jwtDecode(token);
      const user = await KannectionsApi.getUser(decoded.username);
      setUser(user);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  const signup = async (username, password) => {
    try {
        const token = await KannectionsApi.register({ username, password });
        localStorage.setItem('token', token);
        KannectionsApi.token = token;
        fetchUserFromToken(token);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const token = await KannectionsApi.getToken({ username, password });
      localStorage.setItem('token', token);
      KannectionsApi.token = token;
      fetchUserFromToken(token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    KannectionsApi.token = null;
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
