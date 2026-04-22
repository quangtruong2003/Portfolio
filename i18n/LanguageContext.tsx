"use client";

import React, { useState, useEffect } from "react";
import { Language, Dictionary } from "./dictionary";
import { vi, en } from "./dictionary";

interface LanguageContextValue {
  language: Language;
  dictionary: Dictionary;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = "portfolio-language";

const dictionaries: Record<Language, Dictionary> = { vi, en };

function getBrowserLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "vi" || stored === "en") return stored;
  } catch {
    // SSR or storage blocked
  }
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("vi")) return "vi";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lang = getBrowserLanguage();
    setLanguageState(lang);
    setReady(true);

    const handleStorage = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "vi" || stored === "en") setLanguageState(stored);
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const next: Language = language === "vi" ? "en" : "vi";
    setLanguage(next);
  };

  const value: LanguageContextValue = {
    language,
    dictionary: dictionaries[language],
    setLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

const LanguageContext = React.createContext<LanguageContextValue | undefined>(undefined);

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

export function useDictionary() {
  const { dictionary } = useLanguage();
  return dictionary;
}
