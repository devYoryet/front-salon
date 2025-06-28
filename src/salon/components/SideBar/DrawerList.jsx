import * as React from "react";
import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
import { AccountBox, NotificationsNoneOutlined } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const menu = [
  {
    name: "Panel Principal",
    path: "/salon-dashboard",
    icon: <DashboardIcon className="text-primary-color" />,
    activeIcon: <DashboardIcon className="text-white" />,
  },
  {
    name: "Reservas",
    path: "/salon-dashboard/bookings",
    icon: <ShoppingBagIcon className="text-primary-color" />,
    activeIcon: <ShoppingBagIcon className="text-white" />,
  },
  {
    name: "Servicios",
    path: "/salon-dashboard/services",
    icon: <InventoryIcon className="text-primary-color" />,
    activeIcon: <InventoryIcon className="text-white" />,
  },
  {
    name: "Agregar Servicio",
    path: "/salon-dashboard/add-services",
    icon: <AddIcon className="text-primary-color" />,
    activeIcon: <AddIcon className="text-white" />,
  },
  {
    name: "Categorías",
    path: "/salon-dashboard/category",
    icon: <CategoryIcon className="text-primary-color" />,
    activeIcon: <CategoryIcon className="text-white" />,
  },
  {
    name: "Clientes",
    path: "/salon-dashboard/customers",
    icon: <PeopleIcon className="text-primary-color" />,
    activeIcon: <PeopleIcon className="text-white" />,
  },
  {
    name: "Reportes",
    path: "/salon-dashboard/reports",
    icon: <AnalyticsIcon className="text-primary-color" />,
    activeIcon: <AnalyticsIcon className="text-white" />,
  },
  {
    name: "Pagos",
    path: "/salon-dashboard/payment",
    icon: <AccountBalanceWalletIcon className="text-primary-color" />,
    activeIcon: <AccountBalanceWalletIcon className="text-white" />,
  },
  {
    name: "Transacciones",
    path: "/salon-dashboard/transaction",
    icon: <ReceiptIcon className="text-primary-color" />,
    activeIcon: <ReceiptIcon className="text-white" />,
  },
  {
    name: "Notificaciones",
    path: "/salon-dashboard/notifications",
    icon: <NotificationsNoneOutlined className="text-primary-color" />,
    activeIcon: <NotificationsNoneOutlined className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Configuración",
    path: "/salon-dashboard/settings",
    icon: <SettingsIcon className="text-primary-color" />,
    activeIcon: <SettingsIcon className="text-white" />,
  },
  {
    name: "Mi Perfil",
    path: "/salon-dashboard/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Cerrar Sesión",
    path: "/",
    icon: <LogoutIcon className="text-primary-color" />,
    activeIcon: <LogoutIcon className="text-white" />,
  },
];

const SalonDrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SalonDrawerList;