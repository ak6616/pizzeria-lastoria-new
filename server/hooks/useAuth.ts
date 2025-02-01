import { useState } from 'react';
import { login as apiLogin } from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    try {
      await apiLogin({ username, password });
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}; 