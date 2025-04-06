import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
})

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 }
      )
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Check payment status
    const paymentStatus = session.payment_status
    const paymentIntent = session.payment_intent as string

    // If payment is successful, you might want to retrieve additional details
    let paymentDetails = null
    if (paymentStatus === 'paid' && paymentIntent) {
      const intent = await stripe.paymentIntents.retrieve(paymentIntent)
      paymentDetails = {
        amount: intent.amount,
        currency: intent.currency,
        paymentMethod: intent.payment_method_types,
        status: intent.status,
      }
    }

    return NextResponse.json({
      success: paymentStatus === 'paid',
      status: paymentStatus,
      details: paymentDetails,
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      )
    }
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    )
  }
} 