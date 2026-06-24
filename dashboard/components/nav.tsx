"use client";

import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  const { isSignedIn, isLoaded } = useUser();

  return (
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
          {isLoaded && !isSignedIn && (
            <SignInButton mode="redirect">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Sign in
              </button>
            </SignInButton>
          )}
          {isLoaded && isSignedIn && <UserButton />}
        </div>
      </div>
    </nav>
  );
}
