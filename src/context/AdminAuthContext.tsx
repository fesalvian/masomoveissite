// src/context/AdminAuthContext.tsx
import React, { createContext, useContext, useState } from "react";
//import { adminAPI } from "../service/admin";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;

};

type AdminAuthContextType = {
  user: AdminUser | null;
  login: string | null;
  token: string | null;
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

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState<string | null>(localStorage.getItem("admin_login"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [user, setUser] = useState<AdminUser | null>(null);

  // Carregar usuário ao iniciar


  async function loginf(login: string, token: string) {
    localStorage.setItem("admin_login", login);
    setToken(login)
    localStorage.setItem("admin_token", token);
    setToken(token);

  }
  async function admin(adm: any) {
    const user = {
      id: adm.id,
        name: adm.nome,
          email: adm.usuario.login,
            role: "ADM",
  };
  setUser(user);
  }


  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_login");
    setLogin(null)
    setToken(null);
    setUser(null);
  }

  return (
    <AdminAuthContext.Provider value={{ user, login, token, loginf, admin, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
