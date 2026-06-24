"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const isPro = (user?.publicMetadata?.plan as string) === "pro";

  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id,
        email: user?.emailAddresses?.[0]?.emailAddress,
        origin: window.location.origin,
      }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  }

  if (!isLoaded) return null;

  if (isPro) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">You&apos;re a Pro user 🎉</h1>
        <p className="text-muted-foreground mb-8">
          You have full access to all features.
        </p>
        <a
          href="/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-2">
        Upgrade to Pro
      </h1>
      <p className="text-center text-muted-foreground mb-10">
        Get the most out of ContextOpt with advanced features.
      </p>

      <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Free</CardTitle>
            <p className="text-2xl font-bold">$0</p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✓ CLI analyze &amp; profile</p>
            <p>✓ Stdio proxy</p>
            <p>✓ Basic token estimation</p>
            <p className="text-muted-foreground">✗ HTTP proxy</p>
            <p className="text-muted-foreground">✗ Advanced analytics</p>
            <p className="text-muted-foreground">✗ Priority support</p>
          </CardContent>
        </Card>

        <Card className="border-green-500 dark:border-green-400 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-0.5 rounded-full">
            Popular
          </div>
          <CardHeader>
            <CardTitle className="text-lg">Pro</CardTitle>
            <p className="text-2xl font-bold">
              $19<span className="text-sm font-normal text-muted-foreground">/month</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✓ Everything in Free</p>
            <p>✓ HTTP proxy (--http)</p>
            <p>✓ Advanced token analytics</p>
            <p>✓ Profile comparison reports</p>
            <p>✓ Priority email support</p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white hover:bg-green-700 transition-colors cursor-pointer"
            >
              Upgrade to Pro
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
