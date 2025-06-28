// src/Theme/darkGreenTheme.js
import { createTheme } from "@mui/material";

const darkGreenTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1B4332", // Verde oscuro principal
      light: "#2D5A3D",
      dark: "#0F2419",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#40916C", // Verde medio para elementos secundarios
      light: "#52B788",
      dark: "#2D6A4F",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#52B788",
      light: "#74C69D",
      dark: "#40916C",
    },
    info: {
      main: "#2D5A3D",
      light: "#40916C",
      dark: "#1B4332",
    },
    warning: {
      main: "#FFB700",
      light: "#FFC933",
      dark: "#CC9200",
    },
    error: {
      main: "#D32F2F",
      light: "#EF5350",
      dark: "#C62828",
    },
    background: {
      default: "#F8FDF9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1B4332",
      secondary: "#2D5A3D",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#1B4332",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#1B4332",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      color: "#1B4332",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      color: "#2D5A3D",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(27, 67, 50, 0.15)",
          },
        },
        contained: {
          background: "linear-gradient(45deg, #1B4332 30%, #2D5A3D 90%)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(45deg, #0F2419 30%, #1B4332 90%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(27, 67, 50, 0.08)",
          border: "1px solid rgba(27, 67, 50, 0.08)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#1B4332",
          color: "#FFFFFF",
          fontWeight: 600,
        },
      },
    },
  },
});

export default darkGreenTheme;