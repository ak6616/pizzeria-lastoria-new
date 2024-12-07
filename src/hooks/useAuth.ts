import { useState, useEffect } from 'react';

interface AuthHook {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuth = (): AuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth', {
          credentials: 'include'
        });
        setIsAuthenticated(response.ok);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}; 