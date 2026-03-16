const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const adminAPI = {
  async login(login: string, senha: string) {
    try {
      const res = await fetch(`${API_URL}/adm/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, senha }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "não autorizado");

        } else {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Erro ao fazer login");
        }
      }

      return res.json();
    } catch (e) {
      throw new Error(e + "\n Falha ao conectar ao servidor");
    }
  },

  async me(token: string) {
    console.log(token)
    const res = await fetch(`${API_URL}/restrito`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Não autenticado");

    return res.json();
  }
};
