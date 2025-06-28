// src/App.js
import { ThemeProvider } from "@mui/material";
import darkGreenTheme from "./Theme/darkGreenTheme"; // Cambiar al nuevo tema
import { Route, Routes, useNavigate } from "react-router-dom";
import SalonDashboard from "./salon/pages/SellerDashboard/SalonDashboard";
import Auth from "./Auth/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Redux/Auth/action";
import BecomePartner from "./salon/pages/Become Partner/BecomePartnerForm";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AdminDashboard from "./Admin/pages/Dashboard/Dashboard";

function App() {
  // Corregir el selector para evitar warnings
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = auth.jwt || localStorage.getItem("jwt");
    if (token) {
      dispatch(getUser(token));
    }
  }, [auth.jwt, dispatch]);

  useEffect(() => {
    if (auth.user?.role === "SALON_OWNER") {
      navigate("/salon-dashboard");
    }
  }, [auth.user?.role, navigate]);

  return (
    <ThemeProvider theme={darkGreenTheme}>
      <div className="relative">
        <Routes>
          <Route path="/salon-dashboard/*" element={<SalonDashboard />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<CustomerRoutes />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;