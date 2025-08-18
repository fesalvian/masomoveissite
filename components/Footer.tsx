import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto w-full max-w-[80rem] px-4 py-8 text-white/70 text-sm grid gap-3 md:flex md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Maso Móveis Planejados.</p>
        <p>Planaltina do Paraná • Atendemos a região</p>
      </div>
    </footer>
  );
};

export default Footer;
