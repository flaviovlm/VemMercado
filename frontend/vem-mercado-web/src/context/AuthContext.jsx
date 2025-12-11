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

  const updateUsuario = (newUser) => {
    setUsuario(newUser);
    sessionStorage.setItem("usuario", JSON.stringify(newUser));
  };

  const updateUserAddresses = (newAddresses) => {
    setUsuario((prevUsuario) => {
      if (!prevUsuario) return null; 

      const updatedUser = { ...prevUsuario, enderecos: newAddresses };
      sessionStorage.setItem("usuario", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, updateUsuario, updateUserAddresses }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
