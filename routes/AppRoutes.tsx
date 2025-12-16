// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import CatalogoCores from "../pages/CatalogoCores";
import Contato from "../pages/Contato";
import Projetos from "../pages/Projetos";

// ADMIN
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../pages/admin/AdminLayout";
import DashboardHome from "../pages/admin/DashboardHome";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminColors from "../pages/admin/AdminColors";
import AdminCRUD from "../pages/admin/AdminCRUD";
import AdminMeCRUD from "../pages/admin/AdminMeCRUD";
import AdminHomeSettings from "../pages/admin/AdminHomeSettings";

import RequireAdmin from "../components/admin/RequireAdmin";

const AppRoutes: React.FC = () => (
  <Routes>
    {/* PUBLIC */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/projetos" element={<Projetos />} />
    <Route path="/cores" element={<CatalogoCores />} />
    <Route path="/contato" element={<Contato />} />

    {/* ADMIN LOGIN */}
    <Route path="/admin/login" element={<AdminLogin />} />

    {/* PROTECTED ADMIN AREA */}
    <Route
      path="/admin"
      element={
        <RequireAdmin>
          <AdminLayout />
        </RequireAdmin>
      }
    >
      
      <Route index element={<DashboardHome />} />
      <Route path="projetos" element={<AdminProjects />} />
      <Route path="cores" element={<AdminColors />} />
      <Route path="home" element={<AdminHomeSettings />} />
      <Route path="administradores" element={<AdminCRUD />} />
      <Route path="me" element={<AdminMeCRUD />} />
    </Route>

    {/* fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
