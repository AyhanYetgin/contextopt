import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = "https://contextopt.vercel.app";

export const metadata: Metadata = {
  title: "ContextOpt — MCP Context Optimizer",
  description: "Reduce AI agent token waste by 60–90%. ContextOpt filters MCP tools by profile so only relevant ones consume tokens.",
  openGraph: {
    title: "ContextOpt — MCP Context Optimizer",
    description: "Reduce AI agent token waste by 60–90%. Profile-based MCP tool filtering for Claude Code, Cursor, and Windsurf.",
    url: siteUrl,
    siteName: "ContextOpt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextOpt — MCP Context Optimizer",
    description: "Reduce AI agent token waste by 60–90%. Profile-based MCP tool filtering.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
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
          <Nav />
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
    </ClerkProvider>
  );
}
