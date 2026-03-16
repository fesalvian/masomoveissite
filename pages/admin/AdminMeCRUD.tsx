// src/pages/admin/AdminCRUD.tsx
import { useEffect, useState } from "react";
import { useAdminAuth } from "../../src/context/AdminAuthContext";
import { adminUsersAPI } from "../../src/service/adminUsers";
import { adminAPI } from "../../src/service/admin";
import { useNavigate } from "react-router-dom";

export default function AdminCRUD() {
  const { user, token } = useAdminAuth();
  const login = user?.usuario.login
  const [loading, setLoading] = useState(true);
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cpf: "",
    name: "",
    email: "",
    usuario: {
      login: "",
      senha: ""
    }
  });

  async function loadAdmins() {
    setLoading(true);
    setLoading(false);
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  async function handleUpdate() {
    console.log("submit")
    if (
      !form.name &&
      !form.email &&
      !form.cpf &&
      !form.usuario.login &&
      !form.usuario.senha
    ) {
      return alert("Preencha pelo menos um campo.");
    }

    await adminUsersAPI.update(token!, login, form);
    await loadAdmins();

    setForm({
      cpf: "",
      name: "",
      email: "",
      usuario: {
        login: "",
        senha: ""
      }
    });
    const profile = await adminAPI.me(token!);
    console.log(profile)
    admin(profile)
  }
  async function handlInativa() {
    adminUsersAPI.remove(token!, login!).then(
      resp => {
        if (resp.sucess) {
          localStorage.clear();
          navigate("/admin/login");
        }
      }
    );

  }

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">
        Administrador: {user?.nome}
      </h1>
      <p className="mb-2">CPF: {user?.cpf}</p>
      <p className="mb-6">Login: {user?.usuario.login}</p>

      <div className="bg-white/10 border border-white/20 rounded p-4 max-w-md mb-8">
        <h2 className="text-lg font-semibold mb-3">
          Atualizar meus dados
        </h2>

        <input
          className="w-full p-2 rounded bg-black/30 mb-2"
          placeholder="Nome"
          value={form.name}
          onChange={(e) =>
            setForm((f) => ({ ...f, name: e.target.value }))
          }
        />

        <input
          className="w-full p-2 rounded bg-black/30 mb-2"
          placeholder="CPF"
          value={form.cpf}
          onChange={(e) =>
            setForm((f) => ({ ...f, cpf: e.target.value }))
          }
        />

        <input
          className="w-full p-2 rounded bg-black/30 mb-2"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) =>
            setForm((f) => ({ ...f, email: e.target.value }))
          }
        />

        <input
          className="w-full p-2 rounded bg-black/30 mb-2"
          placeholder="Login"
          value={form.usuario.login}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              usuario: { ...f.usuario, login: e.target.value }
            }))
          }
        />

        <input
          type="password"
          className="w-full p-2 rounded bg-black/30 mb-4"
          placeholder="Senha"
          value={form.usuario.senha}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              usuario: { ...f.usuario, senha: e.target.value }
            }))
          }
        />

        <button
          onClick={handleUpdate}
          className="bg-brand-accent text-black font-bold px-4 py-2 rounded w-full"
        >
          Atualizar admin
        </button>

        <button
          onClick={handlInativa}
          className="background-color red bg-red-500 text-white font-bold px-4 py-2 rounded w-full mt-4 mb-4 mx-2"
        >
          Inativar
        </button>
      </div>
    </div>
  );
}
