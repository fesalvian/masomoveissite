// src/App.tsx
import { useLocation } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { AdminAuthProvider } from "../src/context/AdminAuthContext";

const App = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <AdminAuthProvider>
      <AppRoutes />

      {/* WhatsApp apenas no site público */}
      {!isAdmin && <WhatsAppFloat size={80} offsetX={40} offsetY={56} />}
    </AdminAuthProvider>
  );
};

export default App;
