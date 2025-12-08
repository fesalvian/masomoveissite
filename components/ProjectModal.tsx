// components/ProjectModal.tsx
import React, { useEffect, useState } from "react";
import type { Projeto } from "../src/types";

type Props = { project: Projeto; onClose: () => void };

const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  const [img, setImg] = useState(project.capa);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#0f1220] border border-white/10 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h3 className="text-white font-semibold">{project.nome}</h3>
          <button className="text-white/70 hover:text-white text-xl" onClick={onClose}>
            ×
          </button>
        </div>

        {/* IMAGEM PRINCIPAL */}
        <div className="aspect-video w-full bg-black">
          <img src={img} alt={project.nome} className="w-full h-full object-cover" />
        </div>

        <div className="p-4 text-white/80 text-sm">
          <p>{project.descricao}</p>

          <p className="text-white/60 mt-3">{project.ambiente}</p>

          {/* CORES USADAS */}
          {project.coresUsadas.length > 0 && (
            <div className="mt-4">
              <p className="text-white font-medium mb-2">Cores usadas</p>

              <div className="flex flex-col gap-3">
                {project.coresUsadas.map((c) => (
                  <div className="flex items-center gap-3" key={c.id}>
                    <img
                      src={c.cor.imagem}
                      alt={c.cor.nome}
                      className="w-10 h-10 rounded object-cover border border-white/10"
                    />
                    <span className="text-white/80">{c.cor.nome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THUMBNAILS */}
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {/* Capa primeiro */}
            <img
              src={project.capa}
              className={`w-28 h-20 object-cover rounded border border-white/10 cursor-pointer ${
                img === project.capa ? "ring-2 ring-brand-accent" : ""
              }`}
              onClick={() => setImg(project.capa)}
            />

            {project.imagens.map((i) => (
              <img
                key={i.id}
                src={i.url}
                onClick={() => setImg(i.url)}
                className={`w-28 h-20 object-cover rounded border border-white/10 cursor-pointer ${
                  img === i.url ? "ring-2 ring-brand-accent" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
