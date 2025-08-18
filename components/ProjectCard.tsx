import React from "react";
import type { Project } from "../src/types";

type Props = {
  project: Project;
  onClick?: (p: Project) => void;
};

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  return (
    <button
      onClick={() => onClick?.(project)}
      className="group text-left rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition focus:outline-none"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full grid place-content-center text-white/60 bg-gradient-to-br from-brand-primary to-black">
            Sem imagem
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold">{project.title}</h3>
        <p className="text-white/60 text-sm mt-1">
          {project.ambiente} {project.cidade ? `• ${project.cidade}` : ""} {project.ano ? `• ${project.ano}` : ""}
        </p>
        {project.tags?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.slice(0,3).map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded bg-white/10 text-white/70 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
};

export default ProjectCard;
