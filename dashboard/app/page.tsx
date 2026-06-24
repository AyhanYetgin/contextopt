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
      {/* HERO */}
      <section className="py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Reduce AI agent token waste<br />
          by <span className="text-green-600 dark:text-green-400">60–90%</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Every MCP server adds tool definitions to your AI agent&apos;s context.
          ContextOpt filters them so only relevant tools consume tokens.
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
          <div className="relative [mask-image:linear-gradient(to_right,transparent_5%,black_15%,black_85%,transparent_95%)]">
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

      {/* THE PROBLEM */}
      <section className="py-20 border-t border-border/50">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-10">
          Every MCP server adds <span className="text-green-600 dark:text-green-400">10–30 tools</span> to your context
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              stat: "100+",
              label: "tool definitions",
              desc: "5 MCP servers can add over 100 tool schemas to every prompt your AI agent sends.",
            },
            {
              stat: "20K+",
              label: "extra tokens",
              desc: "That&apos;s 20,000+ tokens of tool metadata loaded into context on every single message.",
            },
            {
              stat: "60–90%",
              label: "reduction possible",
              desc: "ContextOpt filters tools by profile. Only the ones you actually need consume context.",
            },
          ].map((item) => (
            <div key={item.stat} className="rounded-lg border border-border/50 p-6 text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{item.stat}</p>
              <p className="text-xs text-muted-foreground mt-0.5 mb-3">{item.label}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 border-t border-border/50">
        <h2 className="text-2xl font-bold tracking-tight mb-10 text-center">How it works</h2>
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

      {/* COST CALCULATOR */}
      <section className="py-20 border-t border-border/50 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-3">See how much you can save</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-md mx-auto">
          Based on a typical developer with 50 AI sessions per day, each saving 20K tokens.
        </p>
        <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto">
          <div className="rounded-lg border border-border/50 p-6">
            <p className="text-sm text-muted-foreground mb-1">Daily savings</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$3</p>
            <p className="text-xs text-muted-foreground mt-1">50 sessions × 20K tokens</p>
          </div>
          <div className="rounded-lg border border-green-500 dark:border-green-400 p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[11px] px-3 py-0.5 rounded-full">
              You keep $71
            </div>
            <p className="text-sm text-muted-foreground mb-1">Monthly savings</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$90</p>
            <p className="text-xs text-muted-foreground mt-1">1,000 sessions · <span className="text-green-600 dark:text-green-400 font-medium">Pro $19</span></p>
          </div>
          <div className="rounded-lg border border-border/50 p-6">
            <p className="text-sm text-muted-foreground mb-1">Yearly savings</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$852</p>
            <p className="text-xs text-muted-foreground mt-1">after Pro subscription</p>
          </div>
        </div>
      </section>

      {/* FREE VS PRO */}
      <section className="py-20 border-t border-border/50">
        <h2 className="text-2xl font-bold tracking-tight mb-10 text-center">Free vs Pro</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto items-stretch">
          <div className="rounded-lg border border-border/50 p-6 flex flex-col">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="text-3xl font-bold mt-1 mb-6">$0</p>
            <ul className="space-y-3 text-sm flex-1">
              {[
                ["✓", "CLI analyze & profile"],
                ["✓", "Stdio proxy"],
                ["✓", "Basic token estimation"],
                ["✗", "HTTP proxy", "text-muted-foreground"],
                ["✗", "Advanced analytics", "text-muted-foreground"],
                ["✗", "Priority support", "text-muted-foreground"],
              ].map(([icon, text, cls]) => (
                <li key={text} className={`flex items-center gap-2 ${cls || ""}`}>
                  <span className={icon === "✓" ? "text-green-600" : "text-muted-foreground"}>{icon}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-green-500 dark:border-green-400 flex flex-col overflow-hidden">
            <div className="bg-green-600 text-white text-xs text-center py-1.5 font-medium tracking-wide">
              POPULAR
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="text-3xl font-bold mt-1 mb-6">
                $19<span className="text-base font-normal text-muted-foreground">/month</span>
              </p>
              <ul className="space-y-3 text-sm flex-1">
                {[
                  ["✓", "Everything in Free"],
                  ["✓", "HTTP proxy (--http)"],
                  ["✓", "Advanced token analytics"],
                  ["✓", "Profile comparison reports"],
                  ["✓", "Priority email support"],
                ].map(([icon, text]) => (
                  <li key={text} className="flex items-center gap-2">
                    <span className="text-green-600">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
              <Link
                href="/pro"
                className="mt-6 w-full inline-flex h-11 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white hover:bg-green-700 transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center border-t border-border/50">
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
