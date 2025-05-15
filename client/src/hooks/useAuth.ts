import { useState, useEffect } from 'react';
import { login as apiLogin, checkAuth } from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await checkAuth();
        
        // Adjust this logic based on what checkAuth actually returns.
        // For example, if checkAuth returns a boolean:
        if (response === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Błąd sprawdzania autoryzacji:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin({ username, password });
      if (response.success) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Błąd logowania:', err);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  return { isAuthenticated, isLoading, login, logout };
}; 