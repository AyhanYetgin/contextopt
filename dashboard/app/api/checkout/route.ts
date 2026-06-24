import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const origin = body.origin || "http://localhost:3000";

    const checkoutUrl = new URL(
      `https://buy.paddle.com/price/${process.env.PADDLE_PRICE_ID}`
    );

    checkoutUrl.searchParams.set("success_url", `${origin}/success`);
    checkoutUrl.searchParams.set("cancel_url", `${origin}/cancel`);

    if (body.userId) {
      checkoutUrl.searchParams.set(
        "custom_data",
        JSON.stringify({ user_id: body.userId })
      );
    }

    if (body.email) {
      checkoutUrl.searchParams.set("customer_email", body.email);
    }

    return NextResponse.json({ url: checkoutUrl.toString() });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
