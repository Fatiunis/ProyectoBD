import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HistoriaPage from "./pages/HistoriaPage";
import FAQPage from "./pages/FAQPage";
import ContactoPage from "./pages/ContactoPage";
import LoginPage from "./pages/LoginPage";
import ClienteDashboard from "./pages/ClienteDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PlanBasicoPage from "./pages/PlanBasicoPage";
import PlanPremiumPage from "./pages/PlanPremiumPage";

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/historia" element={<HistoriaPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/plan-basico" element={<PlanBasicoPage />} />
      <Route path="/plan-premium" element={<PlanPremiumPage />} />

      {/* Rutas Protegidas */}
      <Route path="/cliente-dashboard" element={<ClienteDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
