// src/Auth/Auth.jsx
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import RegistrationForm from "./Register";
import LoginForm from "./Login";

const Auth = () => {
  const location = useLocation();
  // Corregir el selector específicamente
  const auth = useSelector((store) => store.auth);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (auth.success || auth.error) setOpenSnackBar(true);
  }, [auth.success, auth.error]);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <div className="flex justify-center items-center h-[95vh]">
      <div className="shadow-xl p-5">
        {location.pathname === "/register" ? (
          <RegistrationForm />
        ) : (
          <LoginForm />
        )}
        
        <Snackbar
          sx={{ zIndex: 50 }}
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity={auth.error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {auth.success ||
              auth.error?.response?.data?.message ||
              auth.error?.message ||
              auth.error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Auth;