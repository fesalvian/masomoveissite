import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ColorCard from "../components/ColorCard";
import ColorModal from "../components/ColorModal";
import { getCores } from "../src/service/catalogo";
import type { Cor } from "../src/service/catalogo";

const linhas = ["Todas", "Madeira", "Neutros", "Coloridos"] as const;

const CatalogoCores: React.FC = () => {
  const [all, setAll] = useState<Cor[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [linha, setLinha] = useState<typeof linhas[number]>("Todas");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Cor | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getCores();
        setAll(data);
        setErr(null);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setErr(e.message);
        } else {
          setErr("Erro ao carregar catálogo");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const list = useMemo(() => {
    const qLow = q.toLowerCase();
    return all.filter(c => {
      const okLinha = linha === "Todas" || c.line === linha;
      const okBusca = !q || c.name.toLowerCase().includes(qLow) || c.code.toLowerCase().includes(qLow);
      return okLinha && okBusca;
    });
  }, [all, linha, q]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-primary to-black">
      <Header />
      <main className="pt-24 md:pt-28 mx-auto w-full max-w-[80rem] px-4">
        <h1 className="text-white text-3xl font-bold">Catálogo de Cores</h1>
        <p className="text-white/70 mt-2">Amostras ilustrativas do fornecedor.</p>

        {/* filtros */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="flex flex-wrap gap-2">
            {linhas.map(l => (
              <button
                key={l}
                onClick={() => setLinha(l)}
                className={`px-4 py-2 rounded border ${linha === l ? "bg-brand-accent text-black border-transparent" : "border-white/10 text-white/80 hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome ou código..."
            className="flex-1 px-4 py-2 rounded bg-white/10 border border-white/10 text-white outline-none"
          />
        </div>

        {/* loading/erro */}
        {loading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg h-40 bg-white/10 border border-white/10 animate-pulse" />
            ))}
          </div>
        )}
        {err && !loading && <p className="text-red-400 mt-6">{err}</p>}

        {/* grid */}
        {!loading && !err && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {list.map((c) => (
              <ColorCard key={c.code} cor={c} onClick={setActive} />
            ))}
          </div>
        )}
        {!loading && !err && list.length === 0 && <p className="text-white/60 mt-6">Nenhuma cor encontrada.</p>}
      </main>
      <Footer />

      {active && <ColorModal cor={active} onClose={() => setActive(null)} />}
    </div>
  );
};

export default CatalogoCores;
