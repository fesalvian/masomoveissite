import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../src/context/AdminAuthContext";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
