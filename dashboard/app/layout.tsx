import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ContextOpt — MCP Context Optimizer",
  description: "Reduce AI agent token waste by 60–90%",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <nav className="border-b border-border/50">
          <div className="mx-auto max-w-5xl flex h-14 items-center gap-8 px-6">
            <Link href="/" className="font-semibold text-base tracking-tight">
              contextopt
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <div className="ml-auto flex items-center gap-4 text-sm">
              <a href="https://github.com/AyhanYetgin/contextopt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="https://www.npmjs.com/package/contextopt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                npm
              </a>
              <ThemeToggle />
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
          <div className="mx-auto max-w-5xl px-6">
            Built by{" "}
            <a href="https://github.com/AyhanYetgin" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
              Ayhan Yetgin
            </a>
            {" · "}MIT License{" · "}
            <a href="https://github.com/AyhanYetgin/contextopt" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
              Source
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
