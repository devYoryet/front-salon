import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

import SellerAccountForm from "./SalonForm";

const BecomePartner = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      {/* FORMULARIO */}
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md flex flex-col items-center justify-center">
        <SellerAccountForm />
      </section>

      {/* BANNER LATERAL */}
      <section className="hidden md:col-span-1 md:flex lg:col-span-2 justify-center items-center">
        <div className="lg:w-[70%] px-5 space-y-10 text-center">
          {/* LOGO MINIMALISTA */}
          <div className="text-3xl font-extrabold">
            <span className="text-primary-color">Urban</span>
            <span className="text-black">Glow</span>
          </div>

          {/* MENSAJE DE BIENVENIDA */}
          <div className="rounded-md space-y-2 font-bold">
            <p className="text-2xl">Únete a la revolución del bienestar</p>
            <p className="text-lg text-teal-500">Impulsa tus reservas hoy mismo</p>
          </div>

          {/* IMAGEN DE APOYO */}
          <img src="/seller.jpg" alt="Socio UrbanGlow" className="rounded-md" />
        </div>
      </section>

      {/* SNACKBAR DE MENSAJE */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={true ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          ¡Código enviado a tu correo electrónico!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BecomePartner;
