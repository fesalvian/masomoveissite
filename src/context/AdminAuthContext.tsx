// src/context/AdminAuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { adminAPI } from "../service/admin";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AdminAuthContextType = {
  user: AdminUser | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be inside provider");
  return ctx;
};

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [user, setUser] = useState<AdminUser | null>(null);

  // Carregar usuário ao iniciar


  async function login(token: string) {
    localStorage.setItem("admin_token", token);
    setToken(token);

    const profile = await adminAPI.me(token);
    setUser(profile);
  }


  function logout() {
    localStorage.removeItem("admin_token");
    setToken(null);
    setUser(null);
  }

  return (
    <AdminAuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
