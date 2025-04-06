"use client"

import Image from "next/image"

const DetailedResults = () => {
  const results = [
    {
      coin: "fry/SOL",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0030.jpg-mdWo62RmAA36AuQAyrkGOHheArmQAm.jpeg",
      prediction: "Predicted 100% increase within 24 hours",
      result: "Actual increase: +136.11%",
      description: "Our analysts identified a key support level that triggered a strong bounce.",
    },
    {
      coin: "Qwen Ai",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0031.jpg-uOUcsy2fYjj0LMRgH9wkFxHktinARQ.jpeg",
      prediction: "Predicted major pump after listing announcement",
      result: "Actual increase: +421.10%",
      description: "We alerted our members 3 hours before the major exchange listing was public.",
    },
    {
      coin: "Crypto punks",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0032.jpg-qi1rPHhqVXmhFAJ8TBZXKMrBnWGxYC.jpeg",
      prediction: "Predicted breakout from consolidation pattern",
      result: "Actual increase: +690.76%",
      description: "Technical analysis showed a clear breakout pattern forming.",
    },
    {
      coin: "DOGECAUCUS",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0033.jpg-mwE33qExabW0ETpZmhgyuWgRniaXa6.jpeg",
      prediction: "Predicted reversal at support level",
      result: "Actual increase: +323.96%",
      description: "Our team identified the exact support level where smart money was accumulating.",
    },
    {
      coin: "Woolly Mouse",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0029.jpg-NLOloHNMkWhEKxJeTMS8R6WMjksrIX.jpeg",
      prediction: "Predicted breakout from accumulation phase",
      result: "Actual increase: +70.46%",
      description: "We spotted the accumulation pattern before the major move upward.",
    },
    {
      coin: "If she's down",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0027.jpg-cC4PWWKLblmBDBPwqeikri9ZHo4Jke.jpeg",
      prediction: "Predicted pump after social media attention",
      result: "Actual increase: +100.64%",
      description: "Our social media monitoring alerted us to increasing attention on this coin.",
    },
    {
      coin: "DJ Daniel",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0028.jpg-OkQjOC4VYr2s9OgOpzseIjog8cgD1j.jpeg",
      prediction: "Predicted recovery after market dip",
      result: "Actual increase: +83.96%",
      description: "We identified the perfect entry point after the market-wide correction.",
    },
    {
      coin: "Titcoin",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0026.jpg-zqziTgBaKnH8bQ3w48zoIYUMlRhOxv.jpeg",
      prediction: "Predicted breakout from resistance level",
      result: "Actual increase: +187.73%",
      description: "Our technical analysis identified the key resistance level before the breakout.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Screenshot from <span className="text-primary">Group Results</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">Here are some signals from our group</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 p-6 flex items-center justify-center bg-gray-50">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={result.image || "/placeholder.svg"}
                      alt={`${result.coin} result`}
                      width={500}
                      height={500}
                      className="rounded-lg w-auto h-auto max-h-[400px] object-contain"
                      priority={index < 4} // Load first 4 images with priority
                    />
                  </div>
                </div>
                <div className="md:w-2/5 p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{result.coin}</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Prediction:</span> {result.prediction}
                  </p>
                  <p className="text-green-600 font-bold mb-2">{result.result}</p>
                  <p className="text-gray-600 text-sm">{result.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DetailedResults

