import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  {
    q: "O que é MDF e por que usar em móveis planejados?",
    a: "É um painel de fibras de madeira de densidade média. Superfície lisa, usinagem precisa e acabamento premium (BP, pintura PU, lâmina). Ótimo custo-benefício."
  },
  {
    q: "MDF resiste à umidade?",
    a: "Para áreas úmidas usamos MDF BP de boa procedência, fitas de borda coladas corretamente e ferragens resistentes. Para contato direto com água, indicamos tampos/áreas com materiais específicos."
  },
  {
    q: "Qual a diferença entre MDF e MDP?",
    a: "MDF aceita melhor usinagem, portas e curvas; MDP é ótimo para prateleiras e caixas. Em projetos combinamos os dois quando faz sentido técnico e de custo."
  },
  {
    q: "Como é o processo do projeto?",
    a: "Briefing → medição → 3D/projeto → aprovação de materiais e cores → produção → instalação. Acompanhamos cada etapa com você."
  },
  {
    q: "Prazos e garantia",
    a: "Prazos variam conforme o escopo (média 25–45 dias após aprovação). Garantia para defeitos de fabricação e instalação conforme contrato/fornecedor."
  },
  {
    q: "Como pedir orçamento?",
    a: "Clique em “Pedir orçamento”, envie medidas aproximadas e referências de estilo. Se preferir, agendamos visita para medir e detalhar."
  }
];

const Item: React.FC<QA> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  // mede o conteúdo para animar altura
  useEffect(() => {
    if (ref.current) setH(ref.current.scrollHeight);
  }, [open]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        className="w-full flex items-center justify-between text-left p-4 md:p-5 text-white"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium pr-6">{q}</span>
        <motion.span
          className="shrink-0 grid place-items-center w-6 h-6 rounded-full bg-white/10"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* chevron */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: h, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ overflow: "hidden" }}
            className="px-4 md:px-5"
          >
            <div ref={ref} className="pb-4 md:pb-5 text-white/80">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => (
  <section className="mt-16">
    <div className="mx-auto w-full max-w-[80rem] px-4">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">Perguntas frequentes</h2>
      <div className="space-y-3">
        {faqs.map((qa) => (
          <Item key={qa.q} {...qa} />
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
