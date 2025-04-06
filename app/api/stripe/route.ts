import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
})

export async function POST(request: Request) {
  try {
    // Get and validate request body
    const body = await request.json()
    const { amount, email, name } = body

    if (!amount || !email || !name) {
      return NextResponse.json(
        { error: "Missing required fields: amount, email, or name" },
        { status: 400 }
      )
    }

    // Validate amount format
    const amountInCents = Math.round(parseFloat(amount) * 100)
    if (isNaN(amountInCents) || amountInCents <= 0) {
      return NextResponse.json(
        { error: "Invalid amount format" },
        { status: 400 }
      )
    }

    // Create a payment intent with more details
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      payment_method_types: ["card"],
      metadata: {
        email,
        name,
        product: "Crypto University Subscription",
      },
      receipt_email: email,
      description: "Crypto University Subscription"
    })

    if (!paymentIntent.client_secret) {
      throw new Error("Failed to generate client secret")
    }

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    
    // Determine if this is a Stripe API error
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    )
  }
} 