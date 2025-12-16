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
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao fazer login");
      }

      return res.json();
    } catch (e) {
      throw new Error(e + "\n Falha ao conectar ao servidor");
    }
  },

  async me(login:string, token: string) {
    const res = await fetch(`${API_URL}/restrito?login=`+login, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Não autenticado");

    return res.json();
  }
};
