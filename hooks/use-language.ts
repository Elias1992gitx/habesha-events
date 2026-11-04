import { useContext } from "react";
import { LanguageContext } from "@/components/language-provider";
import type { Locale, Translations } from "@/lib/i18n";

export interface UseLanguageReturn {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
  isAmharic: boolean;
}

export function useLanguage(): UseLanguageReturn {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

