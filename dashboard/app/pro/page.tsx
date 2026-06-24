"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

declare global {
  interface Window {
    Paddle?: {
      Checkout: {
        open: (config: Record<string, unknown>) => void;
      };
    };
  }
}

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
    const proToken = user?.id ? `ctopt_${user.id.slice(0, 12)}` : "";

    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">You&apos;re a Pro user 🎉</h1>
        <p className="text-muted-foreground mb-8">
          You have full access to all features.
        </p>

        <div className="rounded-lg border border-border/50 p-6 mb-8 text-left max-w-md mx-auto">
          <p className="text-sm font-semibold mb-2">Your CLI Token</p>
          <p className="text-xs text-muted-foreground mb-3">
            Use this token to unlock Pro features in the CLI.
          </p>
          <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto select-all cursor-pointer">
            <code>{proToken}</code>
          </pre>
          <p className="text-xs text-muted-foreground mt-2">
            Run: <code className="bg-secondary px-1 rounded text-[11px]">contextopt config set token {proToken}</code>
          </p>
        </div>

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

      <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto items-stretch">
        <Card className="border-border/50 flex flex-col">
          <div className="h-[28px]" />
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Free</CardTitle>
            <p className="text-3xl font-bold">$0</p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <p className="flex items-center gap-2"><span className="text-green-600">✓</span> CLI analyze & profile</p>
              <p className="flex items-center gap-2"><span className="text-green-600">✓</span> Stdio proxy</p>
              <p className="flex items-center gap-2"><span className="text-green-600">✓</span> Basic token estimation</p>
              <p className="flex items-center gap-2 text-muted-foreground"><span className="text-muted-foreground">✗</span> HTTP proxy</p>
              <p className="flex items-center gap-2 text-muted-foreground"><span className="text-muted-foreground">✗</span> Advanced analytics</p>
              <p className="flex items-center gap-2 text-muted-foreground"><span className="text-muted-foreground">✗</span> Priority support</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500 dark:border-green-400 flex flex-col overflow-hidden">
          <div className="bg-green-600 text-white text-xs text-center py-1.5 font-medium tracking-wide">
            POPULAR
          </div>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Pro</CardTitle>
            <p className="text-3xl font-bold">
              ₺885<span className="text-base font-normal text-muted-foreground">/month</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <p className="flex items-center gap-2"><span className="text-green-600">✓</span> Everything in Free</p>
              <p className="flex items-center gap-2"><span className="text-green-600">✓</span> HTTP proxy (--http)</p>
              <p className="flex items-center gap-2"><span className="text-green-600">✓</span> Advanced token analytics</p>
              <p className="flex items-center gap-2"><span className="text-green-600">✓</span> Profile comparison reports</p>
              <p className="flex items-center gap-2"><span className="text-green-600">✓</span> Priority email support</p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full inline-flex h-11 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white hover:bg-green-700 transition-colors cursor-pointer mt-4"
            >
              Upgrade to Pro
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
