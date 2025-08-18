import React from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Mariana S.",
    city: "Paranavaí",
    text: "Minha cozinha ficou exatamente como eu queria. Acabamento impecável e tudo entregue no prazo.",
    stars: 5,
  },
  {
    name: "Rafael T.",
    city: "Planaltina do Paraná",
    text: "Atendimento top e projeto super funcional. O closet ficou lindo e bem iluminado.",
    stars: 5,
  },
  {
    name: "Ana C.",
    city: "Maringá",
    text: "Ótimo custo-benefício. Materiais de qualidade e montagem muito caprichada.",
    stars: 5,
  },
];

const StarRow: React.FC<{ n: number }> = ({ n }) => (
  <div className="flex gap-1 text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < n ? "fill-current" : "fill-white/20"}`}>
        <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 5.9-5.4-2.8-5.4 2.8 1-5.9L1.3 7.9l6-.9L10 1.5z"/>
      </svg>
    ))}
  </div>
);

const Reviews: React.FC = () => (
  <section className="mt-16">
    <div className="mx-auto w-full max-w-[80rem] px-4">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">O que nossos clientes dizem</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {reviews.map((r, idx) => (
          <motion.div
            key={r.name}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-white/5 p-5 text-white"
          >
            <StarRow n={r.stars} />
            <p className="mt-3 text-white/80">{r.text}</p>
            <div className="mt-4 text-sm text-white/60">
              <span className="font-medium text-white">{r.name}</span> • {r.city}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
