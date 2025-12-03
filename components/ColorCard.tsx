// src/components/ColorCard.tsx
import React from "react";
import type { Cor } from "../src/service/catalogo";

type Props = { cor: Cor; onClick?: (c: Cor) => void };

const ColorCard: React.FC<Props> = ({ cor, onClick }) => (
  <button
    onClick={() => onClick?.(cor)}
    className="text-left rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition"
  >
    <div className="h-32 w-full bg-black">
      <img
        src={cor.imagem}
        alt={`Amostra ${cor.nome}`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0.2";
        }}
      />
    </div>

    <div className="p-3 text-white/90">
      <p className="font-medium">{cor.nome}</p>
      <p className="text-xs text-white/60">
        {cor.colecao} • {cor.linha}
      </p>
    </div>
  </button>
);

export default ColorCard;
