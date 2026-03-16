import React, { createContext, useContext, useEffect, useState } from "react";

type AdminUser = {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  usuario: {
    login: string;
    role: string;
  }

};

type AdminAuthContextType = {
  user: AdminUser | null;
  login: string | null;
  token: string | null;
  loading: boolean;
  loginf: (login: string, token: string) => Promise<void>;
  admin: (admin: AdminUser) => Promise<void>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be inside provider");
  return ctx;
};

// helper wait
const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuth() {
      await wait(500); // ⏱ força tempo mínimo de carregamento

      const storedLogin = localStorage.getItem("admin_login");
      const storedToken = localStorage.getItem("admin_token");
      const storedUser = localStorage.getItem("admin_user");

      if (storedLogin) setLogin(storedLogin);
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));

      setLoading(false);
    }

    loadAuth();
  }, []);

  async function loginf(login: string, token: string) {
    localStorage.setItem("admin_login", login);
    localStorage.setItem("admin_token", token);
    setLogin(login);
    setToken(token);
  }

  async function admin(adm: any) {
    const user = {
      id: adm.id,
      nome: adm.nome,
      cpf: adm.cpf,
      email: adm.email,
      usuario: {
        login: adm.usuario.login,
        role: adm.usuario.role
      }
    };

    localStorage.setItem("admin_user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.clear();
    setLogin(null);
    setToken(null);
    setUser(null);
  }

  return (
    <AdminAuthContext.Provider
      value={{ user, login, token, loading, loginf, admin, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
