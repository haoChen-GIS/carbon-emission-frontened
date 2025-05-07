import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
