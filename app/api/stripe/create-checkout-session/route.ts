import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
})

export async function POST(request: Request) {
  try {
    const { amount, email, name, successUrl, cancelUrl } = await request.json()

    // Validate required fields
    if (!amount || !email || !name) {
      return NextResponse.json(
        { error: "Missing required fields: amount, email, or name" },
        { status: 400 }
      )
    }

    // Convert amount to cents
    const amountInCents = Math.round(parseFloat(amount) * 100)
    if (isNaN(amountInCents) || amountInCents <= 0) {
      return NextResponse.json(
        { error: "Invalid amount format" },
        { status: 400 }
      )
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Crypto University Subscription",
              description: `Subscription for ${name}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        email,
        name,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      )
    }
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
} 