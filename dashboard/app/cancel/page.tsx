import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment cancelled</h1>
      <p className="text-muted-foreground mb-2">
        Your payment was cancelled. No charges were made.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        You can continue using the Free plan or try upgrading again later.
      </p>
      <Link
        href="/pro"
        className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white hover:bg-green-700 transition-colors"
      >
        Try Again
      </Link>
    </div>
  );
}
