import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contato: React.FC = () => {
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !tel) return alert("Nome e telefone são obrigatórios.");
    const texto = `Olá, sou ${nome}. Telefone: ${tel}. ${msg}`;
    window.open(`https://wa.me/5544991684130?text=${encodeURIComponent(texto)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand.primary to-black">
      <Header />
      <main className="pt-24 mx-auto max-w-xl px-4 text-white">
        <h1 className="text-3xl font-bold">Fale com a gente</h1>
        <p className="text-white/70 mt-2">Tire dúvidas ou peça um orçamento.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input value={nome} onChange={(e)=>setNome(e.target.value)} placeholder="Seu nome"
            className="w-full px-4 py-3 rounded bg-white/10 border border-white/10 outline-none" />
          <input value={tel} onChange={(e)=>setTel(e.target.value)} placeholder="Telefone/WhatsApp"
            className="w-full px-4 py-3 rounded bg-white/10 border border-white/10 outline-none" />
          <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder="Como podemos ajudar?" rows={5}
            className="w-full px-4 py-3 rounded bg-white/10 border border-white/10 outline-none" />
          <button type="submit" className="px-6 py-3 rounded bg-brand.accent text-white font-semibold">
            Enviar via WhatsApp
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;
