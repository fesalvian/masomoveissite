export default function AdminHeader() {
  return (
    <header className="w-full h-16 bg-[#0d0f1d] border-b border-white/10 flex items-center justify-between px-6">
      <h2 className="text-white font-semibold">Administração</h2>

      <button className="text-white/70 hover:text-white">Sair</button>
    </header>
  );
}
