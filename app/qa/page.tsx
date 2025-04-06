"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronUp, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function QAPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openCategory, setOpenCategory] = useState("general")
  const [openQuestions, setOpenQuestions] = useState<string[]>([])
  const [filteredCategories, setFilteredCategories] = useState<any[]>([])
  const [noResults, setNoResults] = useState(false)

  const faqCategories = [
    {
      id: "general",
      name: "General Questions",
      questions: [
        {
          id: "general-0a",
          question: "Wie kann ich GRATIS beitreten?",
          answer:
            "Indem du 3 Personen für unsere Premium Gruppe und somit auch den exklusiven Signalen anwirbst, und diese dann durch DICH beitreten! Dadurch sparst du dir die Teilnahmegebühr von 70,99,- für MINDESTENS 1 Monat! Solange die 3 Personen ein Teil der Gruppe bleiben, bleibst du ebenfalls KOSTENFREI ein Teil des Netzwerks und profitierst durch die Signale!",
        },
        {
          id: "general-0b",
          question: "Wie kann ich ZUSÄTZLICH Geld verdienen?",
          answer:
            "Ab dem Tag, ab dem du in der Gruppe bist, kannst du ZUSÄTZLICH zu den Memecoin-Investments, EINKOMMEN generieren, indem du pro angeworbene Person, die beitritt, 20,00€ verdienst, PRO MONAT, PRO PERSON (solange die Person in der Gruppe bleibt). Bei der 3 Person bekommst du statt 60,00€ (20€ x 3) -> 70,00€! Bei der 4. und 5. Person weiterhin jeweils 20,00€ pro Person und bei der 6. Person statt insgesamt 120,00€ (20€ x 6) -> 140€! MONATLICH (solange alle Personen ein Teil der Gruppe bleiben)",
        },
        {
          id: "general-1",
          question: "What is Crypto University?",
          answer:
            "Crypto University is a premium service that provides expert analysis, signals, and educational resources for cryptocurrency investors, with a special focus on MemeCoins that have high growth potential.",
        },
        {
          id: "general-2",
          question: "How much does the subscription cost?",
          answer:
            "Our subscription is currently available at a special promotional price of €70.99 per month, reduced from the regular price of €99.99. This is a limited-time offer.",
        },
        {
          id: "general-3",
          question: "Is there a minimum subscription period?",
          answer:
            "No, there is no minimum subscription period. You can cancel at any time without any penalties or hidden fees.",
        },
      ],
    },
    {
      id: "signals",
      name: "Signals & Analysis",
      questions: [
        {
          id: "signals-1",
          question: "How many signals will I receive?",
          answer:
            "You will receive 5-7 exclusive signals daily from our team of 15 experienced analysts. These signals are carefully selected for their high potential return.",
        },
        {
          id: "signals-2",
          question: "How are the signals delivered?",
          answer:
            "Signals are delivered through our members-only platform, via email, and through our mobile app notifications to ensure you never miss an opportunity.",
        },
        {
          id: "signals-3",
          question: "What is the success rate of your signals?",
          answer:
            "Our signals have a proven track record with an average success rate of over 80%. Many of our past signals have resulted in 100x-1000x returns for our members.",
        },
      ],
    },
    {
      id: "technical",
      name: "Technical Questions",
      questions: [
        {
          id: "technical-1",
          question: "Do I need technical knowledge to follow your signals?",
          answer:
            "No technical knowledge is required. We provide step-by-step guides and video tutorials that make it easy for beginners to follow our signals and execute trades.",
        },
        {
          id: "technical-2",
          question: "Which exchanges do you recommend for trading MemeCoins?",
          answer:
            "We recommend several exchanges including Binance, Coinbase, KuCoin, and decentralized exchanges like Uniswap and PancakeSwap. Our guides will help you set up accounts on these platforms.",
        },
        {
          id: "technical-3",
          question: "How do I set up a crypto wallet?",
          answer:
            "We provide detailed guides for setting up various wallets including MetaMask, Trust Wallet, and others. These guides are available immediately after you subscribe.",
        },
      ],
    },
    {
      id: "support",
      name: "Support & Assistance",
      questions: [
        {
          id: "support-1",
          question: "Is there customer support available?",
          answer:
            "Yes, we offer 24/7 customer support through live chat, email, and our members-only community. Our team is always ready to assist you with any questions or issues.",
        },
        {
          id: "support-2",
          question: "Can I get personalized advice from your analysts?",
          answer:
            "Yes, our premium subscription includes access to our team of experts who can provide personalized guidance based on your investment goals and risk tolerance.",
        },
        {
          id: "support-3",
          question: "What if I have a technical issue with the platform?",
          answer:
            "Our technical support team is available 24/7 to help resolve any issues you might encounter with our platform or following our signals.",
        },
      ],
    },
  ]

  useEffect(() => {
    // Filter categories and questions based on search query
    if (searchQuery.trim() === "") {
      setFilteredCategories(faqCategories)
      setNoResults(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = faqCategories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) => q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.questions.length > 0)

    setFilteredCategories(filtered)
    setNoResults(filtered.length === 0)
  }, [searchQuery])

  const toggleQuestion = (id: string) => {
    if (openQuestions.includes(id)) {
      setOpenQuestions(openQuestions.filter((q) => q !== id))
    } else {
      setOpenQuestions([...openQuestions, id])
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Reset open categories/questions when searching
    if (e.target.value.trim() !== "" && openCategory !== "") {
      setOpenCategory("")
    } else if (e.target.value.trim() === "") {
      setOpenCategory("general")
    }
  }

  return (
    <>
      {/* Breadcrumb navigation for better UX */}
      <nav className="bg-gray-100 py-3" aria-label="Breadcrumb">
        <div className="container mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-400 hover:text-primary">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Q&A</li>
          </ol>
        </div>
      </nav>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Questions & <span className="text-primary">Answers</span>
            </h1>
            <p className="text-xl text-gray-700">Find answers to the most common questions about our services.</p>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-input pl-12"
                aria-label="Search questions"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {searchQuery && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search tips */}
            <div className="mt-2 text-sm text-gray-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              <span>Tip: Search for keywords like "signals", "wallet", or "support"</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            {noResults ? (
              <div className="text-center py-12 bg-gray-900 rounded-lg">
                <p className="text-gray-400 mb-4">No questions found matching your search.</p>
                <button onClick={() => setSearchQuery("")} className="text-primary hover:underline">
                  Clear search
                </button>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id} className="mb-8">
                  <button
                    className="flex justify-between items-center w-full bg-white border border-gray-200 rounded-lg px-6 py-4 text-left hover:border-primary/50 transition-colors shadow-md"
                    onClick={() => setOpenCategory(openCategory === category.id ? "" : category.id)}
                    aria-expanded={openCategory === category.id}
                    aria-controls={`category-${category.id}`}
                  >
                    <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                    {openCategory === category.id ? (
                      <ChevronUp className="text-primary" size={20} />
                    ) : (
                      <ChevronDown className="text-primary" size={20} />
                    )}
                  </button>

                  <div
                    id={`category-${category.id}`}
                    className={`mt-4 space-y-4 transition-all duration-300 ${openCategory === category.id ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
                  >
                    {category.questions.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <button
                          className="flex justify-between items-center w-full bg-white px-6 py-4 text-left hover:bg-gray-900/50 transition-colors"
                          onClick={() => toggleQuestion(item.id)}
                          aria-expanded={openQuestions.includes(item.id)}
                          aria-controls={`question-${item.id}`}
                        >
                          <h3 className="font-medium text-gray-900">{item.question}</h3>
                          {openQuestions.includes(item.id) ? (
                            <ChevronUp className="text-primary flex-shrink-0" size={20} />
                          ) : (
                            <ChevronDown className="text-primary flex-shrink-0" size={20} />
                          )}
                        </button>

                        <div
                          id={`question-${item.id}`}
                          className={`transition-all duration-300 ${openQuestions.includes(item.id) ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
                        >
                          <div className="px-6 py-4 bg-gray-50">
                            <p className="text-gray-700">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Still Have <span className="text-primary">Questions?</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Our team is here to help you with any questions you might have about our services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="btn-primary flex items-center justify-center gap-2 group">
                Contact Our Experts
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/checkout" className="btn-secondary flex items-center justify-center gap-2 group">
                Start Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

