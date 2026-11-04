"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  LOCALE_STORAGE_KEY,
  isValidLocale,
  translations,
  type Locale,
} from "@/lib/i18n";
import type { UseLanguageReturn } from "@/hooks/use-language";

export const LanguageContext = createContext<UseLanguageReturn | null>(null);

function writeCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

function applyHtmlLang(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  if (locale === "am") {
    document.documentElement.classList.add("lang-am");
  } else {
    document.documentElement.classList.remove("lang-am");
  }
}

/** Injected into <head> before hydration to prevent mismatch/flash */
export function LanguageScript() {
  const script = `(function(){try{var m=document.cookie.match(/(?:^|; )habesha-locale=([^;]*)/);var c=m?decodeURIComponent(m[1]):null;var s=localStorage.getItem('${LOCALE_STORAGE_KEY}');var l=s==='en'||s==='am'?s:c==='en'||c==='am'?c:'en';document.documentElement.lang=l;if(l==='am'){document.documentElement.classList.add('lang-am');}}catch(e){}})();`;
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Read stored preference on mount
  useEffect(() => {
    let chosen: Locale = initialLocale;
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isValidLocale(stored)) {
        chosen = stored;
      } else {
        // Check cookie
        const match = document.cookie.match(
          new RegExp(`(?:^|; )${LOCALE_COOKIE_NAME}=([^;]*)`)
        );
        const cookieVal = match ? decodeURIComponent(match[1]) : null;
        if (isValidLocale(cookieVal)) {
          chosen = cookieVal;
        }
      }
    } catch (_) {
      // ignore
    }

    setLocaleState(chosen);
    writeCookie(chosen);
    applyHtmlLang(chosen);
  }, [initialLocale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    } catch (_) {
      // ignore
    }
    writeCookie(nextLocale);
    applyHtmlLang(nextLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "am" : "en");
  }, [locale, setLocale]);

  const value: UseLanguageReturn = {
    locale,
    setLocale,
    toggleLocale,
    t: translations[locale],
    isAmharic: locale === "am",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

