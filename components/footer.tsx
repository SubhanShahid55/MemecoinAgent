"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Send, ArrowUp, Twitter } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { BrandTiktok } from "tabler-icons-react"

const Footer = () => {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dein%20Abschnittstext%20%281%29-yspPj82NocbAdIUBsd6nTl9jztMfbE.png"
                alt="Memecoins Agents Logo"
                width={60}
                height={60}
                className="mr-2"
              />
              <span className="text-xl font-bold text-gray-900">Memecoins Agents</span>
            </Link>
            <p className="text-gray-600 mb-4">Your trusted source for MemeCoins investment strategies and signals.</p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/memecoin_agents?igsh=YzRpajl0czRybzA0&utm_source=qr"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://x.com/memecoinsagent?s=21"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Twitter/X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="Telegram">
                <Send size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@memcoinsagents?_t=ZN-8usBMM2CJFe&_r=1"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrandTiktok size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 text-lg font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/qa" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("nav.qa")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("nav.startNow")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 text-lg font-bold mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Send className="text-primary mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-600">memecoinsmasters7@gmail.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/contact" className="text-primary hover:underline font-medium">
                {t("footer.getHelp")}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Memecoins Agents. {t("footer.copyright")} Made by Uk_Dev
          </p>
          <div className="flex items-center">
            <p className="text-gray-500 text-sm mr-4">
              <span className="text-primary">*</span> {t("footer.disclaimer")}
            </p>
            <button
              onClick={scrollToTop}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

