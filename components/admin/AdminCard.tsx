import React from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function AdminCard({ title, children, className = "" }: Props) {
  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-xl p-5 text-white ${className}`}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-3 text-white">{title}</h3>
      )}
      {children}
    </div>
  );
}
