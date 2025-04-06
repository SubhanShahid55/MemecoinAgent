"use client"

import VideoSection from "@/components/video-section"
import UrgencySection from "@/components/urgency-section"
import ReviewsSection from "@/components/reviews-section"
import ResultsSection from "@/components/results-section"
import WhatToExpect from "@/components/what-to-expect"
import WhatYouGet from "@/components/what-you-get"
import DetailedResults from "@/components/detailed-results"
import FAQSection from "@/components/faq-section"

export default function Home() {
  return (
    <>
      <VideoSection />
      <UrgencySection />
      <div className="py-8 bg-white">
        <div className="container mx-auto">
          <div className="section-divider" />
        </div>
      </div>
      <ResultsSection />
      <DetailedResults />
      <ReviewsSection />
      <WhatToExpect />
      <WhatYouGet />
      <FAQSection />
    </>
  )
}

