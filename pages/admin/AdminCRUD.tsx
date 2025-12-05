// src/pages/admin/AdminCRUD.tsx
import { useEffect, useState } from "react";
import { useAdminAuth } from "../../src/context/AdminAuthContext";
import { adminUsersAPI } from "../../src/service/adminUsers";

export default function AdminCRUD() {
  const { token } = useAdminAuth();
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function loadAdmins() {
    setLoading(true);
    const data = await adminUsersAPI.list(token!);
    setAdmins(data);
    setLoading(false);
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  async function handleCreate() {
    if (!form.name || !form.email || !form.password) return alert("Preencha todos os campos.");

    await adminUsersAPI.create(token!, form);
    await loadAdmins();

    setForm({ name: "", email: "", password: "" });
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir este admin?")) return;
    await adminUsersAPI.remove(token!, id);
    await loadAdmins();
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Administradores</h1>

      {/* FORM DE CRIAÇÃO */}
      <div className="bg-white/10 border border-white/20 rounded p-4 max-w-md mb-8">
        <h2 className="text-lg font-semibold mb-3">Criar administrador</h2>

        <input
  className="w-full p-2 rounded bg-black/30 mb-2"
  placeholder="Nome"
  value={form.name}
  autoComplete="off"
  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
/>

<input
  className="w-full p-2 rounded bg-black/30 mb-2"
  placeholder="E-mail"
  value={form.email}
  autoComplete="new-email"
  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
/>

<input
  className="w-full p-2 rounded bg-black/30 mb-4"
  placeholder="Senha"
  type="password"
  value={form.password}
  autoComplete="new-password"
  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
/>


        <button
          onClick={handleCreate}
          className="bg-brand-accent text-black font-bold px-4 py-2 rounded w-full"
        >
          Criar admin
        </button>
      </div>

      {/* LISTA DE ADMINS */}
      <h2 className="text-lg font-semibold mb-3">Lista de administradores</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="space-y-3">
          {admins.map((adm) => (
            <div
              key={adm.id}
              className="bg-white/5 border border-white/10 rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{adm.name}</p>
                <p className="text-white/60 text-sm">{adm.email}</p>
              </div>

              <button
                onClick={() => handleDelete(adm.id)}
                className="text-red-400 hover:text-red-300"
              >
                Deletar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
