import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import CatalogoCores from "../pages/CatalogoCores";
import Contato from "../pages/Contato";
import Projetos from "../pages/Projetos";

// ADMIN PAGES
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../pages/admin/AdminLayout";
import DashboardHome from "../pages/admin/DashboardHome";
import AdminProjects from "../pages/admin/ProjectsList";
import AdminColors from "../pages/admin/ColorsList";
import AdminMessages from "../pages/admin/MessagesList";
import AdminHomeSettings from "../pages/admin/HomeSettings";


const AppRoutes: React.FC = () => (
  <Routes>
    {/* ----- PUBLIC ----- */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/projetos" element={<Projetos />} />
    <Route path="/cores" element={<CatalogoCores />} />
    <Route path="/contato" element={<Contato />} />

    {/* ----- ADMIN LOGIN ----- */}
    <Route path="/admin/login" element={<AdminLogin />} />

    {/* ----- ADMIN PROTECTED AREA ----- */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<DashboardHome />} />
      <Route path="projetos" element={<AdminProjects />} />
      <Route path="cores" element={<AdminColors />} />
      <Route path="home" element={<AdminHomeSettings />} />
      <Route path="mensagens" element={<AdminMessages />} />
    </Route>

    {/* fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
