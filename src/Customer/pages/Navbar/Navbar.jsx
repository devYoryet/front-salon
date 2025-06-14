import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Auth/action";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import useNotificationWebsoket from "../../../util/useNotificationWebsoket";
import { fetchNotificationsByUser } from "../../../Redux/Notifications/action";
import { useTheme } from "@emotion/react";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, notification } = useSelector((store) => store);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => () => {
    if (path === "/logout") {
      dispatch(logout());
      navigate("/");
      handleClose();
      return;
    }
    navigate(path);
    handleClose();
  };

  useEffect(() => {
    if (auth.user?.id) {
      dispatch(
        fetchNotificationsByUser({
          userId: auth.user.id,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [auth.user]);

  useNotificationWebsoket(auth.user?.id, "user");

  return (
    <div className="z-50 px-6 flex items-center justify-between py-2 fixed top-0 left-0 right-0 bg-white shadow-md">
      <div className="flex items-center gap-10">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer font-extrabold text-2xl tracking-tight text-gray-800"
        >
          <span className="text-primary-color">Urban</span>Glow
        </h1>

        <div className="lg:flex items-center gap-5 hidden">
          <h1
            className="cursor-pointer hover:text-primary-color"
            onClick={() => navigate("/")}
          >
            Inicio
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <Button onClick={() => navigate("/become-partner")} variant="outlined">
          Hazte Socio
        </Button>

        <IconButton onClick={() => navigate("/notifications")}>
          <Badge badgeContent={notification.unreadCount} color="secondary">
            <NotificationsActiveIcon color="primary" />
          </Badge>
        </IconButton>

        {auth.user?.id ? (
          <div className="flex gap-1 items-center">
            <h1 className="text-lg font-semibold hidden lg:block">
              {auth.user?.fullName}
            </h1>

            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                {auth.user?.fullName?.[0]?.toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleMenuClick("/bookings")}>
                Mis Reservas
              </MenuItem>
              {auth.user?.role === "SALON_OWNER" && (
                <MenuItem onClick={handleMenuClick("/salon-dashboard")}>
                  Panel de Salón
                </MenuItem>
              )}
              <MenuItem onClick={handleMenuClick("/logout")}>Cerrar Sesión</MenuItem>
            </Menu>
          </div>
        ) : (
          <IconButton onClick={() => navigate("/login")}>
            <AccountCircleIcon
              sx={{ fontSize: "45px", color: theme.palette.primary.main }}
            />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
