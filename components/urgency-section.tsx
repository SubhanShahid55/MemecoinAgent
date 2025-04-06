"use client"

import Link from "next/link"
import { Clock } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const UrgencySection = () => {
  const { t } = useLanguage()

  // Calculate a random future date for the countdown (7-10 days from now)
  const getRandomFutureDate = () => {
    const today = new Date()
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 4) + 7)
    return futureDate
  }

  const offerEndDate = getRandomFutureDate()
  const formattedDate = offerEndDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <section className="py-12 bg-primary-gradient" aria-labelledby="offer-section-title">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-white border border-primary/30 rounded-xl p-8 text-center shadow-lg transform hover:scale-[1.01] transition-transform">
          <h2 id="offer-section-title" className="text-3xl font-bold mb-6 text-gray-900">
            {t("urgency.title")}
          </h2>
          <div className="mb-6">
            <p className="text-xl mb-2 text-gray-700">{t("urgency.noSubscription")}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <span className="text-red-600 line-through text-2xl">{t("urgency.regularPrice")}</span>
              <span className="text-green-600 text-4xl font-bold">{t("urgency.discountPrice")}</span>
              <span className="text-gray-900 text-2xl">{t("urgency.perMonth")}</span>
            </div>
            <div className="flex items-center justify-center text-yellow-600 mb-4">
              <Clock className="mr-2" size={20} />
              <span className="font-semibold text-lg">{t("urgency.limitedTime")}</span>
            </div>
            <div className="bg-red-50 p-3 rounded-lg inline-block">
              <p className="text-gray-900">
                <span className="font-bold">Save 30%</span> when you join today!
              </p>
            </div>
          </div>
          <Link
            href="/checkout"
            className="btn-primary inline-flex items-center justify-center gap-2 text-lg group px-6 py-3 rounded-xl shadow-md"
            style={{ backgroundColor: "#c20f05" }}
          >
            START NOW
          </Link>

          {/* Add trust badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="bg-white px-3 py-1 rounded-md border border-gray-200">
              <p className="text-sm text-gray-700">🔒 {t("urgency.securePayment")}</p>
            </div>
            <div className="bg-white px-3 py-1 rounded-md border border-gray-200">
              <p className="text-sm text-gray-700">✓ {t("urgency.cancelAnytime")}</p>
            </div>
            <div className="bg-white px-3 py-1 rounded-md border border-gray-200">
              <p className="text-sm text-gray-700">💰 Guaranteed Results</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UrgencySection

