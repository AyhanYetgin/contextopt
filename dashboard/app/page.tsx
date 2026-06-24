import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col items-center gap-8 max-w-2xl text-center">
        <h1 className="text-5xl font-bold tracking-tight">ContextOpt</h1>
        <p className="text-xl text-muted-foreground">
          Reduce your AI agent token waste by <strong>60–90%</strong>
        </p>
        <p className="text-muted-foreground max-w-md">
          ContextOpt optimizes MCP tool configurations for Claude Code, Cursor, and Windsurf.
          Stop wasting tokens on tools you don&apos;t need.
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Dashboard
          </Link>
          <a
            href="https://github.com/AyhanYetgin/contextopt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
          >
            GitHub →
          </a>
        </div>
      </main>
    </div>
  );
}
