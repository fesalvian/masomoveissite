import React from "react";
import type { Projeto } from "../src/types";

type Props = {
  project: Projeto;
  onClick?: (p: Projeto) => void;
};

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  return (
    <button
      onClick={() => onClick?.(project)}
      className="group text-left rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={project.capa}
          alt={project.nome}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold">{project.nome}</h3>
        <p className="text-white/60 text-sm mt-1">
          {project.ambiente}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t.id}
                className="text-xs px-2 py-1 rounded bg-white/10 text-white/70 border border-white/10"
              >
                {t.tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

export default ProjectCard;
