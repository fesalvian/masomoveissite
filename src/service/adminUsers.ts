const API_URL = import.meta.env.VITE_API_URL;

export const adminUsersAPI = {
  async list(token: string) {
    const res = await fetch(`${API_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Erro ao carregar admins");
    return res.json();
  },

  async create(token: string, data: { name: string; email: string; password: string }) {
    const res = await fetch(`${API_URL}/api/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Erro ao criar admin");
    }

    return res.json();
  },

  async remove(token: string, id: number) {
    const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) return { success: true }; // evita erro de JSON vazio

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Erro ao deletar admin");
    }

    return res.json();
  },
};
