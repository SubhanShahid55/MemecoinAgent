"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState<string | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const source = searchParams.get("source")
        
        if (source === "stripe") {
          const sessionId = searchParams.get("session_id")
          if (!sessionId) {
            throw new Error("No session ID found")
          }

          const response = await fetch("/api/stripe/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          })

          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error || "Payment verification failed")
          }

          if (data.success) {
            setStatus("success")
            setPaymentDetails(data.details)
          } else {
            throw new Error("Payment was not successful")
          }
        } else if (source === "paypal") {
          const token = searchParams.get("token")
          if (!token) {
            throw new Error("No PayPal token found")
          }

          const response = await fetch("/api/paypal/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: token }),
          })

          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error || "Payment verification failed")
          }

          if (data.success) {
            setStatus("success")
            setPaymentDetails(data.details)
          } else {
            throw new Error("Payment was not successful")
          }
        } else {
          throw new Error("Invalid payment source")
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setStatus("error")
        setError(error instanceof Error ? error.message : "Payment verification failed")
      }
    }

    verifyPayment()
  }, [searchParams])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Verifying payment...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h1>
          <p className="text-gray-600">{error || "There was an error processing your payment."}</p>
          <a href="/" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Return Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase.</p>
        <a href="/" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Return Home
        </a>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

