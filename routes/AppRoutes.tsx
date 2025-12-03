//src/masomoveissite/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CatalogoCores from "../pages/CatalogoCores";
import Contato from "../pages/Contato";
import Projetos from "../pages/Projetos";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/projetos" element={<Projetos />} />
    <Route path="/cores" element={<CatalogoCores />} />
    <Route path="/contato" element={<Contato />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
