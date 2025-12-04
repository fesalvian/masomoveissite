import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const linkBase =
    "block px-4 py-2 rounded text-white/80 hover:bg-white/10 hover:text-white transition";

  const activeBase =
    "block px-4 py-2 rounded bg-brand-accent text-black font-semibold";

  return (
    <aside className="w-64 bg-[#0d0f1d] border-r border-white/10 h-screen p-4">
      <h1 className="text-white font-bold text-xl mb-6">Painel Admin</h1>

      <nav className="flex flex-col gap-1">
        <NavLink to="/admin" className={({ isActive }) => (isActive ? activeBase : linkBase)}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/projetos" className={({ isActive }) => (isActive ? activeBase : linkBase)}>
          Projetos
        </NavLink>

        <NavLink to="/admin/cores" className={({ isActive }) => (isActive ? activeBase : linkBase)}>
          Cores
        </NavLink>

        <NavLink to="/admin/home" className={({ isActive }) => (isActive ? activeBase : linkBase)}>
          Home (Hero + Carrossel)
        </NavLink>

        <NavLink to="/admin/mensagens" className={({ isActive }) => (isActive ? activeBase : linkBase)}>
          Mensagens
        </NavLink>
      </nav>
    </aside>
  );
}
