import { en } from "./translations/en";
import { am } from "./translations/am";
import type { Locale, Translations } from "./types";

export * from "./types";

export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: Locale[] = ["en", "am"];
export const LOCALE_STORAGE_KEY = "habesha-locale";
export const LOCALE_COOKIE_NAME = "habesha-locale";

export const translations: Record<Locale, Translations> = {
  en,
  am,
};

export function getTranslations(locale?: string | null): Translations {
  if (locale === "am") {
    return am;
  }
  return en;
}

export function isValidLocale(locale: unknown): locale is Locale {
  return locale === "en" || locale === "am";
}

