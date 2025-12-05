//src/pages/admin/AdminLogin.tsx
import React, { useState } from "react";
import { adminAPI } from "../../src/service/admin";
import { useAdminAuth } from "../../src/context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    try {
      const { token } = await adminAPI.login(email, password);
      await login(token);
      navigate("/admin");
    } catch (err: any) {
      setErr(err.message || "Erro no login");
    }
  }

  return (
    <div className="h-screen w-full grid place-items-center bg-[#0f1220] text-white">
      <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-xl font-semibold">Admin Login</h2>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded bg-black/40 border border-white/20"
        />

        {err && <p className="text-red-400 text-sm">{err}</p>}

        <button className="w-full py-2 bg-brand-accent text-black font-semibold rounded hover:bg-brand-accent/90 transition hover:cursor-pointer hover:text-white">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
