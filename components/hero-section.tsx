"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const HeroSection = () => {
  const { t } = useLanguage()

  return (
    <section className="relative bg-primary-gradient py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">{t("hero.title")}</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">{t("hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/checkout"
              className="btn-primary text-center text-xl flex items-center justify-center gap-2 group"
            >
              👉 {t("hero.startNow")}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="btn-secondary text-center">
              {t("hero.learnMore")}
            </Link>
          </div>

          {/* Add social proof for better user trust */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6">
            <div className="bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <p className="text-sm text-gray-700">
                <span className="text-green-600">●</span> 2,500+ {t("hero.activeMembers")}
              </p>
            </div>
            <div className="bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <p className="text-sm text-gray-700">
                <span className="text-yellow-500">★★★★★</span> 4.9/5 {t("hero.rating")}
              </p>
            </div>
            <div className="bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <p className="text-sm text-gray-700">
                <span className="text-primary">✓</span> {t("hero.moneyBack")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add a scroll indicator for better UX */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-8 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <div className="w-1 h-3 bg-primary rounded-full animate-[scrollDown_1.5s_infinite]"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

