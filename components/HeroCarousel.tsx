import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Slide = { src: string; alt: string };

type Props = {
  images: Slide[];
  intervalMs?: number; // tempo entre trocas
  className?: string;
};

const HeroCarousel: React.FC<Props> = ({ images, intervalMs = 4000, className }) => {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const next = () => setI((p) => (p + 1) % safeImages.length);
  const prev = () => setI((p) => (p - 1 + safeImages.length) % safeImages.length);
  const goTo = (idx: number) => setI(idx % safeImages.length);

  // autoplay
  useEffect(() => {
    if (safeImages.length <= 1 || paused) return;
    timer.current = window.setInterval(next, intervalMs);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [i, paused, intervalMs, safeImages.length]);

  if (safeImages.length === 0) {
    return <div className={`relative aspect-video rounded-xl bg-white/10 border border-white/10 ${className ?? ""}`} />;
  }

  return (
    <div
      className={`relative aspect-video rounded-xl overflow-hidden border border-white/10 ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false}>
        <motion.img
          key={safeImages[i].src}
          src={safeImages[i].src}
          alt={safeImages[i].alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -60, opacity: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.25"; }}
        />
      </AnimatePresence>

      {/* overlay de legibilidade */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Controles */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60"
      >
        ‹
      </button>
      <button
        aria-label="Próximo"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
        {safeImages.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Ir para slide ${idx + 1}`}
            onClick={() => goTo(idx)}
            className={`h-2 w-2 rounded-full transition
              ${idx === i ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
