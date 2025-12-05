// src/service/adminColors.ts
const API_URL = import.meta.env.VITE_API_URL;

export const adminColorsAPI = {
  async list(token: string) {
    return fetch(`${API_URL}/api/admin/colors`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json());
  },

  async create(token: string, data: any) {
    return fetch(`${API_URL}/api/admin/colors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(r => r.json());
  },

  async update(token: string, data: any) {
  return fetch(`${API_URL}/api/admin/colors/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(r => r.json());
},

  async remove(token: string, id: number) {
    return fetch(`${API_URL}/api/admin/colors/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
