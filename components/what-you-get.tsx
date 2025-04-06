"use client"

import { Target, Video, DollarSign, GraduationCap, LifeBuoy, Lock } from "lucide-react"
import Link from "next/link"

const WhatYouGet = () => {
  const benefits = [
    {
      icon: <Target size={32} className="text-primary" />,
      title: "Step-by-step guide",
      description: "Set up your wallet & trading account in just a few minutes.",
    },
    {
      icon: <Video size={32} className="text-primary" />,
      title: "Exclusive instructional video",
      description: "Learn how to invest strategically in MemeCoins.",
    },
    {
      icon: <DollarSign size={32} className="text-primary" />,
      title: "Affiliate program",
      description: "Earn extra through referrals!",
    },
    {
      icon: <GraduationCap size={32} className="text-primary" />,
      title: "Highly qualified expert team",
      description: "For your personal questions.",
    },
    {
      icon: <LifeBuoy size={32} className="text-primary" />,
      title: "24/7 support & assistance",
      description: "We won't leave you alone!",
    },
    {
      icon: <Lock size={32} className="text-primary" />,
      title: "Secure access",
      description: "Maximize your profits with secure platform access.",
    },
  ]

  return (
    <section className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            What You Will <span className="text-primary">Get</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Everything you need to succeed in the meme coins market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary/50 transition-colors shadow-md hover:shadow-lg"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/checkout"
            className="btn-primary inline-block text-xl rounded-xl shadow-md"
            style={{ backgroundColor: "#c20f05" }}
          >
            START NOW
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WhatYouGet

