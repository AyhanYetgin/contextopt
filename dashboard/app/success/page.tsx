"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function SuccessPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const isPro = (user?.publicMetadata?.plan as string) === "pro";

  useEffect(() => {
    if (!isLoaded) return;
    if (isPro) {
      const t = setTimeout(() => router.push("/dashboard"), 2000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => window.location.reload(), 3000);
    return () => clearTimeout(t);
  }, [isLoaded, isPro, router]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment successful! 🎉</h1>
      {isLoaded && isPro ? (
        <>
          <p className="text-muted-foreground mb-2">
            Welcome to ContextOpt Pro.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Redirecting to dashboard…
          </p>
        </>
      ) : (
        <>
          <p className="text-muted-foreground mb-2">
            Your Pro plan is being activated…
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            This should only take a few seconds.
          </p>
        </>
      )}
      <a
        href="/dashboard"
        className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white hover:bg-green-700 transition-colors"
      >
        Go to Dashboard
      </a>
    </div>
  );
}
