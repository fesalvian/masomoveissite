import React from "react";
import AppRoutes from "../routes/AppRoutes";
import WhatsAppFloat from "../components/WhatsAppFloat";


const App = () => (
  <>
	<AppRoutes />
	<WhatsAppFloat size={80} offsetX={40} offsetY={56} />


  </>
);

export default App;
