//src/components/admin/RequireAdmin.tsx
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../src/context/AdminAuthContext";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useAdminAuth();
  if (user !== null) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
