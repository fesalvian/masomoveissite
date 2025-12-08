// pages/LandingPage.tsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTAButton from "../components/CTAButton";
import HeroCarousel from "../components/HeroCarousel";
import FAQ from "../components/FAQ";
import Reviews from "../components/Reviews";
import ProjectModal from "../components/ProjectModal";
import { getRecentProjects } from "../src/service/projetos";
import type { Projeto } from "../src/types";

import {
  getHomeData,
} from "../src/service/home";

import type { HomeHero } from "../src/service/home";

const LandingPage: React.FC = () => {
  const [hero, setHero] = useState<HomeHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState<Projeto[]>([]);
  const [selected, setSelected] = useState<Projeto | null>(null);


  useEffect(() => {
    (async () => {
      try {
        const data = await getHomeData();
        setHero(data.hero);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
  (async () => {
    try {
      const p = await getRecentProjects();
      setRecent(p);
    } catch (e) {
      console.error(e);
    }
  })();
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-primary to-black">
      <Header />

      {/* HERO */}
      <section className="pt-24 md:pt-28">
        <div className="mx-auto w-full max-w-[80rem] px-4 grid md:grid-cols-2 gap-8 items-center">
          
          {/* TEXTOS + BOTÃO */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {hero?.heroTitle ?? "Móveis planejados que elevam seu espaço."}
            </h1>

            <p className="mt-4 text-white/80">
              {hero?.heroSubtitle ?? "Projeto, fabricação e instalação com acabamento premium."}
            </p>

            <div className="mt-6"><CTAButton /></div>
          </div>

          {/* CARROSSEL DINÂMICO */}
          <HeroCarousel
  className="bg-white/10"
  images={[
    { src: "/carousel/hero1.webp", alt: "Cozinha planejada Maso" },
    { src: "/carousel/hero2.webp", alt: "Ambiente moderno Maso" },
    { src: "/carousel/hero3.webp", alt: "Lavanderia premium Maso" }
  ]}
  intervalMs={2500}
/>

        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="mt-16">
        <div className="mx-auto w-full max-w-[80rem] px-4">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">O que fazemos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Cozinhas planejadas", d: "Funcionalidade + estética sob medida." },
              { t: "Dormitórios e closets", d: "Organização inteligente e acabamento fino." },
              { t: "Salas e home offices", d: "Design que valoriza seu dia a dia." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl p-5 bg-white/5 border border-white/10 text-white">
                <h3 className="font-semibold">{c.t}</h3>
                <p className="text-white/70 mt-1">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
<section className="mt-16">
  <div className="mx-auto w-full max-w-[80rem] px-4">
    <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
      Projetos recentes
    </h2>

    {recent.length === 0 ? (
      <p className="text-white/60">Nenhum projeto encontrado.</p>
    ) : (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recent.map((p) => (
          <div
            key={p.id}
            className="aspect-square rounded-lg overflow-hidden bg-white/10 border border-white/10 cursor-pointer hover:scale-[1.02] transition"
            onClick={() => setSelected(p)}
          >
            <img
              src={p.capa}
              alt={p.nome}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    )}

    <div className="mt-6 flex gap-3">
      <CTAButton text="Quero um projeto" />
    </div>
  </div>
</section>


{/* SOBRE O MATERIAL (MDF) */}
<section className="mt-16">
  <div className="mx-auto w-full max-w-[80rem] px-4 grid md:grid-cols-2 gap-8 items-center">
    {/* Texto */}
    <div className="order-2 md:order-1 text-white">
      <span className="inline-block text-xs uppercase tracking-wide text-white/60 mb-2">Material</span>
      <h2 className="text-2xl md:text-3xl font-bold">
        MDF: resistência, estabilidade e acabamento premium
      </h2>

      <p className="mt-3 text-white/80">
        O MDF (Medium Density Fiberboard) é um painel de fibras de madeira de densidade média,
        com superfície lisa que permite cortes precisos e um acabamento impecável — ideal para móveis planejados.
      </p>

      <ul className="mt-4 space-y-3 text-white/80">
        <li className="flex gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-brand-accent"></span>
          <span><strong>Estável</strong>: menor risco de empeno/rachaduras com variações climáticas.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-brand-accent"></span>
          <span><strong>Acabamento superior</strong>: perfeito para pintura PU, BP (melamínico), lâmina natural e usinagens.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-brand-accent"></span>
          <span><strong>Durabilidade</strong>: chapas de fornecedores certificados + colagem e fita de borda de alta performance.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-brand-accent"></span>
          <span><strong>Custo-benefício</strong>: ótimo equilíbrio entre preço, versatilidade e qualidade no resultado final.</span>
        </li>
      </ul>

      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="font-semibold">Corte preciso</p>
          <p className="text-white/60 text-sm">Usinagem limpa e encaixes perfeitos.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="font-semibold">Variedade de padrões</p>
          <p className="text-white/60 text-sm">Madeirados, texturas e cores lisas.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="font-semibold">Manutenção simples</p>
          <p className="text-white/60 text-sm">Superfícies fáceis de limpar.</p>
        </div>
      </div>
    </div>

    {/* Imagem */}
    <div className="order-1 md:order-2">
      <div className="relative aspect-[1/1]">
        <img
          src="/mdf/placa.webp"   // troque pelo seu arquivo se quiser
          alt="Detalhe de chapa MDF com acabamento"
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.25"; }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </div>
  </div>
</section>

      {/* FAQ */}
      <FAQ />

      {/* Avaliações */}
      <Reviews />


      <Footer />
      {selected && (
  <ProjectModal
    project={selected}
    onClose={() => setSelected(null)}
  />
)}

    </div>
  );
};

export default LandingPage;
