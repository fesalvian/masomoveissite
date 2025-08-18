export type Linha = "Madeira" | "Neutros" | "Coloridos";

export type Cor = {
  code: string;
  name: string;
  line: Linha;
  url: string; // caminho da imagem
};

let _cache: Cor[] | null = null;

export async function getCores(): Promise<Cor[]> {
  if (_cache) return _cache;
  const res = await fetch("/catalogo/cores.json", { headers: { "cache-control": "no-cache" } });
  if (!res.ok) throw new Error(`Falha ao carregar catálogo (${res.status})`);
  const data = (await res.json()) as Cor[];
  _cache = data.filter(c => c.code && c.name && c.url);
  return _cache;
}
