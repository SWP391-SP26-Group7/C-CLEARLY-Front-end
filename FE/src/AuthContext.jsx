import React, { createContext, useContext, useState, useEffect } from 'react';
import { roles } from './permissions';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '', role: 'Manager' });

  useEffect(() => {
    // try load from localStorage so role persists across reload
    try {
      const raw = localStorage.getItem('cc_user');
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const login = (role, name) => {
    const r = roles.includes(role) ? role : '';
    const u = { name: name || '', role: r };
    setUser(u);
    try { localStorage.setItem('cc_user', JSON.stringify(u)); } catch (e) {}
  };

  const logout = () => {
    setUser({ name: '', role: '' });
    try { localStorage.removeItem('cc_user'); } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, roles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
