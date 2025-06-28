import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Auth/action";
import { useDispatch } from "react-redux";

const DrawerList = ({ toggleDrawer, menu, menu2 }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear(); // Limpiar todo el localStorage
        navigate("/"); // Redirigir al home
        window.location.reload(); // Forzar recarga para limpiar estado
    };

    const handleClick = (item) => () => {
        console.log("Clicked item:", item.name, "Path:", item.path);
        
        if (item.name === "Logout" || item.name === "Cerrar Sesión") {
            handleLogout();
            return;
        }
        
        navigate(item.path);
        if (toggleDrawer) toggleDrawer(false)();
    };

    return (
        <div className="h-full bg-white">
            <div className="flex flex-col justify-between h-full w-[280px] border-r border-gray-200 py-4">
                {/* Logo/Header */}
                <div className="px-4 pb-4">
                    <h2 className="text-xl font-bold text-primary">
                        Panel de Control
                    </h2>
                </div>

                {/* Menú principal */}
                <div className="flex-1">
                    <div className="space-y-1 px-2">
                        {menu.map((item, index) => (
                            <div 
                                key={`${item.name}-${index}`}
                                onClick={handleClick(item)}
                                className="cursor-pointer group"
                            >
                                <div className={`
                                    ${item.path === location.pathname 
                                        ? "bg-primary text-white shadow-sm" 
                                        : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                                    } 
                                    flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-200
                                `}>
                                    <ListItemIcon 
                                        sx={{ 
                                            minWidth: 40,
                                            color: item.path === location.pathname ? 'white' : 'inherit'
                                        }}
                                    >
                                        {location.pathname === item.path ? item.activeIcon : item.icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={item.name} 
                                        sx={{ 
                                            '& .MuiListItemText-primary': {
                                                fontSize: '0.875rem',
                                                fontWeight: item.path === location.pathname ? 600 : 500
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menú secundario */}
                <div className="space-y-2 px-2">
                    <Divider sx={{ margin: '16px 0' }} />
                    <div className="space-y-1">
                        {menu2.map((item, index) => (
                            <div 
                                key={`${item.name}-${index}`}
                                onClick={handleClick(item)} 
                                className="cursor-pointer group"
                            >
                                <div className={`
                                    ${item.path === location.pathname 
                                        ? "bg-primary text-white shadow-sm" 
                                        : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                                    } 
                                    flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-200
                                    ${item.name === "Cerrar Sesión" || item.name === "Logout" 
                                        ? "hover:bg-red-50 hover:text-red-600" 
                                        : ""
                                    }
                                `}>
                                    <ListItemIcon 
                                        sx={{ 
                                            minWidth: 40,
                                            color: item.path === location.pathname ? 'white' : 'inherit'
                                        }}
                                    >
                                        {location.pathname === item.path ? item.activeIcon : item.icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={item.name} 
                                        sx={{ 
                                            '& .MuiListItemText-primary': {
                                                fontSize: '0.875rem',
                                                fontWeight: item.path === location.pathname ? 600 : 500
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerList;