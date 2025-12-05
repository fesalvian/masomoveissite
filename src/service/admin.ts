// src/service/admin.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const adminAPI = {
  async login(email: string, password: string) {
    try {
      const res = await fetch(`${API_URL}/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao fazer login");
      }

      return res.json();
    } catch (e) {
      throw new Error("Falha ao conectar ao servidor");
    }
  },

  async me(token: string) {
    const res = await fetch(`${API_URL}/api/admin/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Não autenticado");

    return res.json();
  },
};
