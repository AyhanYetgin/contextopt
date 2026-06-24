import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment successful! 🎉</h1>
      <p className="text-muted-foreground mb-2">
        Welcome to ContextOpt Pro.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        Your subscription is now active. You can start using all Pro features immediately.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white hover:bg-green-700 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
