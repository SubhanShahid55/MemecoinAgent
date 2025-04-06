import { NextResponse } from "next/server"
import paypal from "@paypal/checkout-server-sdk"

// Ensure environment variables are properly loaded with fallbacks
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Validate if PayPal credentials exist
if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  console.error("PayPal credentials are missing. Please check your environment variables.");
}

// This should be production unless you're testing
const environment = process.env.NODE_ENV === "production"
  ? new paypal.core.LiveEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)
  : new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)

const client = new paypal.core.PayPalHttpClient(environment)

export async function POST(request: Request) {
  try {
    // Validate PayPal client initialization
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("PayPal credentials are missing");
    }

    const { amount, email, name } = await request.json()

    // Validate input data
    if (!amount || !email || !name) {
      throw new Error("Missing required parameters: amount, email, or name");
    }

    console.log("Creating PayPal order with:", { amount, email, name });

    const paypalRequest = new paypal.orders.OrdersCreateRequest()
    paypalRequest.prefer("return=representation")
    paypalRequest.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: amount.toString(),
          },
          custom_id: email,
          description: `Subscription for ${name}`,
        },
      ],
      application_context: {
        brand_name: "Crypto University",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: `${BASE_URL}/checkout/success?source=paypal`,
        cancel_url: `${BASE_URL}/checkout/cancel?source=paypal`,
      },
    })

    const order = await client.execute(paypalRequest)
    
    // Verify the response has the expected structure
    if (!order.result || !order.result.id || !order.result.links) {
      throw new Error("Invalid response from PayPal");
    }

    const approvalLink = order.result.links.find((link: any) => link.rel === "approve");
    if (!approvalLink || !approvalLink.href) {
      throw new Error("No approval URL found in PayPal response");
    }

    console.log("PayPal order created successfully:", order.result.id);

    return NextResponse.json({ 
      orderId: order.result.id,
      approvalUrl: approvalLink.href
    })
  } catch (error: any) {
    console.error("Error creating PayPal order:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create PayPal order" },
      { status: 500 }
    )
  }
} 