"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import LanguageSelector from "./language-selector"
import { useLanguage } from "@/context/language-context"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useLanguage()

  // Check if we're on mobile/tablet based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dein%20Abschnittstext%20%281%29-yspPj82NocbAdIUBsd6nTl9jztMfbE.png"
              alt="Memecoins Agents Logo"
              width={70}
              height={70}
              className="mr-3"
            />
            <span className="text-2xl font-bold text-gray-900">Memecoins Agents</span>
          </Link>

          {/* Navigation Links - All aligned to the right */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-900 hover:text-primary transition-colors relative group">
              {t("nav.home")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/qa" className="text-gray-900 hover:text-primary transition-colors relative group">
              {t("nav.qa")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-primary transition-colors relative group">
              {t("nav.contact")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* CTA Button */}
            <Link
              href="/checkout"
              className="btn-primary flex items-center gap-2 transform hover:scale-105 transition-transform"
            >
              {t("nav.startNow")}
            </Link>

            {/* Language Selector */}
            <div className="w-[150px]">
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dein%20Abschnittstext%20%281%29-yspPj82NocbAdIUBsd6nTl9jztMfbE.png"
              alt="Memecoins Agents Logo"
              width={60}
              height={60}
              className="mr-2"
            />
            <span className="text-xl font-bold text-gray-900">Memecoins Agents</span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Mobile Language Selector */}
            <div className="w-[120px]">
              <LanguageSelector />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && isMobile && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-900 hover:text-primary transition-colors px-4 py-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/qa"
                className="text-gray-900 hover:text-primary transition-colors px-4 py-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.qa")}
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-primary transition-colors px-4 py-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>
              <Link
                href="/checkout"
                className="btn-primary mx-4 text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.startNow")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar

