// src/service/home.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// ==============================
// Tipos
// ==============================
export type HomeCarousel = {
  id: number;
  url: string;
  ordem: number;
  ativo: boolean;
  createdAt: string;
};

export type HomeHeroImage = {
  id: number;
  url: string;
  ordem: number;
  ativo: boolean;
};

export type HomeHero = {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  updatedAt: string;
  heroImages: HomeHeroImage[];
};

// ==============================
// Requests
// ==============================

// 🔹 Carrossel da home
export async function getHomeCarousel(): Promise<HomeCarousel[]> {
  const res = await fetch(`${API_URL}/api/public/home/carousel`);
  if (!res.ok) throw new Error("Erro ao carregar carousel");
  return res.json();
}

// 🔹 Hero (título, subtítulo e imagens)
export async function getHomeHero(): Promise<HomeHero | null> {
  const res = await fetch(`${API_URL}/api/public/home/hero`);
  if (!res.ok) throw new Error("Erro ao carregar hero");
  return res.json();
}

// 🔹 Tudo de uma vez (hero + carousel)
export async function getHomeData(): Promise<{
  carousel: HomeCarousel[];
  hero: HomeHero | null;
}> {
  const res = await fetch(`${API_URL}/api/public/home`);
  if (!res.ok) throw new Error("Erro ao carregar dados da home");
  return res.json();
}
