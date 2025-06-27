import { createContext, useContext, useEffect, useState } from 'react';
import { loginWithEmail } from '../services/auth';
import { saveTokens, clearTokens, getAccessToken } from '../utils/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAccessToken());

  const login = async (email: string, password: string) => {
    const { access, refresh } = await loginWithEmail(email, password);
    saveTokens(access, refresh);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

