// src/App.tsx
import { useLocation } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { AdminAuthProvider } from "../src/context/AdminAuthContext";

const App = () => {
  const { pathname } = useLocation();

  // se começar com /admin → esconde o WhatsApp
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <AdminAuthProvider>
        <AppRoutes />
      </AdminAuthProvider>

      {/* Só aparece no site público */}
      {!isAdmin && <WhatsAppFloat size={80} offsetX={40} offsetY={56} />}
    </>
  );
};

export default App;
