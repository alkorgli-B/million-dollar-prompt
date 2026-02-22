"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Locale, type Translations } from "./i18n";

// ─── Theme ───
type Theme = "dark" | "light";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ theme: "dark", toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

// ─── Language ───
interface LangCtx {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
  dir: "ltr" | "rtl";
}

const LangContext = createContext<LangCtx>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
  dir: "ltr",
});
export const useLang = () => useContext(LangContext);

// ─── Provider ───
export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [locale, setLocale] = useState<Locale>("en");

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("mdp-theme") as Theme | null;
    const savedLocale = localStorage.getItem("mdp-locale") as Locale | null;
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    if (savedLocale === "en" || savedLocale === "ar") setLocale(savedLocale);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mdp-theme", theme);
  }, [theme]);

  // Apply direction to document
  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", locale);
    localStorage.setItem("mdp-locale", locale);
  }, [locale]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = translations[locale] as unknown as Translations;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LangContext.Provider value={{ locale, t, setLocale, dir }}>
        {children}
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}
