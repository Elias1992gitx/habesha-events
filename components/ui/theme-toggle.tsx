"use client";

import { useTheme } from "@/hooks/use-theme";
import type { Theme } from "@/hooks/use-theme";
import { Sun, Moon, Monitor } from "lucide-react";

const CYCLE: Theme[] = ["dark", "light", "system"];

const ICONS: Record<Theme, React.ReactNode> = {
  dark: <Moon size={15} aria-hidden="true" />,
  light: <Sun size={15} aria-hidden="true" />,
  system: <Monitor size={15} aria-hidden="true" />,
};

const LABELS: Record<Theme, string> = {
  dark: "Switch to light mode",
  light: "Switch to system theme",
  system: "Switch to dark mode",
};

const TITLES: Record<Theme, string> = {
  dark: "Dark mode",
  light: "Light mode",
  system: "System theme",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function cycle() {
    const nextIndex = (CYCLE.indexOf(theme) + 1) % CYCLE.length;
    setTheme(CYCLE[nextIndex]);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      title={TITLES[theme]}
      aria-label={LABELS[theme]}
      className="flex size-8 items-center justify-center rounded-full border border-[#262320]/10 bg-transparent text-[#59534d] transition-all duration-200 hover:border-[#262320]/20 hover:bg-[#262320]/5 hover:text-[#262320] dark:border-white/10 dark:text-[#9b9490] dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-[#f0ece6]"
    >
      {ICONS[theme]}
    </button>
  );
}
