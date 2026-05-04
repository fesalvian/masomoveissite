// pages/admin/AdminProjects.tsx
import { useState, useEffect } from "react";
import { adminProjectsAPI } from "../../src/service/adminProjects";
import { adminColorsAPI } from "../../src/service/adminColors";
import { useAdminAuth } from "../../src/context/AdminAuthContext";
import placeholderImg from "../../src/assets/placeholder.jpg";

type ProjetoForm = {
  nome: string;
  descricao: string;
  ambiente: string;
  capaUrl: string;
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

  // Estados para inputs de URL
  const [capaUrlInput, setCapaUrlInput] = useState("");
  const [imagemUrlInput, setImagemUrlInput] = useState("");

  const [form, setForm] = useState<ProjetoForm>({
    nome: "",
    descricao: "",
    ambiente: "COZINHA",
    capaUrl: "",
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

  // ---------- ADICIONAR URL DA CAPA ----------
  function handleAddCapaUrl() {
    if (!capaUrlInput.trim()) {
      alert("Digite uma URL para a capa");
      return;
    }

    // Validação básica de URL
    try {
      new URL(capaUrlInput);
    } catch {
      alert("URL inválida");
      return;
    }

    setForm((f) => ({ ...f, capaUrl: capaUrlInput }));
    setCapaUrlInput("");
  }

  // ---------- ADICIONAR URL DE IMAGEM EXTRA ----------
  function handleAddImagemUrl() {
    if (!imagemUrlInput.trim()) {
      alert("Digite uma URL para a imagem");
      return;
    }

    // Validação básica de URL
    try {
      new URL(imagemUrlInput);
    } catch {
      alert("URL inválida");
      return;
    }

    setForm((f) => ({
      ...f,
      imagensUrls: [...f.imagensUrls, imagemUrlInput],
    }));
    setImagemUrlInput("");
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
      imagens: imagensUrls,
      tags: tags,
      coresUsadas: coresSelecionadas,
    });

    // reset form
    setEditingId(null);
    setForm({
      nome: "",
      descricao: "",
      ambiente: "COZINHA",
      capaUrl: "",
      imagensUrls: [],
      tags: [],
      tagInput: "",
      coresSelecionadas: [],
    });
    setCapaUrlInput("");
    setImagemUrlInput("");

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
      imagensUrls: [],
      tags: [],
      tagInput: "",
      coresSelecionadas: [],
    });
    setCapaUrlInput("");
    setImagemUrlInput("");

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
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Editar Projeto" : "Criar Projeto"}
          </h2>

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

          {/* INPUT DE URL DA CAPA */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">URL da Capa</label>
            
            <div className="flex gap-2">
              <input
                type="url"
                className="flex-1 p-2 rounded bg-black/30"
                placeholder="https://exemplo.com/imagem.jpg"
                value={capaUrlInput}
                onChange={(e) => setCapaUrlInput(e.target.value)}
              />
              <button
                onClick={handleAddCapaUrl}
                className="px-4 bg-blue-600 hover:bg-blue-700 rounded hover:cursor-pointer"
              >
                Adicionar
              </button>
            </div>

            {form.capaUrl && (
              <div className="mt-3 relative inline-block">
                <img
                  src={form.capaUrl}
                  className="w-40 h-40 object-cover rounded border border-white/20"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderImg;
                  }}
                />
                <button
                  onClick={() => setForm((f) => ({ ...f, capaUrl: "" }))}
                  className="absolute top-1 right-1 bg-red-600 rounded-full px-2 text-xs hover:cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* INPUT DE URLS DAS IMAGENS EXTRAS */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">URLs das Imagens Extras</label>
            
            <div className="flex gap-2">
              <input
                type="url"
                className="flex-1 p-2 rounded bg-black/30"
                placeholder="https://exemplo.com/imagem.jpg"
                value={imagemUrlInput}
                onChange={(e) => setImagemUrlInput(e.target.value)}
              />
              <button
                onClick={handleAddImagemUrl}
                className="px-4 bg-blue-600 hover:bg-blue-700 rounded hover:cursor-pointer"
              >
                Adicionar
              </button>
            </div>

            {/* Previews das imagens */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {form.imagensUrls.map((url, index) => (
                <div key={`${url}-${index}`} className="relative">
                  <img
                    src={url}
                    className="h-20 w-full object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = placeholderImg;
                    }}
                  />
                  <button
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        imagensUrls: f.imagensUrls.filter((_, i) => i !== index),
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
              onError={(e) => {
                (e.target as HTMLImageElement).src = placeholderImg;
              }}
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
              {[previewProjeto.capa, ...previewProjeto.imagens.map((i) => i.url)].map((src, index) => (
                <img
                  key={`${src}-${index}`}
                  src={src}
                  className="w-20 h-16 object-cover rounded border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderImg;
                  }}
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
              <img 
                src={p.capa} 
                className="w-full h-32 object-cover rounded mb-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderImg;
                }}
              />

              <p className="font-bold">{p.nome}</p>
              <p className="text-xs text-white/60">{p.ambiente}</p>

              <button
                onClick={() => {
                  setEditingId(p.id);
                  setForm({
                    nome: p.nome,
                    descricao: p.descricao,
                    ambiente: p.ambiente,
                    capaUrl: p.capa,
                    imagensUrls: p.imagens?.map((i: any) => i.url) || [],
                    tags: p.tags?.map((t: any) => t.tag) || [],
                    tagInput: "",
                    coresSelecionadas: p.coresUsadas?.map((c: any) => c.corId) || [],
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