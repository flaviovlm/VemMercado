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

  // ATUALIZAR GLOBALMENTE O USUÁRIO (se necessário para outras partes)
  const updateUsuario = (newUser) => {
    setUsuario(newUser);
    sessionStorage.setItem("usuario", JSON.stringify(newUser));
  };

  // NOVA FUNÇÃO: Atualiza apenas os endereços do usuário no contexto
  const updateUserAddresses = (newAddresses) => {
    setUsuario((prevUsuario) => {
      if (!prevUsuario) return null; // Ou lide com este caso conforme a necessidade

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
