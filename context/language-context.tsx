"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "@/translations"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState("en")

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      if (["en", "de", "es"].includes(browserLang)) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  // Save language preference to localStorage
  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        // Fallback to English if translation is missing
        let fallback = translations["en"]
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk]
          } else {
            return key // Return the key if no translation found
          }
        }
        return typeof fallback === "string" ? fallback : key
      }
    }

    return typeof value === "string" ? value : key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

