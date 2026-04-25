import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * Provides authentication state to the entire app.
 * In a real app, replace localStorage with a proper auth service.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('netflix_user');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Frontend-only mock auth
    const userData = { email, name: email.split('@')[0], avatar: null };
    setUser(userData);
    localStorage.setItem('netflix_user', JSON.stringify(userData));
    return true;
  };

  const signup = (email, password, name) => {
    const userData = { email, name, avatar: null };
    setUser(userData);
    localStorage.setItem('netflix_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netflix_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};