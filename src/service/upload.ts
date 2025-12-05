// src/service/upload.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function uploadImage(
  base64: string,
  token: string,
  folder: "projeto" | "cor" = "projeto"
) {
  const res = await fetch(`${API_URL}/api/admin/upload-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64,   
      folder,
    }),
  });

  if (!res.ok) throw new Error("Erro no upload da imagem");

  const json = await res.json();
  return json.url;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
