import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./style.css";
import logo from "../../assets/logo.svg"

export default function Navbar(){
  const { usuario, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="nav">
      <div className="nav-left">
      <Link to="/produtos" className="brand">
        <img src={logo} alt="VemMercado" className="logo-img" />
      </Link>
      </div>
      <nav className="nav-right">
        {usuario ? (
          <>
            <Link to="/produtos">Produtos</Link>
            <Link to="/pedidos">Meus Pedidos</Link>
            <Link to="/enderecos">Endereços</Link>
            <Link to="/perfil">Perfil</Link>
            <Link to="/carrinho">Carrinho ({items.length})</Link>
            <button className="btn ghost" onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/cadastro">Cadastrar-se</Link>
          </>
        )}
      </nav>
    </header>
  );
}