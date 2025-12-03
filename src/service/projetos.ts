import type { Projeto } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function getProjetos(): Promise<Projeto[]> {
  const res = await fetch(`${API_URL}/api/public/projects`);
  if (!res.ok) throw new Error("Erro ao carregar projetos");
  return res.json();
}

export async function getProjetosPorAmbiente(
  ambiente: string
): Promise<Projeto[]> {
  const res = await fetch(
    `${API_URL}/api/public/projects?ambiente=${encodeURIComponent(ambiente)}`
  );
  if (!res.ok) throw new Error("Erro ao carregar projetos");
  return res.json();
}

export async function buscarProjetos(search: string): Promise<Projeto[]> {
  const res = await fetch(
    `${API_URL}/api/public/projects?search=${encodeURIComponent(search)}`
  );
  if (!res.ok) throw new Error("Erro ao buscar projetos");
  return res.json();
}
