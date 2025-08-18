// components/CTAButton.tsx
import React from "react";

type Props = { text?: string; phone?: string; };
const CTAButton: React.FC<Props> = ({ text = "Pedir orçamento", phone = "5544991684130" }) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent("Olá! Quero orçamento de móveis planejados.")}`;
  return (
    <a
  href={href}
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center justify-center px-6 py-3
             bg-brand-accent hover:bg-brand-accent-hover
             text-white font-semibold rounded-xl
             transition focus:outline-none focus:ring-2 focus:ring-white/30 active:opacity-90"
>
  {text}
</a>


  );
};
export default CTAButton;
