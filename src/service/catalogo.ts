const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type Cor = {
  id: number;
  nome: string;
  linha: string;
  colecao: string;
  tipo: "MADEIRA" | "NEUTRO" | "ROCHOSO";
  imagem: string;
};

export async function getCores(): Promise<Cor[]> {
  const res = await fetch(`${API_URL}/api/public/colors`);

  if (!res.ok) {
    throw new Error("Erro ao carregar catálogo de cores");
  }

  const data = (await res.json()) as Cor[];
  return data;
}
