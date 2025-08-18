import React, { useEffect } from "react";
import type { Project } from "../src/types";
import { cores as catalogo } from "../src/data/cores";

type Props = { project: Project; onClose: () => void; };

const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  // ESC fecha
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const coresUsadas = project.cores
    .map(c => catalogo.find(x => x.code === c))
    .filter(Boolean);

  return (
    <div
      role="dialog" aria-modal="true"
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#0f1220] border border-white/10 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h3 className="text-white font-semibold">{project.title}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl">×</button>
        </div>

        {/* imagem principal */}
        <div className="aspect-video w-full bg-black">
          {project.images?.[0] ? (
            <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-content-center text-white/60">Sem imagem</div>
          )}
        </div>

        <div className="p-4 text-white/80">
          <p>{project.descricao ?? "Projeto com acabamento premium."}</p>

          <div className="mt-4 text-sm text-white/60">
            {project.ambiente} {project.cidade ? `• ${project.cidade}` : ""} {project.ano ? `• ${project.ano}` : ""}
          </div>

          {/* cores */}
          {coresUsadas.length ? (
            <div className="mt-4">
              <p className="text-white font-medium mb-2">Cores usadas</p>
              <div className="flex flex-wrap gap-3">
                {coresUsadas.map((c) => (
                  <div key={c!.code} className="flex items-center gap-2">
                    <span
                      className="inline-block w-5 h-5 rounded border border-white/20"
                      style={{ backgroundColor: c!.hex }}
                      aria-label={`Cor ${c!.name}`}
                    />
                    <span className="text-white/80 text-sm">{c!.name} <span className="text-white/50">({c!.code})</span></span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* thumbs */}
          {project.images && project.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {project.images.slice(1).map((src, i) => (
                <img key={i} src={src} alt={`${project.title} ${i+2}`} className="w-28 h-20 object-cover rounded border border-white/10" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
