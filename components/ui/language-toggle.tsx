"use client";

import { useLanguage } from "@/hooks/use-language";
import { Languages } from "lucide-react";

interface LanguageToggleProps {
  /**
   * Style variant:
   * - "pill": circular/rounded button matching ThemeToggle
   * - "text": clean minimal text link (default)
   */
  variant?: "pill" | "text";
  className?: string;
  showIcon?: boolean;
}

export function LanguageToggle({
  variant = "pill",
  className = "",
  showIcon = false,
}: LanguageToggleProps) {
  const { locale, toggleLocale, isAmharic } = useLanguage();

  const title = isAmharic ? "Switch to English" : "ወደ አማርኛ ቀይር";
  const ariaLabel = isAmharic ? "Switch to English" : "Switch to Amharic";
  const label = isAmharic ? "EN" : "አማ";

  if (variant === "text") {
    return (
      <button
        type="button"
        onClick={toggleLocale}
        title={title}
        aria-label={ariaLabel}
        className={`inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.12em] text-[#59534d] transition-colors hover:text-[#9f382f] dark:text-[#9b9490] dark:hover:text-[#f0ece6] ${className}`}
      >
        {showIcon && <Languages size={14} aria-hidden="true" />}
        <span className={!isAmharic ? "font-geez font-semibold" : "font-sans"}>
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      title={title}
      aria-label={ariaLabel}
      className={`flex h-8 items-center justify-center gap-1 rounded-full border border-[#262320]/10 bg-transparent px-2.5 text-[12px] font-semibold text-[#59534d] transition-all duration-200 hover:border-[#262320]/20 hover:bg-[#262320]/5 hover:text-[#262320] dark:border-white/10 dark:text-[#9b9490] dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-[#f0ece6] ${className}`}
    >
      {showIcon && <Languages size={13} aria-hidden="true" />}
      <span className={!isAmharic ? "font-geez" : "font-sans tracking-wide"}>
        {label}
      </span>
    </button>
  );
}

