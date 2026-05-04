const API_URL = import.meta.env.VITE_API_URL;

export const adminUsersAPI = {
  async list(token: string) {
    const res = await fetch(`${API_URL}/restrito/adms`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Erro ao carregar admins");
    return res.json();
  },


  async create(token: string, data: { nome: string; cpf:string; email: string; usuario:{login:string, senha:string}}) {
    const res = await fetch(`${API_URL}/restrito/cadastro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( {
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          usuario:{
            login: data.usuario.login,
            senha: data.usuario.senha
          }
        }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Erro ao criar admin");
    }

    return res.json();
  },
   async update(token: string,login:any, data: { name: string; cpf:string; email: string; usuario:{login:string, senha:string} }) {
    const res = await fetch(`${API_URL}/restrito/`+login, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        {
          nome: data.name,
          cpf: data.cpf,
          email: data.email,
          usuario:{
            login: data.usuario.login,
            senha: data.usuario.senha
          }
        }
      ),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Erro ao criar admin");
    }

    return res.json();
  },

  async remove(token: string, login: string) {
    const res = await fetch(`${API_URL}/restrito/${login}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) return { success: true }; // evita erro de JSON vazio

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Erro ao deletar admin");
    }

    return res.json();
  }
};
