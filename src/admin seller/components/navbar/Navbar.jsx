import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Drawer, IconButton, Avatar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NotificationsActive, AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsBySalon } from "../../../Redux/Notifications/action";
import useNotificationWebsoket from "../../../util/useNotificationWebsoket";

const Navbar = ({ DrawerList }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { notification, salon, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (salon.salon?.id) {
      dispatch(
        fetchNotificationsBySalon({
          salonId: salon.salon.id,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [salon.salon?.id, dispatch]);

  // Activar WebSocket para notificaciones del salón
  const { connected } = useNotificationWebsoket(salon.salon?.id, "salon");

  const handleProfileClick = () => {
    navigate("/salon-dashboard/account");
  };

  return (
    <div className="h-[70px] flex items-center justify-between px-6 border-b bg-white shadow-sm">
      {/* Lado izquierdo */}
      <div className="flex items-center gap-4">
        <IconButton 
          onClick={toggleDrawer(true)} 
          color="primary"
          className="lg:hidden"
        >
          <MenuIcon />
        </IconButton>

        <Box className="flex items-center gap-3">
          <Typography variant="h5" className="font-bold text-primary hidden lg:block">
            {salon.salon?.name || "Mi Salón"}
          </Typography>
          <Typography variant="h6" className="font-bold text-primary lg:hidden">
            Panel
          </Typography>
        </Box>
      </div>

      {/* Centro - Indicador de conexión WebSocket */}
      {connected && (
        <Box className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <Typography variant="caption" className="text-green-700 font-medium">
            Conectado en tiempo real
          </Typography>
        </Box>
      )}

      {/* Lado derecho */}
      <div className="flex items-center gap-3">
        {/* Notificaciones */}
        <IconButton 
          onClick={() => navigate("/salon-dashboard/notifications")}
          className="relative"
        >
          <Badge
            badgeContent={notification.unreadCount || 0}
            color="error"
            max={99}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <NotificationsActive color="primary" />
          </Badge>
        </IconButton>

        {/* Perfil del usuario */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <Typography variant="body2" className="font-semibold text-gray-800">
              {auth.user?.fullName || "Usuario"}
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              Propietario
            </Typography>
          </div>
          
          <IconButton onClick={handleProfileClick}>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main',
                width: 40, 
                height: 40,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              {auth.user?.fullName?.[0]?.toUpperCase() || 'U'}
            </Avatar>
          </IconButton>
        </div>
      </div>

      {/* Drawer para móvil */}
      <Drawer 
        open={open} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { 
            width: 280,
            borderRadius: '0 16px 16px 0',
          }
        }}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;