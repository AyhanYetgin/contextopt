import Link from "next/link";
import Image from "next/image";

const tools = [
  { src: "/claudecode-color-light.png", label: "Claude Code" },
  { src: "/cursor.png", label: "Cursor" },
  { src: "/windsurf.png", label: "Windsurf" },
  { src: "/antigravity.png", label: "Antigravity" },
  { src: "/opencode-dark.svg", label: "OpenCode", dark: "/opencode-light.svg" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Reduce AI agent token waste<br />
          by <span className="text-green-600 dark:text-green-400">60–90%</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto">
          ContextOpt sits between your AI coding agent and its MCP servers, 
          intelligently filtering tools so only relevant ones consume context.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 dark:bg-green-500 px-6 text-sm font-medium text-white shadow-sm hover:bg-green-700 dark:hover:bg-green-400 transition-colors"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/AyhanYetgin/contextopt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background dark:bg-white/10 dark:text-white px-6 text-sm font-medium shadow-sm hover:bg-secondary dark:hover:bg-white/20 transition-colors"
          >
            View on GitHub →
          </a>
        </div>
        <div className="mt-10">
          <pre className="inline-block text-left bg-secondary text-sm px-6 py-4 rounded-lg border border-border/50">
            <code><span className="text-muted-foreground">$</span> npx contextopt analyze</code>
          </pre>
        </div>
      </section>

      {/* Works with — infinite scroll */}
      <section className="py-12 border-t border-border/50 text-center overflow-hidden">
        <p className="text-xs text-muted-foreground mb-6 uppercase tracking-widest">Works with</p>
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="relative [mask-image:linear-gradient(to_right,transparent_5%,black_15%,black_85%,transparent_95%)]"
          >
            <div className="flex gap-12 md:gap-20 items-center animate-scroll w-max">
            {[...Array(2)].map((_, group) =>
              tools.map((tool) => (
                <div key={`${group}-${tool.label}`} className="flex flex-col items-center gap-2 shrink-0">
                  {tool.dark ? (
                    <>
                      <Image src={tool.src} alt={tool.label} width={28} height={28} className="opacity-60 dark:hidden" />
                      <Image src={tool.dark} alt={tool.label} width={28} height={28} className="hidden dark:block opacity-60" />
                    </>
                  ) : (
                    <Image src={tool.src} alt={tool.label} width={28} height={28} className="opacity-60 dark:opacity-50" />
                  )}
                  <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{tool.label}</span>
                </div>
              ))
            )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border/50">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { num: "1", title: "Profile-Based Filtering", desc: "Only expose the tools you need. Switch between coding, debugging, and research profiles instantly." },
            { num: "2", title: "Lazy Loading", desc: "MCP servers only start when their tools are first needed. No wasted memory or initialization time." },
            { num: "3", title: "Token Analytics", desc: "See exactly how many tokens each server consumes and how much you save per session." },
          ].map((f) => (
            <div key={f.num} className="rounded-lg border border-border/50 p-6">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/40 flex items-center justify-center mb-4">
                <span className="text-green-600 dark:text-green-400 text-lg font-bold">{f.num}</span>
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-t border-border/50">
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">How it works</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {[
            { step: "1", title: "Analyze your config", cmd: "$ npx contextopt analyze" },
            { step: "2", title: "Pick a profile", cmd: "$ npx contextopt profile -s coding" },
            { step: "3", title: "Start the proxy", cmd: "$ npx contextopt start --profile coding" },
            { step: "4", title: "Connect your AI agent", cmd: "$ npx contextopt start --http --port 3001" },
          ].map((h) => (
            <div key={h.step} className="rounded-lg border border-border/50 p-5">
              <p className="text-xs text-muted-foreground mb-2 font-mono">{h.step}</p>
              <h3 className="text-sm font-semibold mb-1">{h.title}</h3>
              <pre className="text-xs bg-secondary p-3 rounded mt-2 overflow-x-auto"><code>{h.cmd}</code></pre>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 text-center border-t border-border/50">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          Ready to optimize your context?
        </h2>
        <pre className="inline-block text-left bg-secondary text-sm px-6 py-4 rounded-lg border border-border/50">
          <code><span className="text-muted-foreground">$</span> npx contextopt analyze</code>
        </pre>
      </section>
    </div>
  );
}
