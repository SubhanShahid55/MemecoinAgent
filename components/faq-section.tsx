"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0)

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index)
  }

  const faqs = [
    {
      question: "Wie kann ich GRATIS beitreten?",
      answer:
        "Indem du 3 Personen für unsere Premium Gruppe und somit auch den exklusiven Signalen anwirbst, und diese dann durch DICH beitreten! Dadurch sparst du dir die Teilnahmegebühr von 70,99,- für MINDESTENS 1 Monat! Solange die 3 Personen ein Teil der Gruppe bleiben, bleibst du ebenfalls KOSTENFREI ein Teil des Netzwerks und profitierst durch die Signale!",
    },
    {
      question: "Wie kann ich ZUSÄTZLICH Geld verdienen?",
      answer:
        "Ab dem Tag, ab dem du in der Gruppe bist, kannst du ZUSÄTZLICH zu den Memecoin-Investments, EINKOMMEN generieren, indem du pro angeworbene Person, die beitritt, 20,00€ verdienst, PRO MONAT, PRO PERSON (solange die Person in der Gruppe bleibt). Bei der 3 Person bekommst du statt 60,00€ (20€ x 3) -> 70,00€! Bei der 4. und 5. Person weiterhin jeweils 20,00€ pro Person und bei der 6. Person statt insgesamt 120,00€ (20€ x 6) -> 140€! MONATLICH (solange alle Personen ein Teil der Gruppe bleiben)",
    },
    {
      question: "How quickly will I receive signals after signing up?",
      answer:
        "You'll start receiving signals immediately after your subscription is confirmed. We typically send 5-7 signals per day directly to your email and through our members-only platform.",
    },
    {
      question: "Do I need prior experience with cryptocurrency?",
      answer:
        "No prior experience is needed. Our step-by-step guides and instructional videos will walk you through everything from setting up your wallet to executing trades based on our signals.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription at any time with no questions asked. There are no long-term commitments or hidden fees.",
    },
    {
      question: "How much does the subscription cost?",
      answer:
        "Our subscription is currently available at a special promotional price of €70.99 per month, reduced from the regular price of €99.99. This is a limited-time offer.",
    },
    {
      question: "What is the success rate of your signals?",
      answer:
        "Our signals have a proven track record with an average success rate of over 80%. Many of our past signals have resulted in 100x-1000x returns for our members.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-gray-700">Find answers to the most common questions about our services.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                className="flex justify-between items-center w-full bg-white px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openQuestion === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="font-medium text-gray-900">{faq.question}</h3>
                {openQuestion === index ? (
                  <ChevronUp className="text-primary flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-primary flex-shrink-0" size={20} />
                )}
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`transition-all duration-300 ${openQuestion === index ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
              >
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection

