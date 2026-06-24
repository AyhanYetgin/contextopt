import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Create a checkout URL using Paddle Billing API
    const response = await fetch(
      "https://api.paddle.com/checkout/custom/new",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              price_id: process.env.PADDLE_PRICE_ID,
              quantity: 1,
            },
          ],
          custom_data: {
            user_id: body.userId || "",
          },
          customer: {
            email: body.email || undefined,
          },
          success_url: `${body.origin || "http://localhost:3000"}/success`,
          cancel_url: `${body.origin || "http://localhost:3000"}/cancel`,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create checkout", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({ url: data.data.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
