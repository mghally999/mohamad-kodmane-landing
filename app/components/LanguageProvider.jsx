"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const Ctx = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en"); // "en" | "ar"

  const isRTL = locale === "ar";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.body.setAttribute("dir", isRTL ? "rtl" : "ltr");
  }, [locale, isRTL]);

  const value = useMemo(() => ({ locale, setLocale, isRTL }), [locale, isRTL]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLanguage must be used inside LanguageProvider");
  return v;
}
