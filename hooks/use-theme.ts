import { useContext } from "react";
import { ThemeContext } from "@/components/theme-provider";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme;
}

export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
