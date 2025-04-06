import { NextResponse } from "next/server"
import paypal from "@paypal/checkout-server-sdk"

// Ensure environment variables are properly loaded with better debugging
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://memecoinsagent-qjrtorr6u-subhanshahid55s-projects.vercel.app';

// Debug log to check credentials
console.log("PayPal Initialization - Client ID exists:", !!PAYPAL_CLIENT_ID);
console.log("PayPal Initialization - Client Secret exists:", !!PAYPAL_CLIENT_SECRET);
console.log("Base URL:", BASE_URL);

// Validate if PayPal credentials exist
if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  console.error("PayPal credentials are missing. Please check your environment variables.");
}

// Ensure we're using sandbox for development and live for production
const environment = process.env.NODE_ENV === "production"
  ? new paypal.core.LiveEnvironment(PAYPAL_CLIENT_ID || '', PAYPAL_CLIENT_SECRET || '')
  : new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID || '', PAYPAL_CLIENT_SECRET || '');

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(request: Request) {
  try {
    // Validate PayPal client initialization
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("PayPal credentials are missing");
    }

    const { amount, email, name } = await request.json();

    // Validate input data
    if (!amount || !email || !name) {
      throw new Error("Missing required parameters: amount, email, or name");
    }

    console.log("Creating PayPal order with:", { amount, email, name });

    // Create a new PayPal order
    const paypalRequest = new paypal.orders.OrdersCreateRequest();
    paypalRequest.prefer("return=representation");
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
    });

    console.log("Executing PayPal order request...");
    const order = await client.execute(paypalRequest);
    console.log("PayPal response received:", order.result.id);
    
    // Verify the response has the expected structure
    if (!order.result || !order.result.id || !order.result.links) {
      console.error("Invalid response structure from PayPal:", order);
      throw new Error("Invalid response from PayPal");
    }

    const approvalLink = order.result.links.find((link: any) => link.rel === "approve");
    if (!approvalLink || !approvalLink.href) {
      console.error("No approval URL found in PayPal response:", order.result.links);
      throw new Error("No approval URL found in PayPal response");
    }

    console.log("PayPal order created successfully:", order.result.id);
    console.log("Approval URL:", approvalLink.href);

    return NextResponse.json({ 
      orderId: order.result.id,
      approvalUrl: approvalLink.href
    });
  } catch (error: any) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create PayPal order" },
      { status: 500 }
    );
  }
} 