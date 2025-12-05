// src/pages/admin/AdminColors.tsx
import { useEffect, useState, useRef } from "react";
import { useAdminAuth } from "../../src/context/AdminAuthContext";
import { adminColorsAPI } from "../../src/service/adminColors";
import { uploadImage, fileToBase64 } from "../../src/service/upload";
import ColorCard from "../../components/ColorCard";
import placeholderImg from "../../src/assets/placeholder.jpg";

type CorPreview = {
  id: number | null;
  nome: string;
  linha: string;
  colecao: string;
  tipo: "MADEIRA" | "NEUTRO" | "ROCHOSO"
  imagem: string;
};


export default function AdminColors() {
  const { token } = useAdminAuth();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [colors, setColors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CorPreview>({
  id: null,
  nome: "",
  linha: "",
  colecao: "",
  tipo: "" as "MADEIRA" | "NEUTRO" | "ROCHOSO",
  imagem: "",
});
  const [search, setSearch] = useState("");



  const [previewCor, setPreviewCor] = useState<CorPreview | null>(null);

  async function loadColors() {
    setLoading(true);
    const data = await adminColorsAPI.list(token!);
    setColors(data);
    setLoading(false);
  }

  useEffect(() => {
    loadColors();
  }, []);

  const filteredColors = colors.filter((c) => {
  const q = search.toLowerCase();

  return (
    c.nome.toLowerCase().includes(q) ||
    c.linha.toLowerCase().includes(q) ||
    c.colecao.toLowerCase().includes(q) ||
    c.tipo.toLowerCase().includes(q)
  );
});


  // 📌 Upload da imagem → preview automático
  async function handleUpload(e: any) {
  const file = e.target.files?.[0];

if (!file) {
  console.log("Nenhum arquivo selecionado");
  return;
}


  const base64 = await fileToBase64(file);
  const url = await uploadImage(base64, token!, "cor");

  // Atualiza form + preview corretamente
  setForm((f) => {
    const updated = { ...f, imagem: url };
    setPreviewCor(updated);
    return updated;
  });
}


  // 📌 Submeter criação/edição
  async function handleSubmit() {
  if (!form.nome || !form.linha || !form.colecao || !form.tipo || !form.imagem) {
    alert("Preencha todos os campos e envie a imagem.");
    return;
  }

  if (form.id === null) {
    await adminColorsAPI.create(token!, form);
  } else {
    await adminColorsAPI.update(token!, form);
  }

  // Limpa form após salvar
  setForm({
    id: null,
    nome: "",
    linha: "",
    colecao: "",
    tipo: "" as "MADEIRA" | "NEUTRO" | "ROCHOSO",
    imagem: "",
  });

  setPreviewCor(null);
  loadColors();
}

  // 📌 Carregar dados no formulário ao editar
  function handleEdit(cor: any) {
    setForm({
      id: cor.id,
      nome: cor.nome,
      linha: cor.linha,
      colecao: cor.colecao,
      tipo: cor.tipo,
      imagem: cor.imagem,
    });

    setPreviewCor(cor);
  }

  async function handleDelete(id: number) {
    if (!confirm("Confirmar exclusão?")) return;
    await adminColorsAPI.remove(token!, id);
    loadColors();
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Cores</h1>

      <div className="bg-white/10 p-4 rounded max-w-lg mb-8">
        <h2 className="text-lg font-semibold mb-3">
          {form.id ? "Editar cor" : "Cadastrar nova cor"}
        </h2>

        {/* NOME */}
<input
  className="w-full p-2 rounded bg-black/30 mb-2"
  placeholder="Nome"
  value={form.nome}
  onChange={(e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, nome: v }));
    setPreviewCor((p) => ({ ...(p ?? form), nome: v }));
  }}
/>

{/* LINHA */}
<input
  className="w-full p-2 rounded bg-black/30 mb-2"
  placeholder="Linha"
  value={form.linha}
  onChange={(e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, linha: v }));
    setPreviewCor((p) => ({ ...(p ?? form), linha: v }));
  }}
/>

{/* COLEÇÃO */}
<input
  className="w-full p-2 rounded bg-black/30 mb-2"
  placeholder="Coleção"
  value={form.colecao}
  onChange={(e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, colecao: v }));
    setPreviewCor((p) => ({ ...(p ?? form), colecao: v }));
  }}
/>

{/* TIPO */}
<select
  className="w-full p-2 rounded bg-black/30 mb-2"
  value={form.tipo}
  onChange={(e) => {
    const v = e.target.value as "MADEIRA" | "NEUTRO" | "ROCHOSO";
    setForm((f) => ({ ...f, tipo: v }));
    setPreviewCor((p) => ({ ...(p ?? form), tipo: v }));
  }}
>
  <option value="">Selecione o tipo</option>
  <option value="MADEIRA">Madeira</option>
  <option value="NEUTRO">Neutro</option>
  <option value="ROCHOSO">Rochoso</option>
</select>

        {/* Botão customizado para abrir o seletor de imagem */}
        {form.imagem ? (
  <button
    onClick={() => {
  setForm((f) => ({ ...f, imagem: "" }));
  setPreviewCor((p) => (p ? { ...p, imagem: "" } : null));

  // 🔥 ESSENCIAL PARA O UPLOAD FUNCIONAR NOVAMENTE
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
}}

    className="w-full py-2 bg-red-600 hover:bg-red-700 active:scale-95 transition rounded mb-3 hover:cursor-pointer"
  >
    Remover imagem
  </button>
) : (
  <button
    onClick={() => fileInputRef.current?.click()}
    className="w-full py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition rounded mb-3 hover:cursor-pointer"
  >
    Escolher imagem
  </button>
)}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        {/* Preview com ColorCard */}
        <div className="mb-4">
  <p className="text-sm mb-1 text-white/70">Pré-visualização:</p>

  <ColorCard
    cor={{
      id: previewCor?.id ?? 0,
      nome: previewCor?.nome || form.nome || "Nova cor",
      linha: previewCor?.linha || form.linha || "–",
      colecao: previewCor?.colecao || form.colecao || "–",
      tipo: previewCor?.tipo || form.tipo || "NEUTRO",
      imagem: previewCor?.imagem || placeholderImg,
    }}
  />
</div>


        <button
  onClick={handleSubmit}
  disabled={saving}
  className={`w-full py-2 rounded font-bold text-black transition hover:cursor-pointer
    ${saving ? "bg-green-300 cursor-not-allowed" :
               "bg-green-500 hover:bg-green-600 active:scale-95"}`}
>
  {saving ? "Salvando..." : form.id ? "Salvar alterações" : "Cadastrar cor"}
</button>


      </div>

      {/* Lista de cores */}
      <h2 className="text-lg mb-3">Cores cadastradas</h2>

      <div className="max-w-lg mb-4">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Buscar por nome, coleção, tipo..."
    className="w-full p-2 rounded bg-black/30 text-white placeholder-white/40"
  />
</div>


      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredColors.map((c) => (
            <div
              key={c.id}
              className="bg-white/5 border border-white/10 p-3 rounded"
            >
              <ColorCard cor={c} />

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(c)}
                  className="bg-blue-500 px-3 py-1 rounded text-white hover:cursor-pointer hover:bg-blue-600"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 px-3 py-1 rounded text-white hover:cursor-pointer hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
