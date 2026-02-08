import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { authApi } from '../api';
import type { User, AuthState, LoginCredentials } from '../types';

// Dev mode credentials for local testing (when API is not available)
const DEV_MODE = import.meta.env.DEV;
const DEV_CREDENTIALS = { username: 'admin', password: 'admin123' };
const DEV_USER: User = { id: 1, username: 'admin', created_at: new Date().toISOString() };

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const checkAuth = useCallback(async () => {
    // In dev mode, check localStorage for auth state
    if (DEV_MODE) {
      const devAuth = localStorage.getItem('dev_auth');
      if (devAuth === 'true') {
        setState({
          user: DEV_USER,
          isAuthenticated: true,
          isLoading: false,
        });
        return;
      }
    }

    try {
      const response = await authApi.me();
      if (response.success && response.data) {
        setState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Dev mode: allow login with dev credentials without API
    if (DEV_MODE) {
      if (credentials.username === DEV_CREDENTIALS.username &&
          credentials.password === DEV_CREDENTIALS.password) {
        localStorage.setItem('dev_auth', 'true');
        setState({
          user: DEV_USER,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
    }

    // Try the actual API
    try {
      const response = await authApi.login(credentials);

      if (response.success && response.data) {
        setState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
    } catch {
      // API not available, already handled dev mode above
    }

    setState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const logout = async () => {
    if (DEV_MODE) {
      localStorage.removeItem('dev_auth');
    }

    try {
      await authApi.logout();
    } catch {
      // Ignore logout errors
    }

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
