import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const login = async (e: any) => {
    e.preventDefault();

    // depois trocamos para chamada real
    if (email === "admin@maso.com" && password === "123") {
      nav("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d17] flex items-center justify-center">
      <form
        className="bg-white/5 border border-white/10 p-6 rounded-lg w-80"
        onSubmit={login}
      >
        <h2 className="text-white text-xl font-bold mb-4 text-center">Admin • Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-white/10 px-3 py-2 rounded text-white mb-3"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPass(e.target.value)}
          className="w-full bg-white/10 px-3 py-2 rounded text-white mb-4"
        />

        <button
          type="submit"
          className="w-full py-2 bg-brand-accent text-black font-semibold rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
