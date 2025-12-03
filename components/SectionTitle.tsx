//src/components/SectionTitle.tsx
import React from "react";

const SectionTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">{children}</h2>
);

export default SectionTitle;
