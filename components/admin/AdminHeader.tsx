import { useAdminAuth } from "../../src/context/AdminAuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function AdminHeader() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <header className="w-full h-16 bg-[#0d0f1d] border-b border-white/10 flex items-center justify-between px-6">
      <h2 className="text-white font-semibold">Administração</h2>

      <div className="flex items-center gap-4">

        {/* Botão Voltar para o site */}
        <Link
          to="/"
          className="text-white/70 hover:text-white transition"
        >
          Voltar para o site
        </Link>

        {/* Botão Sair */}
        <button
          onClick={handleLogout}
          className="text-white/70 hover:text-white transition hover:cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
