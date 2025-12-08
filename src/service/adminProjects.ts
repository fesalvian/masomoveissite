// src/service/adminProjects.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const adminProjectsAPI = {
  async list(token: string) {
    const res = await fetch(`${API_URL}/api/admin/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Erro ao listar projetos");
    return res.json();
  },

  async create(token: string, data: any) {
    const res = await fetch(`${API_URL}/api/admin/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erro ao criar projeto");
    return res.json();
  },

  async update(token: string, id: number, data: any) {
    const res = await fetch(`${API_URL}/api/admin/projects/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erro ao atualizar projeto");
    return res.json();
  },

  async remove(token: string, id: number) {
  const res = await fetch(`${API_URL}/api/admin/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao remover projeto");

  return; 
},
};
