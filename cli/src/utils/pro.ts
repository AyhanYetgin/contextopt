import Conf from "conf";

const store = new Conf<{ proToken?: string }>({
  projectName: "contextopt",
});

const DASHBOARD_URL = process.env.CONTEXTOPT_API || "http://localhost:3000";

export function getProToken(): string | null {
  return store.get("proToken") || null;
}

export function setProToken(token: string): void {
  store.set("proToken", token);
}

export function clearProToken(): void {
  store.delete("proToken");
}

export async function checkProStatus(): Promise<boolean> {
  const token = getProToken();
  if (!token) return false;

  try {
    const res = await fetch(`${DASHBOARD_URL}/api/cli-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

export async function requirePro(feature: string): Promise<void> {
  const isPro = await checkProStatus();
  if (isPro) return;

  console.error(
    `\n✖ "${feature}" requires ContextOpt Pro.\n` +
    `  Get your token at: ${DASHBOARD_URL}/pro\n`
  );
  process.exit(1);
}
