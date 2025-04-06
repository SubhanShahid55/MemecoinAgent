"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#1a2b3b] mb-4">MEMECOINS AGENTS</h1>
        <p className="text-xl text-gray-600 mb-4">Earn Money Instantly!</p>
        <p className="text-xl text-gray-800 font-semibold mb-4">No prior experience, no time waste</p>
        <div className="flex justify-center mb-8">
          <div className="text-2xl">↘️⬇️↙️</div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border-8 border-white shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=720&width=1280')" }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-xl"
                aria-label="Play video"
              >
                <Play size={36} className="text-[#1a2b3b] ml-2" />
              </button>
            </div>
          </div>

          {isPlaying && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <p className="text-white text-xl">Video player would be implemented here</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoSection

