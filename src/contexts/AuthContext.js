// NOTE: This is a wireframe. All data and features are simulated with dummy data. No backend is connected.
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const roles = ['client', 'trainer', 'nutritionist', 'admin'];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Demo User',
    role: 'client',
    email: 'demo@fitprohub.com',
    verified: true
  });

  const login = (role = 'client') => {
    setUser({ name: 'Demo User', role, email: 'demo@fitprohub.com', verified: true });
  };

  const logout = () => setUser(null);

  const switchRole = () => {
    setUser(prev => {
      const idx = roles.indexOf(prev.role);
      const nextRole = roles[(idx + 1) % roles.length];
      return { ...prev, role: nextRole };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 