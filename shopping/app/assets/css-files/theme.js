import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F6F8",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  customColors: {
    primary: "#000000", 
    secondary:"#FFFFFF"
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#F9FEFE",
    },
    background: {
      default: "#000000",
      paper: "#293641",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A1A1A1",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  customColors: {
    primary: "#FFFFFF", 
    secondary: "#000000"
  },
});