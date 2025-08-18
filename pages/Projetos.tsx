import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { projects } from "../src/data/projects";
import type { Project } from "../src/types";

const ambientes = ["Todos", "Cozinha", "Dormitório", "Sala", "Banheiro", "Escritório", "Área Gourmet"] as const;

const Projetos: React.FC = () => {
  const [filtroAmb, setFiltroAmb] = useState<typeof ambientes[number]>("Todos");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Project | null>(null);

  const list = useMemo(() => {
    return projects.filter(p => {
      const okAmb = filtroAmb === "Todos" || p.ambiente === filtroAmb;
      const qLow = q.toLowerCase();
      const okQ = !q || p.title.toLowerCase().includes(qLow) || (p.cidade ?? "").toLowerCase().includes(qLow);
      return okAmb && okQ;
    });
  }, [filtroAmb, q]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-primary to-black">
      <Header />

      <main className="pt-24 md:pt-28 mx-auto w-full max-w-[80rem] px-4">
        <h1 className="text-white text-3xl font-bold">Projetos</h1>
        <p className="text-white/70 mt-2">Alguns trabalhos da Maso Móveis.</p>

        {/* filtros */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="flex flex-wrap gap-2">
            {ambientes.map(l => (
              <button
                key={l}
                onClick={() => setFiltroAmb(l)}
                className={`px-4 py-2 rounded border ${filtroAmb === l ? "bg-brand-accent text-black border-transparent" : "border-white/10 text-white/80 hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título ou cidade..."
            className="flex-1 px-4 py-2 rounded bg-white/10 border border-white/10 text-white outline-none"
          />
        </div>

        {/* grid */}
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {list.map(p => <ProjectCard key={p.id} project={p} onClick={setActive} />)}
        </div>

        {list.length === 0 && <p className="text-white/60 mt-6">Nenhum projeto encontrado.</p>}
      </main>

      <Footer />

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </div>
  );
};

export default Projetos;
