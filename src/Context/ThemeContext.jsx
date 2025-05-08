// src/context/ThemeContext.jsx
import { createContext, useState, useMemo } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");

  const toggleMode = () =>
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));

  const muiTheme = useMemo(() => {
    const isDark = mode === "dark";

    return createTheme({
      palette: {
        mode,
        background: {
          default: isDark ? "#343a40" : "#f2f2f2", // 全局背景色
          paper: isDark ? "#495057" : "#ffffff", // 卡片背景等
        },
        text: {
          primary: isDark ? "#ffffff" : "#000000",
          secondary: isDark ? "#aaaaaa" : "#444444",
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
