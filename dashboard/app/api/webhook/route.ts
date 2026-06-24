import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Paddle webhook events
    const eventType = body.event_type;

    // Extract user_id from custom data
    const userId =
      body.data?.custom_data?.user_id ||
      body.data?.subscription?.custom_data?.user_id;

    if (!userId) {
      return NextResponse.json({ received: true });
    }

    const client = await clerkClient();

    if (
      eventType === "subscription.created" ||
      eventType === "transaction.completed"
    ) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          plan: "pro",
          subscribedAt: new Date().toISOString(),
        },
      });
    }

    if (
      eventType === "subscription.cancelled" ||
      eventType === "subscription.expired"
    ) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          plan: "free",
          subscribedAt: null,
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ received: true });
  }
}
