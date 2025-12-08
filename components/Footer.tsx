// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0b0b0b]">
      <div className="mx-auto w-full max-w-[80rem] px-6 py-12 grid gap-10 md:grid-cols-4 text-white/80 text-sm">

        {/* COLUNA 1 */}
        <div>
          <h4 className="text-white font-semibold mb-4">Maso Móveis Planejados</h4>
          <p className="text-white/60">
            Há mais de 30 anos no mercado, transformando ambientes com projetos
            sob medida, materiais de qualidade e execução impecável.
          </p>

          <p className="text-white/60 mt-3">
            Garantia de 6 meses em nossos produtos.
          </p>

          <p className="text-white/60 mt-1">
            Atendimento e assistência premium.
          </p>
        </div>

        {/* COLUNA 2 */}
        <div>
          <h4 className="text-white font-semibold mb-4">Empresa</h4>
          <p className="text-white/60">CNPJ: 00.000.000/0000-00</p>
          <p className="text-white/60 mt-2">Planaltina do Paraná – PR</p>
          <p className="text-white/60">
            Atendemos toda a região com equipe especializada.
          </p>
        </div>

        {/* COLUNA 3 */}
        <div>
          <h4 className="text-white font-semibold mb-4">Atendimento</h4>
          <p className="text-white/60">Seg – Sex: 08h às 18h</p>
          <p className="text-white/60">Sáb: 08h às 12h</p>

          <p className="text-white/60 mt-3">
            WhatsApp: (XX) XXXX-XXXX
          </p>
          <p className="text-white/60">
            Instagram: @masomoveis
          </p>
        </div>

        {/* COLUNA 4 */}
        <div>
          <h4 className="text-white font-semibold mb-4">Solicitar Orçamento</h4>
          <p className="text-white/60 mb-4">
            Receba um projeto personalizado criado por especialistas.
          </p>
          <a
            href="https://wa.me/55XXXXXXXXXX"
            className="inline-block bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded text-white text-sm"
          >
            Pedir orçamento
          </a>
        </div>

      </div>

      <div className="border-t border-white/10 py-4 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} Maso Móveis Planejados. Todos os direitos reservados.
      </div>
    </footer>
  );
}
