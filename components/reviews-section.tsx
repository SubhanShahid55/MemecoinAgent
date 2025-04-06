"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const ReviewsSection = () => {
  const { t } = useLanguage()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const reviews = [
    {
      id: 1,
      name: "Tim B.",
      username: "@Tim B.",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tim.jpg-zQ5FZnv79IDUHLooxBfg9u4odK2gLF.jpeg",
      text: "Hier wird dir nicht irgendein Bullshit verkauft – hier gibt's echte Einblicke, die dich vor Verlusten schützen und deine Gewinne maximieren. Während andere verlieren, verdiene ich!",
      verified: true,
    },
    {
      id: 2,
      name: "Max R.",
      username: "@Max R.",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Max.jpg-IteVAETblT4PyecRGu7nnhvMKg29q8.jpeg",
      text: "Ich hätte nie gedacht, dass ich mit Krypto so schnell durchstarten kann! Wer hier nicht dabei ist, verpasst echte Insider-Infos, die sonst niemand teilt. Seit meinem Beitritt hat sich mein Portfolio verdreifacht!",
      verified: true,
    },
    {
      id: 3,
      name: "Kevin S.",
      username: "@Kevin S.",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kevin.jpg-XdHqaS5VZAfiXToZL5M9ss26tINNH9.jpeg",
      text: "Die Signale hier sind einfach NEXT LEVEL! Während andere noch überlegen, steige ich schon in die besten Coins ein. Jeder, der zögert, verpasst die Chance seines Lebens!",
      verified: true,
    },
    {
      id: 4,
      name: "Lisa H.",
      username: "@Lisa H.",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lisa.jpg-nf63dF2FzDipY3rXPN4Q0YBj0gfc9I.jpeg",
      text: "Hätte ich diese Community früher entdeckt, wäre ich jetzt schon finanziell frei. Die Strategien hier funktionieren, während der Rest der Welt noch schläft!",
      verified: true,
    },
    {
      id: 5,
      name: "Nina P.",
      username: "@Nina P.",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ninja.jpg-5kxNHp6OWDRgPsMINJi054EE03Bk13.jpeg",
      text: "Ich habe lange gezögert, aber als ich gesehen habe, wie viel die anderen hier verdienen, musste ich einfach rein! Und was soll ich sagen? Innerhalb von 2 Wochen mein erster großer Gewinn!",
      verified: true,
    },
    {
      id: 6,
      name: "Jonas K.",
      username: "@Jonas K.",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jonas.jpg-sB8YNeGI6NNf4UB4A58SH1PLHowZUH.jpeg",
      text: "Mein Kollege meinte, ich soll beitreten – beste Entscheidung meines Lebens! Die meisten Leute verlieren Geld mit Krypto, weil sie KEINEN Plan haben. Wer hier nicht dabei ist, bleibt auf der Strecke!",
      verified: true,
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.clientWidth * 0.8
      const newScrollPosition =
        direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      })

      // Update button visibility after scroll
      setTimeout(() => {
        if (container) {
          setShowLeftButton(container.scrollLeft > 0)
          setShowRightButton(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
        }
      }, 300)
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      setShowLeftButton(container.scrollLeft > 0)
      setShowRightButton(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          What Our <span className="text-primary">Student's Say</span>
        </h2>

        <div className="relative">
          {/* Left scroll button */}
          {showLeftButton && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
          )}

          {/* Right scroll button */}
          {showRightButton && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-[350px] max-w-[350px] bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow snap-start"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-gray-900">{review.name}</h3>
                      <svg className="w-5 h-5 ml-1 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">{review.username}</p>
                  </div>
                </div>
                <p className="text-gray-800 text-lg">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection

