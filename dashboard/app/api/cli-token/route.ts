import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

const TOKEN_PREFIX = "ctopt_";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { token } = body;

    if (!token || typeof token !== "string" || !token.startsWith(TOKEN_PREFIX)) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    const userId = token.slice(TOKEN_PREFIX.length);
    if (!userId || userId.length < 4) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const isPro = (user.publicMetadata?.plan as string) === "pro";

    return NextResponse.json({ valid: isPro, userId });
  } catch {
    return NextResponse.json({ valid: false }, { status: 200 });
  }
}
