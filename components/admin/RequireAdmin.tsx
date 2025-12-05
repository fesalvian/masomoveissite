//src/components/admin/RequireAdmin.tsx
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../src/context/AdminAuthContext";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, token } = useAdminAuth();

  if (!token || !user) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
