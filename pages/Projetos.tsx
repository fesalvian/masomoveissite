import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { getProjetos } from "../src/service/projetos";
import type { Projeto } from "../src/types";

const ambientesFrontend = [
  { label: "Todos", value: "TODOS" },
  { label: "Cozinha", value: "COZINHA" },
  { label: "Dormitório", value: "DORMITORIO" },
  { label: "Sala", value: "SALA" },
  { label: "Banheiro", value: "BANHEIRO" },
  { label: "Escritório", value: "ESCRITORIO" },
  { label: "Área Gourmet", value: "AREA_GOURMET" },
] as const;

const Projetos: React.FC = () => {
  const [all, setAll] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [filtroAmb, setFiltroAmb] = useState("TODOS");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Projeto | null>(null);

  // 🔥 Carregar do backend
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProjetos();
        setAll(data);
        setErr(null);
      } catch (e) {
        setErr("Erro ao carregar projetos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔍 Filtro + busca
  const list = useMemo(() => {
    const qLow = q.toLowerCase();

    return all.filter((p) => {
      const okAmb =
        filtroAmb === "TODOS" || p.ambiente === filtroAmb;

      const okQ =
        !q ||
        p.nome.toLowerCase().includes(qLow) ||
        p.descricao.toLowerCase().includes(qLow) ||
        p.tags.some((t) => t.tag.toLowerCase().includes(qLow));

      return okAmb && okQ;
    });
  }, [all, filtroAmb, q]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-primary to-black">
      <Header />

      <main className="pt-24 md:pt-28 mx-auto w-full max-w-[80rem] px-4">
        <h1 className="text-white text-3xl font-bold">Projetos</h1>
        <p className="text-white/70 mt-2">Alguns trabalhos da Maso Móveis.</p>

        {/* filtros */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="flex flex-wrap gap-2">
            {ambientesFrontend.map((amb) => (
              <button
                key={amb.value}
                onClick={() => setFiltroAmb(amb.value)}
                className={`px-4 py-2 rounded border ${
                  filtroAmb === amb.value
                    ? "bg-brand-accent text-black border-transparent"
                    : "border-white/10 text-white/80 hover:text-white"
                }`}
              >
                {amb.label}
              </button>
            ))}
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, descrição ou tags..."
            className="flex-1 px-4 py-2 rounded bg-white/10 border border-white/10 text-white outline-none"
          />
        </div>

        {/* loading */}
        {loading && (
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded bg-white/10 border border-white/10 animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {/* erro */}
        {err && (
          <p className="text-red-400 mt-6">{err}</p>
        )}

        {/* grid */}
        {!loading && !err && (
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {list.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={setActive} />
            ))}
          </div>
        )}

        {!loading && !err && list.length === 0 && (
          <p className="text-white/60 mt-6">Nenhum projeto encontrado.</p>
        )}
      </main>

      <Footer />

      {active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
};

export default Projetos;
