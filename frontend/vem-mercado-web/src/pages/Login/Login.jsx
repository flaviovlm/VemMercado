import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUsuario } from "../../api/usuarioApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../../components/Toast";
import "./style.css";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  senha: yup
    .string()
    .min(3, "Mínimo 3")
    .max(10, "Máximo 10")
    .required("Senha obrigatória"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [toast, setToast] = React.useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginUsuario(data);

      console.log("=== DEBUG LOGIN ===");
      console.log("Resposta completa:", res);
      console.log("Tem id?", res?.id);
      console.log("Tem usuario?", res?.usuario);

      // Se o backend retorna o usuário direto (primeira solução recomendada)
      if (res && res.id) {
        login(res);
        navigate("/produtos");
      }
      else if (res && res.usuario && res.usuario.id) {
        login(res.usuario);
        navigate("/produtos");
      }
      else if (res && res.message) {
        setToast(
          "Login realizado, mas dados do usuário não foram recebidos. Verifique o backend.",
        );
        setTimeout(() => setToast(null), 4000);
      } else {
        setToast("Erro: resposta inválida do servidor");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setToast(err.response?.data?.mensagem || err.message || "Erro no login");
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="card-form">
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <input placeholder="Senha" type="password" {...register("senha")} />
        <p className="error">{errors.senha?.message}</p>

        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p>
        Não tem conta? <Link to="/cadastro">Cadastrar-se</Link>
      </p>

      {toast && <Toast message={toast} />}
    </div>
  );
}
