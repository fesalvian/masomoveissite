import React, { useState, useEffect } from "react";
import { adminProjectsAPI } from "../../src/service/adminProjects";
import { adminColorsAPI } from "../../src/service/adminColors";
import { uploadImage, fileToBase64 } from "../../src/service/upload";
import { useAdminAuth } from "../../src/context/AdminAuthContext";

export default function AdminProjects() {
  const { token } = useAdminAuth();

  const [projects, setProjects] = useState<any[]>([]);
  const [cores, setCores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    ambiente: "COZINHA",
    capaUrl: "",
    capaFile: null as File | null,
    imagensFiles: [] as File[],
    imagensUrls: [] as string[],
    tags: [] as string[],
    tagInput: "",
    coresSelecionadas: [] as number[],
  });

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

  // Upload capa
  async function handleUploadCapa() {
    if (!form.capaFile) return alert("Selecione a capa.");
    const base64 = await fileToBase64(form.capaFile);
    const url = await uploadImage(base64, token!);
    setForm((f) => ({ ...f, capaUrl: url }));
  }

  // Upload múltiplas imagens
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

  // Criar projeto
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
      imagens: imagensUrls.map((url) => ({ url })),
      tags: tags.map((tag) => ({ tag })),
      coresUsadas: coresSelecionadas.map((id) => ({ corId: id })),
    });

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

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Projetos</h1>

      {/* FORM */}
      <div className="bg-white/10 border border-white/20 rounded p-6 max-w-3xl mb-12">
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm((f) => ({ ...f, capaFile: e.target.files?.[0] ?? null }))}
          />
          <button
            onClick={handleUploadCapa}
            className="px-4 py-2 bg-brand-accent text-black mt-2 rounded"
          >
            Enviar capa
          </button>

          {form.capaUrl && (
            <img src={form.capaUrl} className="w-40 rounded mt-3 border border-white/20" />
          )}
        </div>

        {/* UPLOAD MULTIPLAS IMAGENS */}
        <div className="mb-4">
          <label className="font-semibold block mb-1">Imagens extras</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                imagensFiles: Array.from(e.target.files ?? []),
              }))
            }
          />

          <button
            onClick={handleUploadImagens}
            className="px-4 py-2 bg-brand-accent text-black mt-2 rounded"
          >
            Enviar imagens
          </button>

          {/* Preview */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {form.imagensUrls.map((url) => (
              <img key={url} src={url} className="h-20 w-full object-cover rounded" />
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
              className="px-4 bg-blue-500 rounded"
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

          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-auto p-2 border border-white/10 rounded">
            {cores.map((c) => (
              <label key={c.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.coresSelecionadas.includes(c.id)}
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
          onClick={handleCreate}
          className="w-full py-2 bg-green-500 rounded text-black font-semibold"
        >
          Criar Projeto
        </button>
      </div>

      {/* LISTA */}
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
                onClick={() => handleDelete(p.id)}
                className="mt-3 py-1 bg-red-500/80 hover:bg-red-500 rounded text-black font-semibold w-full"
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
