import React from "react";
import { motion } from "framer-motion";

type Props = {
  phone?: string;
  message?: string;
  size?: number;      // diâmetro do botão
  offsetX?: number;   // distância da borda direita
  offsetY?: number;   // distância da borda inferior
  iconSrc?: string;   // caminho do PNG redondo
  pulse?: boolean;    // efeito pulsar
};

const WhatsAppFloat: React.FC<Props> = ({
  phone = "5544991684130",
  message = "Olá! Quero orçamento de móveis planejados.",
  size = 72,
  offsetX = 32,
  offsetY = 40,
  iconSrc = "/public/icon/whatsapp-round.png",
  pulse = true,
}) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chamar no WhatsApp"
      className="fixed grid place-items-center rounded-full leading-none select-none"
      style={{
        width: size,
        height: size,
        right: `calc(${offsetX}px + env(safe-area-inset-right, 0px))`,
        bottom: `calc(${offsetY}px + env(safe-area-inset-bottom, 0px))`,
        zIndex: 100,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* pulse atrás do ícone (cor do Whats) */}
      {pulse && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: "#25D366" }}
          initial={{ scale: 1, opacity: 0.35 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
        />
      )}

      {/* ícone PNG redondo */}
      <img
        src={iconSrc}
        alt="WhatsApp"
        width={Math.round(size * 0.88)}
        height={Math.round(size * 0.88)}
        className="relative object-contain pointer-events-none"
        draggable={false}
      />
    </motion.a>
  );
};

export default WhatsAppFloat;
