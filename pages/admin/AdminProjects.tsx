// pages/admin/AdminProjects.tsx
import { useState, useEffect, useRef } from "react";
import { adminProjectsAPI } from "../../src/service/adminProjects";
import { adminColorsAPI } from "../../src/service/adminColors";
import { uploadImage, fileToBase64 } from "../../src/service/upload";
import { useAdminAuth } from "../../src/context/AdminAuthContext";
import placeholderImg from "../../src/assets/placeholder.jpg";

type ProjetoForm = {
  nome: string;
  descricao: string;
  ambiente: string;
  capaUrl: string;
  capaFile: File | null;
  imagensFiles: File[];
  imagensUrls: string[];
  tags: string[];
  tagInput: string;
  coresSelecionadas: number[];
};

export default function AdminProjects() {
  const { token } = useAdminAuth();

  const [projects, setProjects] = useState<any[]>([]);
  const [cores, setCores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [colorSearch, setColorSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const capaInputRef = useRef<HTMLInputElement>(null);
  const imagensInputRef = useRef<HTMLInputElement>(null);



  const [form, setForm] = useState<ProjetoForm>({
    nome: "",
    descricao: "",
    ambiente: "COZINHA",
    capaUrl: "",
    capaFile: null,
    imagensFiles: [],
    imagensUrls: [],
    tags: [],
    tagInput: "",
    coresSelecionadas: [],
  });

  // ---------- PREVIEW DO PROJETO ----------
  const previewProjeto = {
    nome: form.nome || "Novo projeto",
    descricao: form.descricao || "Descrição aparecerá aqui...",
    ambiente: form.ambiente,
    capa: form.capaUrl || (placeholderImg as string),
    imagens: form.imagensUrls.map((url) => ({ url })),
    coresUsadas: form.coresSelecionadas
      .map((id) => {
        const cor = cores.find((c) => c.id === id);
        return cor ? { id: cor.id, cor } : null;
      })
      .filter(Boolean) as { id: number; cor: any }[],
  };

  async function load() {
    setLoading(true);
    const p = await adminProjectsAPI.list(token!);
    const c = await adminColorsAPI.list(token!);
    setProjects(p);
    setCores(c);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // ---------- UPLOAD CAPA ----------
  async function handleUploadCapa() {
    if (!form.capaFile) return alert("Selecione a capa.");
    const base64 = await fileToBase64(form.capaFile);
    const url = await uploadImage(base64, token!);
    setForm((f) => ({ ...f, capaUrl: url }));
  }

  // ---------- UPLOAD IMAGENS EXTRAS ----------
  async function handleUploadImagens() {
    if (!form.imagensFiles.length) return alert("Selecione as imagens.");
    const urls: string[] = [];

    for (const file of form.imagensFiles) {
      const base64 = await fileToBase64(file);
      const url = await uploadImage(base64, token!);
      urls.push(url);
    }

    setForm((f) => ({ ...f, imagensUrls: urls }));
  }

  // ---------- CRIAR / SALVAR PROJETO ----------
  async function handleCreate() {
  const { nome, descricao, ambiente, capaUrl, imagensUrls, tags, coresSelecionadas } = form;

  if (!nome || !descricao || !capaUrl) {
    return alert("Nome, descrição e capa são obrigatórios");
  }

  await adminProjectsAPI.create(token!, {
  nome,
  descricao,
  ambiente,
  capa: capaUrl,
  imagens: form.imagensUrls,       
  tags: form.tags,                  
  coresUsadas: form.coresSelecionadas, 
});


  // reset form
  setEditingId(null);
  setForm({
    nome: "",
    descricao: "",
    ambiente: "COZINHA",
    capaUrl: "",
    capaFile: null,
    imagensFiles: [],
    imagensUrls: [],
    tags: [],
    tagInput: "",
    coresSelecionadas: [],
  });

  load();
}

  async function handleUpdate() {
  if (!editingId) return;

  const { nome, descricao, ambiente, capaUrl, imagensUrls, tags, coresSelecionadas } = form;

  await adminProjectsAPI.update(token!, editingId, {
  nome,
  descricao,
  ambiente,
  capa: capaUrl,

  imagens: imagensUrls,
  tags: tags,
  coresUsadas: coresSelecionadas,
});


  setEditingId(null);

  setForm({
    nome: "",
    descricao: "",
    ambiente: "COZINHA",
    capaUrl: "",
    capaFile: null,
    imagensFiles: [],
    imagensUrls: [],
    tags: [],
    tagInput: "",
    coresSelecionadas: [],
  });

  load();
}

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este projeto?")) return;
    await adminProjectsAPI.remove(token!, id);
    load();
  }

  // cores filtradas pela searchbar
  const coresFiltradas = cores.filter((c) => {
    const q = colorSearch.toLowerCase();
    return (
      c.nome.toLowerCase().includes(q) ||
      c.linha.toLowerCase().includes(q) ||
      c.colecao.toLowerCase().includes(q) ||
      c.tipo.toLowerCase().includes(q)
    );
  });

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Projetos</h1>

      {/* TOPO: PREVIEW + FORM */}
      <div className="flex gap-6 items-start mb-10">


        {/* COLUNA FORM */}
        <div className="flex-1 bg-white/10 border border-white/20 rounded p-6">
          <h2 className="text-lg font-semibold mb-4">Criar Projeto</h2>

          {/* Nome */}
          <input
            className="w-full p-2 rounded bg-black/30 mb-2"
            placeholder="Nome do projeto"
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
          />

          {/* Descrição */}
          <textarea
            className="w-full p-2 rounded bg-black/30 mb-2"
            placeholder="Descrição"
            rows={3}
            value={form.descricao}
            onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
          />

          {/* Ambiente */}
          <select
            className="w-full p-2 rounded bg-black/30 mb-4"
            value={form.ambiente}
            onChange={(e) => setForm((f) => ({ ...f, ambiente: e.target.value }))}
          >
            <option value="COZINHA">Cozinha</option>
            <option value="DORMITORIO">Dormitório</option>
            <option value="SALA">Sala</option>
            <option value="BANHEIRO">Banheiro</option>
            <option value="ESCRITORIO">Escritório</option>
            <option value="AREA_GOURMET">Área Gourmet</option>
          </select>

          {/* UPLOAD DE CAPA */}
<div className="mb-4">
  <label className="font-semibold block mb-1">Capa do Projeto</label>

  {/* REFERÊNCIA DO INPUT OCULTO */}
  <input
    ref={capaInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const base64 = await fileToBase64(file);
      const url = await uploadImage(base64, token!);

      setForm((f) => ({
        ...f,
        capaUrl: url,
        capaFile: file,
      }));
    }}
  />

  {/* BOTÃO CUSTOMIZADO */}
  {form.capaUrl ? (
    <button
      onClick={() => {
        setForm((f) => ({ ...f, capaUrl: "", capaFile: null }));
        if (capaInputRef.current) capaInputRef.current.value = "";
      }}
      className="w-full py-2 bg-red-600 hover:bg-red-700 active:scale-95 transition rounded mb-3 hover:cursor-pointer"
    >
      Remover capa
    </button>
  ) : (
    <button
      onClick={() => capaInputRef.current?.click()}
      className="w-full py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition rounded mb-3 hover:cursor-pointer"
    >
      Escolher capa
    </button>
  )}

  {form.capaUrl && (
    <img
      src={form.capaUrl}
      className="w-40 rounded border border-white/20 mt-3"
    />
  )}
</div>


        {/* UPLOAD MULTIPLAS IMAGENS */}
<div className="mb-4">
  <label className="font-semibold block mb-1">Imagens extras</label>

  <input
    ref={imagensInputRef}
    type="file"
    accept="image/*"
    multiple
    className="hidden"
    onChange={async (e) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length === 0) return;

      const urls: string[] = [];

      for (const file of files) {
        const base64 = await fileToBase64(file);
        const url = await uploadImage(base64, token!);
        urls.push(url);
      }

      setForm((f) => ({
        ...f,
        imagensUrls: [...f.imagensUrls, ...urls],
      }));
    }}
  />

  <button
    onClick={() => imagensInputRef.current?.click()}
    className="w-full py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition rounded mb-3 hover:cursor-pointer"
  >
    Selecionar imagens
  </button>

  {/* Previews */}
  <div className="grid grid-cols-3 gap-2 mt-3">
    {form.imagensUrls.map((url) => (
      <div key={url} className="relative">
        <img src={url} className="h-20 w-full object-cover rounded" />

        {/* Remover imagem */}
        <button
          onClick={() =>
            setForm((f) => ({
              ...f,
              imagensUrls: f.imagensUrls.filter((u) => u !== url),
            }))
          }
          className="absolute top-1 right-1 bg-red-600 rounded-full px-2 text-xs hover:cursor-pointer"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div>

          {/* TAGS */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Tags</label>

            <div className="flex gap-2">
              <input
  className="flex-1 p-2 rounded bg-black/30"
  placeholder="Adicionar tag"
  value={form.tagInput}
  onChange={(e) => setForm((f) => ({ ...f, tagInput: e.target.value }))}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (form.tagInput.trim().length > 0) {
        setForm((f) => ({
          ...f,
          tags: [...f.tags, f.tagInput.trim()],
          tagInput: "",
        }));
      }
    }
  }}
/>


              <button
                onClick={() => {
                  if (form.tagInput.trim().length > 0) {
                    setForm((f) => ({
                      ...f,
                      tags: [...f.tags, f.tagInput.trim()],
                      tagInput: "",
                    }));
                  }
                }}
                className="px-4 bg-blue-500 rounded hover:cursor-pointer"
              >
                +
              </button>
            </div>

            <div className="flex gap-2 flex-wrap mt-2">
              {form.tags.map((t) => (
                <span
                  key={t}
                  className="bg-white/20 px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {t}
                  <button
                    onClick={() =>
                      setForm((f) => ({ ...f, tags: f.tags.filter((x) => x !== t) }))
                    }
                    className="hover:cursor-pointer ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* CORES DO PROJETO */}
          <div className="mb-6">
            <label className="font-semibold block mb-1">Cores usadas</label>

            {/* Search */}
            <input
              className="w-full p-2 rounded bg-black/30 mb-2"
              placeholder="Buscar cor (nome, linha, coleção, tipo)..."
              value={colorSearch}
              onChange={(e) => setColorSearch(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-auto p-2 border border-white/10 rounded">
              {coresFiltradas.map((c) => (
                <label key={c.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.coresSelecionadas.includes(c.id)}
                    className="hover:cursor-pointer"
                    onChange={(e) => {
                      setForm((f) => ({
                        ...f,
                        coresSelecionadas: e.target.checked
                          ? [...f.coresSelecionadas, c.id]
                          : f.coresSelecionadas.filter((x) => x !== c.id),
                      }));
                    }}
                  />
                  <img src={c.imagem} className="w-10 h-10 rounded" />
                  <span>{c.nome}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
  onClick={editingId ? handleUpdate : handleCreate}
  className="w-full py-2 rounded text-black font-semibold
             bg-green-500 hover:bg-green-600 transition hover:cursor-pointer"
>
  {editingId ? "Salvar alterações" : "Criar Projeto"}
</button>

        </div>

                {/* COLUNA PREVIEW */}
        <div className="w-[360px] bg-white/10 border border-white/20 rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Pré-visualização</h2>

          {/* Capa */}
          <div className="aspect-video w-full bg-black/20 rounded overflow-hidden mb-3">
            <img
              src={previewProjeto.capa}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="font-bold text-white">{previewProjeto.nome}</h3>
          <p className="text-white/70 text-sm mt-1">{previewProjeto.descricao}</p>
          <p className="text-white/50 text-xs mt-1">{previewProjeto.ambiente}</p>

          {/* Cores usadas */}
          {previewProjeto.coresUsadas.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2 text-white">Cores usadas</p>

              <div className="flex flex-wrap gap-2">
                {previewProjeto.coresUsadas.map((c) => (
                  <div key={c.id} className="flex items-center gap-1 ">
                    <img
                      src={c.cor.imagem}
                      className="w-8 h-8 rounded border border-white/10 object-cover"
                    />
                    <span className="text-xs text-white/80">{c.cor.nome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Thumbnails */}
          {previewProjeto.imagens.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {[previewProjeto.capa, ...previewProjeto.imagens.map((i) => i.url)].map((src) => (
                <img
                  key={src}
                  src={src}
                  className="w-20 h-16 object-cover rounded border border-white/10"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LISTA DE PROJETOS */}
      <h2 className="text-xl font-semibold mb-4">Projetos cadastrados</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-white/10 border border-white/20 rounded p-4">
              <img src={p.capa} className="w-full h-32 object-cover rounded mb-2" />

              <p className="font-bold">{p.nome}</p>
              <p className="text-xs text-white/60">{p.ambiente}</p>

              <button
  onClick={() => {
    setEditingId(p.id); // ativar modo edição
    setForm({
      nome: p.nome,
      descricao: p.descricao,
      ambiente: p.ambiente,
      capaUrl: p.capa,
      capaFile: null,
      imagensFiles: [],
      imagensUrls: p.imagens.map((i: any) => i.url),
      tags: p.tags.map((t: any) => t.tag),
      tagInput: "",
      coresSelecionadas: p.coresUsadas.map((c: any) => c.corId),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  className="mt-3 py-1 bg-blue-500 rounded text-white font-semibold w-full hover:cursor-pointer hover:bg-blue-600"
>
  Editar
</button>


              <button
                onClick={() => handleDelete(p.id)}
                className="mt-3 py-1 bg-red-500/80 hover:bg-red-500 rounded text-white font-semibold w-full hover:cursor-pointer"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
