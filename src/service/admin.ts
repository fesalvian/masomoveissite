const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const adminAPI = {
  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
};
