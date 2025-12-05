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

  // 🔥 ATUALIZAR GLOBALMENTE O USUÁRIO
  const updateUsuario = (newUser) => {
    setUsuario(newUser);
    sessionStorage.setItem("usuario", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, updateUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
