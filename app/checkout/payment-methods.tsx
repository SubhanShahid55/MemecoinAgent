"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

interface PaymentMethodsProps {
  amount: string
  itemName: string
  onSuccess: () => void
  onCancel: () => void
  email: string
  name: string
}

export default function PaymentMethods({ amount, itemName, onSuccess, onCancel, email, name }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("stripe")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStripeCheckout = () => {
    // Fix the Stripe Checkout URL and add success/cancel URLs
    const baseUrl = "https://buy.stripe.com/00g3dTfkKerg2xGbII";
    const successUrl = `${window.location.origin}/checkout/success?source=stripe&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${window.location.origin}/checkout/cancel?source=stripe`;
    
    // Create a new checkout session
    fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        email,
        name,
        successUrl,
        cancelUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        }
      })
      .catch((err) => {
        console.error("Error creating checkout session:", err);
        setError("Failed to initialize payment. Please try again.");
      });
  }

  const handlePayPalCheckout = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log("Initiating PayPal checkout with:", { amount, email, name });
      
      const response = await fetch("/api/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email, name }),
      })
      
      const data = await response.json()
      
      console.log("PayPal API response:", data);
      
      if (!response.ok) {
        console.error("Error response from PayPal API:", data);
        throw new Error(data.error || "Failed to initialize PayPal")
      }
      
      // Validate the response contains the expected fields
      if (!data.approvalUrl) {
        console.error("Invalid response from PayPal API:", data);
        throw new Error("No approval URL returned from PayPal")
      }
      
      // Redirect to PayPal's approval URL
      window.location.href = data.approvalUrl;
    } catch (error) {
      console.error("Error initializing PayPal payment:", error)
      setError(error instanceof Error ? error.message : "Failed to initialize PayPal payment")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Stripe Payment Option */}
        <div
          className={`border ${selectedMethod === "stripe" ? "border-primary" : "border-gray-200"} rounded-lg p-4 hover:border-primary transition-colors`}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={selectedMethod === "stripe"}
              onChange={() => setSelectedMethod("stripe")}
              className="mr-3"
            />
            <span className="text-gray-900 font-medium">Card Payment</span>
            <div className="flex ml-auto space-x-2">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Visa"
                width={40}
                height={25}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt="Mastercard"
                width={40}
                height={25}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
                alt="Amex"
                width={40}
                height={25}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png"
                alt="Apple Pay"
                width={40}
                height={25}
                className="h-6 w-auto object-contain"
              />
            </div>
          </label>
        </div>

        {/* PayPal Option */}
        <div
          className={`border ${selectedMethod === "paypal" ? "border-primary" : "border-gray-200"} rounded-lg p-4 hover:border-primary transition-colors`}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={selectedMethod === "paypal"}
              onChange={() => setSelectedMethod("paypal")}
              className="mr-3"
            />
            <span className="text-gray-900 font-medium">PayPal</span>
            <div className="ml-auto">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                alt="PayPal"
                width={80}
                height={30}
                className="h-8 w-auto object-contain"
              />
            </div>
          </label>
        </div>
      </div>

      {/* Payment Forms */}
      <div className="mt-6">
        {selectedMethod === "stripe" && (
          <button
            onClick={handleStripeCheckout}
            className="w-full bg-[#635BFF] hover:bg-[#524DDB] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
              alt="Stripe"
              width={60}
              height={25}
              className="h-6 w-auto object-contain mr-2"
            />
            {`Pay €${amount} securely`}
          </button>
        )}

        {selectedMethod === "paypal" && (
          <>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                <span className="text-gray-600">Initializing PayPal checkout...</span>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 flex items-start">
                <AlertCircle className="flex-shrink-0 mr-2 mt-0.5" size={18} />
                <div>
                  <p className="font-medium">PayPal initialization failed</p>
                  <p className="text-sm mt-1">{error}</p>
                  <button 
                    onClick={handlePayPalCheckout} 
                    className="mt-3 text-sm bg-white border border-red-300 hover:bg-red-50 px-3 py-1 rounded"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handlePayPalCheckout}
                disabled={isLoading}
                className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                  alt="PayPal"
                  width={80}
                  height={30}
                  className="h-6 w-auto object-contain mr-2"
                />
                {isLoading ? "Processing..." : `Pay €${amount} with PayPal`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

