import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar"
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Produtos from "./pages/Produtos/Produtos";
import Carrinho from "./pages/Carrinho/Carrinho";
import Enderecos from "./pages/Enderecos/Enderecos";
import Perfil from "./pages/Perfil/Perfil";
import Pedidos from "./pages/Pedidos/Pedidos";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }){
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/login" />;
}

export default function App(){
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/produtos" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/produtos" element={<PrivateRoute><Produtos/></PrivateRoute>} />
          <Route path="/carrinho" element={<PrivateRoute><Carrinho/></PrivateRoute>} />
          <Route path="/enderecos" element={<PrivateRoute><Enderecos/></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><Perfil/></PrivateRoute>} />
          <Route path="/pedidos" element={<PrivateRoute><Pedidos/></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}