import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const eventName = body.meta?.event_name;
    const customData = body.data?.attributes?.custom_data || {};
    const userId = customData.user_id;

    if (!userId) {
      return NextResponse.json({ received: true });
    }

    // Update Clerk user metadata based on subscription events
    if (eventName === "order_created" || eventName === "subscription_created") {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          plan: "pro",
          subscribedAt: new Date().toISOString(),
        },
      });
    }

    if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
      const client = await clerkClient();
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
