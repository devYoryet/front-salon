import React, { useEffect } from "react";
import Navbar from "../../../admin seller/components/navbar/Navbar";
import SalonRoutes from "../../../routes/SalonRoutes";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalonByOwner } from "../../../Redux/Salon/action";
import SalonDrawerList from "../../components/SideBar/DrawerList";
import { getSalonReport } from "../../../Redux/Booking/action";

const SalonDashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth); // ✅ Específico

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchSalonByOwner(jwt));
      dispatch(getSalonReport(jwt));
    }
  }, [dispatch]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !auth.user) {
      window.location.href = "/login";
    }
  }, [auth.user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar DrawerList={SalonDrawerList} />
      <section className="lg:flex lg:h-[90vh]">
        {/* Sidebar siempre visible en desktop */}
        <div className="hidden lg:block h-full bg-white shadow-sm">
          <SalonDrawerList />
        </div>
        
        {/* Contenido principal */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <SalonRoutes />
        </div>
      </section>
    </div>
  );
};

export default SalonDashboard;