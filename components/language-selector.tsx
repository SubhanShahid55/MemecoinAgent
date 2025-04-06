"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, Check, ChevronDown } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "es", name: "Español" },
  ]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageSelect = (code: string) => {
    setLanguage(code)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  // Get current language name
  const currentLanguage = languages.find((lang) => lang.code === language)?.name || "English"

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 text-gray-700 hover:text-primary px-3 py-2 rounded-md border border-gray-200 hover:border-primary transition-colors w-full"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={16} />
        <span className="text-sm font-medium">{currentLanguage}</span>
        <ChevronDown size={14} className={`transition-transform ml-auto ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full min-w-[150px] bg-white rounded-md shadow-lg border border-gray-200 z-[100]">
          <ul className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${language === lang.code ? "text-primary font-medium bg-red-50" : "text-gray-700 hover:bg-gray-100"} flex items-center justify-between`}
                  onClick={() => handleLanguageSelect(lang.code)}
                  role="menuitem"
                >
                  {lang.name}
                  {language === lang.code && <Check size={16} />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LanguageSelector

