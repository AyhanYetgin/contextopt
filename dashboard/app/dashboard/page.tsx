import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Token usage analytics and MCP optimization overview
        </p>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Tokens Saved</CardDescription>
              <CardTitle className="text-3xl">—</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Connect your MCP config to see data</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Profile</CardDescription>
              <CardTitle className="text-3xl">default</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Run CLI to switch profiles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Cost Saved</CardDescription>
              <CardTitle className="text-3xl">$—</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Per session estimate</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Install the CLI and run an analysis to populate this dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`npx contextopt analyze
npx contextopt profile -l
npx contextopt start --profile coding`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
