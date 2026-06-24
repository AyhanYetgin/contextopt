export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p><strong>1.</strong> ContextOpt collects minimal data required to provide the service: email address, GitHub username (via Clerk auth), and MCP configuration data.</p>
        <p><strong>2.</strong> We do not sell or share personal data with third parties.</p>
        <p><strong>3.</strong> Payment processing is handled by our payment provider. We do not store credit card information.</p>
        <p><strong>4.</strong> Users can request deletion of their account and associated data at any time.</p>
        <p><strong>5.</strong> We use standard security measures to protect user data.</p>
        <p>Last updated: June 2026</p>
      </div>
    </div>
  );
}
