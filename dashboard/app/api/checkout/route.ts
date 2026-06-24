import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const priceId = process.env.PADDLE_PRICE_ID;
    const origin = body.origin || "http://localhost:3000";

    // Build custom data for the webhook
    const customData = {
      user_id: body.userId || "",
    };

    // Paddle checkout URL format: https://checkout.paddle.com/price/PRICE_ID
    const params = new URLSearchParams({
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      custom_data: JSON.stringify(customData),
    });

    if (body.email) {
      params.set("customer_email", body.email);
    }

    const checkoutUrl = `https://checkout.paddle.com/price/${priceId}?${params.toString()}`;

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
