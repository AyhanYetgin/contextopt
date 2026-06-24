import { NextRequest, NextResponse } from "next/server";

const LS_API = "https://api.lemonsqueezy.com/v1";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const response = await fetch(`${LS_API}/checkouts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: body.email || "",
              custom: {
                user_id: body.userId || "",
              },
            },
          },
          relationships: {
            store: {
              data: { type: "stores", id: process.env.LEMONSQUEEZY_STORE_ID },
            },
            variant: {
              data: { type: "variants", id: process.env.LEMONSQUEEZY_VARIANT_ID },
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create checkout", details: data.errors },
        { status: response.status }
      );
    }

    return NextResponse.json({ url: data.data.attributes.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
