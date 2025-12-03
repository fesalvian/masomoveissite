const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type Project = {
  id: number;
  title: string;
  category: string;
  city: string;
  year: number;
  tags: any; // depois refinamos
  imageUrl: string;
};

export type ColorSample = {
  id: number;
  name: string;
  code: string;
  category: string;
  imageUrl: string;
};

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/api/public/projects`);
  if (!res.ok) throw new Error("Erro ao buscar projetos");
  return (await res.json()) as Project[];
}

export async function fetchColors() {
  const res = await fetch(`${API_URL}/api/public/colors`);
  if (!res.ok) throw new Error("Erro ao buscar cores");
  return (await res.json()) as ColorSample[];
}

export async function sendContact(data: {
  name: string;
  phone: string;
  message: string;
}) {
  const res = await fetch(`${API_URL}/api/public/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao enviar contato");
  return res.json();
}
