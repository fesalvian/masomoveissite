import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../src/assets/logo.png";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkBase = "px-3 py-2 rounded-md text-sm font-medium";
  const isActive = (p: string) =>
    pathname === p ? "bg-brand-accent text-white" : "text-white/90 hover:text-white hover:bg-white/10";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-primary/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto w-full max-w-[80rem] px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
  {/* LOGO */}
  <img
  src={logo}
  alt="Maso Móveis"
  className="block h-22 w-22 shrink-0 object-contain"
/>

  {/* Texto (encurta no mobile pra não esmagar a logo) */}
  <span className="text-white font-semibold tracking-wide truncate max-w-[14ch] sm:max-w-none">
    MASO MÓVEIS PLANEJADOS
  </span>
</Link>


        <nav className="hidden md:flex gap-2">
  <Link to="/" className={`${linkBase} ${isActive("/")}`}>Início</Link>
  <Link to="/projetos" className={`${linkBase} ${isActive("/projetos")}`}>Projetos</Link>
  <Link to="/cores" className={`${linkBase} ${isActive("/cores")}`}>Cores</Link>
  <Link to="/contato" className={`${linkBase} ${isActive("/contato")}`}>Contato</Link>
</nav>



        <button
          className="md:hidden w-9 h-9 grid place-items-center rounded bg-white/10 text-white"
          onClick={() => setOpen(v => !v)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-brand-primary/95 border-t border-white/10">
          <div className="mx-auto w-full max-w-[80rem] px-4 py-3 flex flex-col gap-2">
            <Link onClick={() => setOpen(false)} to="/" className={`${linkBase} ${isActive("/")}`}>Início</Link>
            <Link to="/projetos" className={`${linkBase} ${isActive("/projetos")}`}>Projetos</Link>
            <Link onClick={() => setOpen(false)} to="/cores" className={`${linkBase} ${isActive("/cores")}`}>Cores</Link>
            <Link onClick={() => setOpen(false)} to="/contato" className={`${linkBase} ${isActive("/contato")}`}>Contato</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
