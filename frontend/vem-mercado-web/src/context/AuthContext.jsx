import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const stored = sessionStorage.getItem("usuario");
  const [usuario, setUsuario] = useState(stored ? JSON.parse(stored) : null);

  const login = (user) => {
    setUsuario(user);
    sessionStorage.setItem("usuario", JSON.stringify(user));
  };
  const logout = () => {
    setUsuario(null);
    sessionStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);