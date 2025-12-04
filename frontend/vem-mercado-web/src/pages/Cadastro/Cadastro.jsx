import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { cadastrarUsuario } from "../../api/usuarioApi";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";

const enderecoSchema = yup.object({
  logradouro: yup.string().min(5).required(),
  numero: yup.string().max(10).required(),
  cep: yup.string().min(8).required(),
  estado: yup.string().min(3).required(),
  bairro: yup.string().min(3).required(),
  cidade: yup.string().min(5).required()
});

const schema = yup.object({
  nome: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  senha: yup.string().min(3).max(10).required(),
  cpf: yup.string().min(11).required(),
  telefone: yup.string().min(11).required(),
  endereco: yup.array().of(enderecoSchema).min(1)
});

export default function Cadastro(){
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema), defaultValues: { endereco: [{}] } });
  const { fields, append, remove } = useFieldArray({ control, name: "endereco" });
  const [toast, setToast] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await cadastrarUsuario(data);
      setToast("Cadastro realizado com sucesso");
      setTimeout(()=> navigate("/login"), 1000);
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro no cadastro");
    } finally {
      setTimeout(()=>setToast(null),3000);
    }
  };

  return (
    <div className="card-form">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Nome" {...register("nome")} />
        <p className="error">{errors.nome?.message}</p>

        <input placeholder="Email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <input placeholder="Senha" type="password" {...register("senha")} />
        <p className="error">{errors.senha?.message}</p>

        <input placeholder="CPF" {...register("cpf")} />
        <p className="error">{errors.cpf?.message}</p>

        <input placeholder="Telefone" {...register("telefone")} />
        <p className="error">{errors.telefone?.message}</p>

        <h4>Endereços</h4>
        {fields.map((f, idx) => (
          <div key={f.id} className="address-block">
            <input placeholder="Logradouro" {...register(`endereco.${idx}.logradouro`)} />
            <input placeholder="Número" {...register(`endereco.${idx}.numero`)} />
            <input placeholder="CEP" {...register(`endereco.${idx}.cep`)} />
            <input placeholder="Estado" {...register(`endereco.${idx}.estado`)} />
            <input placeholder="Bairro" {...register(`endereco.${idx}.bairro`)} />
            <input placeholder="Cidade" {...register(`endereco.${idx}.cidade`)} />
            <button type="button" className="btn ghost" onClick={() => remove(idx)}>Remover</button>
          </div>
        ))}
        <button type="button" className="btn" onClick={() => append({})}>Adicionar endereço</button>

        <button className="btn" type="submit" disabled={isSubmitting}>Cadastrar</button>
      </form>
      <Toast message={toast} />
    </div>
  );
}