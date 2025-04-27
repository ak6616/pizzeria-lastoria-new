import { useState, useEffect } from 'react';
import { login as apiLogin } from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth', {
          credentials: 'include'
        });
        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error('Błąd sprawdzania autoryzacji:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await apiLogin({ username, password });
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  return { isAuthenticated, isLoading, login, logout };
}; 