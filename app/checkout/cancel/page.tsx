"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
          <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Payment Canceled</h2>
        <p className="text-gray-700 mb-6">Your payment has been canceled. No charges were made.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/checkout" className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-6 rounded-lg">
            <ArrowLeft size={16} className="mr-2" />
            Return to Checkout
          </Link>
          <Link href="/" className="inline-flex items-center justify-center bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

