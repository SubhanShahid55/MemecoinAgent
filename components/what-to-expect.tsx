"use client"

import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const WhatToExpect = () => {
  const expectations = [
    "Up to 5-7 exclusive signals daily – directly from our experts!",
    "A team of 15 experienced analysts – for maximum hit rate.",
    "Over 7 years of experience in the crypto field – we know what works!",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="section bg-white" id="what-to-expect">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            What You Can <span className="text-primary">Expect</span>
          </h2>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {expectations.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <CheckCircle className="text-primary mr-4 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-xl text-gray-800">{item}</p>
                  {index === 0 && (
                    <p className="text-gray-600 mt-2">
                      Our team monitors the market 24/7 to identify the most promising opportunities before they go
                      mainstream.
                    </p>
                  )}
                  {index === 1 && (
                    <p className="text-gray-600 mt-2">
                      Each signal undergoes rigorous analysis by multiple experts to ensure the highest probability of
                      success.
                    </p>
                  )}
                  {index === 2 && (
                    <p className="text-gray-600 mt-2">
                      Our track record speaks for itself, with consistent returns even during market downturns.
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6 text-center shadow-lg">
            <blockquote className="text-xl text-gray-800 italic mb-4">
              "The quality and accuracy of the signals I receive daily have completely transformed my crypto portfolio.
              I've never seen anything like it."
            </blockquote>
            <cite className="text-gray-900 font-medium">— Michael R., Member since 2022</cite>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatToExpect

