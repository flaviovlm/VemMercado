import React, { useEffect, useState } from "react";
import { listarEnderecos, criarEndereco, atualizarEndereco, deletarEndereco } from "../../api/enderecoApi";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  logradouro: yup.string().min(5).required(),
  numero: yup.string().max(10).required(),
  cep: yup.string().min(8).required(),
  estado: yup.string().min(3).required(),
  bairro: yup.string().min(3).required(),
  cidade: yup.string().min(5).required()
});

export default function Enderecos(){
  const { usuario } = useAuth();
  const [enderecos, setEnderecos] = useState([]);
  const [toast, setToast] = useState(null);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const load = () => {
    if (!usuario) return;
    listarEnderecos(usuario.id).then(res => setEnderecos(res)).catch(err => setToast(err.response?.data?.mensagem || "Erro ao carregar"));
  };

  useEffect(()=>{ load(); }, [usuario]);

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await atualizarEndereco(usuario.id, editing.id, data);
        setToast("Endereço atualizado");
        setEditing(null);
      } else {
        await criarEndereco(usuario.id, data);
        setToast("Endereço criado");
      }
      reset();
      load();
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro");
    } finally { setTimeout(()=>setToast(null),3000); }
  };

  const startEdit = (e) => {
    setEditing(e);
    reset(e);
  };

  const remove = async (id) => {
    try {
      await deletarEndereco(usuario.id, id);
      setToast("Endereço deletado");
      load();
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro ao deletar");
    } finally { setTimeout(()=>setToast(null),3000); }
  };

  return (
    <div>
      <h2>Endereços</h2>
      <div className="grid">
        {enderecos.map(e => (
          <div className="card" key={e.id}>
            <div className="card-body">
              <p>{e.logradouro}, {e.numero} - {e.bairro}</p>
              <p>{e.cidade} - {e.estado} - CEP: {e.cep}</p>
              <div className="card-footer">
                <button className="btn ghost" onClick={() => startEdit(e)}>Editar</button>
                <button className="btn ghost" onClick={() => remove(e.id)}>Remover</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card-form">
        <h3>{editing ? "Editar endereço" : "Novo endereço"}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Logradouro" {...register("logradouro")} />
          <p className="error">{errors.logradouro?.message}</p>
          <input placeholder="Número" {...register("numero")} />
          <p className="error">{errors.numero?.message}</p>
          <input placeholder="CEP" {...register("cep")} />
          <p className="error">{errors.cep?.message}</p>
          <input placeholder="Estado" {...register("estado")} />
          <p className="error">{errors.estado?.message}</p>
          <input placeholder="Bairro" {...register("bairro")} />
          <p className="error">{errors.bairro?.message}</p>
          <input placeholder="Cidade" {...register("cidade")} />
          <p className="error">{errors.cidade?.message}</p>
          <button className="btn" type="submit">{editing ? "Salvar" : "Criar"}</button>
          {editing && <button type="button" className="btn ghost" onClick={() => { setEditing(null); reset(); }}>Cancelar</button>}
        </form>
      </div>
      <Toast message={toast} />
    </div>
  );
}