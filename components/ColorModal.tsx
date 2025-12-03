// src/components/ColorModal.tsx
import React, { useEffect } from "react";
import type { Cor } from "../src/service/catalogo";

type Props = { cor: Cor; onClose: () => void };

const ColorModal: React.FC<Props> = ({ cor, onClose }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0f1220] border border-white/10 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h3 className="text-white font-semibold">
            {cor.nome}
            <span className="text-white/50 text-sm"> ({cor.colecao})</span>
          </h3>
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl">
            ×
          </button>
        </div>

        <div className="w-full max-h-[70vh] bg-black flex justify-center items-center">
          <img
            src={cor.imagem}
            alt={cor.nome}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="px-4 py-3 text-white/60 text-sm">
          Linha: {cor.linha} • Tipo: {cor.tipo}
        </div>
      </div>
    </div>
  );
};

export default ColorModal;
