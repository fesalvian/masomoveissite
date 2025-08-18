import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "p01",
    title: "Cozinha L minimalista",
    ambiente: "Cozinha",
    cidade: "Planaltina do Paraná",
    ano: 2025,
    cores: ["BN-001", "PO-500"],
    cover: "/projetos/cozinha-1.jpg", // coloque imagens em /public/projetos/
    images: ["/projetos/cozinha-1.jpg", "/projetos/cozinha-1b.jpg"],
    descricao: "Cozinha com acabamento fosco, puxadores embutidos e iluminação em led.",
    tags: ["fosco", "led", "marcenaria premium"],
  },
  {
    id: "p02",
    title: "Closet com iluminação",
    ambiente: "Dormitório",
    cidade: "Paranavaí",
    ano: 2024,
    cores: ["MC-121", "BN-001"],
    cover: "/projetos/closet-1.jpg",
    images: ["/projetos/closet-1.jpg"],
    descricao: "Closet aberto com iluminação embutida e portas de espelho nas laterais.",
    tags: ["espelho", "iluminação"],
  },
  {
    id: "p03",
    title: "Home office compacto",
    ambiente: "Escritório",
    cidade: "Maringá",
    ano: 2024,
    cores: ["CU-090", "PO-500"],
    cover: "/projetos/home-1.jpg",
    images: ["/projetos/home-1.jpg"],
    descricao: "Estação de trabalho com nichos e painel ripado.",
    tags: ["ripado", "ergonomia"],
  },
];
