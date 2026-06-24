import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const res = await fetch("https://api.paddle.com/transactions", {
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
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Checkout creation failed", details: data.error },
        { status: res.status }
      );
    }

    const checkoutUrl = data.data?.attributes?.url;
    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "No checkout URL in response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
