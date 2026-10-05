export type DashboardTab = "dashboard" | "projects" | "team" | "analytics" | "billing" | "settings";
export type DemoProject = { id: number; name: string; category: string; progress: number; status: "In progress" | "Complete"; initials: string[] };
export type DemoMember = { id: number; name: string; email: string; role: "Admin" | "Editor" | "Viewer"; initials: string };
export type DemoActivity = { id: number; title: string; detail: string; time: string; type: "user" | "subscription" | "payment" };

// Sample data for a working product demo, not agency/client results.
export const dashboardDemo = {
  workspace: "Algofort Workspace", profile: "Alex Morgan", snapshot: "Oct 2, 2026",
  tabs: [{ id: "dashboard", label: "Dashboard" }, { id: "projects", label: "Projects" }, { id: "team", label: "Team" }, { id: "analytics", label: "Analytics" }, { id: "billing", label: "Billing" }, { id: "settings", label: "Settings" }] as { id: DashboardTab; label: string }[],
  totals: { users: 12482, subscriptions: 3248, revenue: 24780 },
  periods: {
    week: { label: "Last 7 days", labels: ["Sep 26", "Sep 27", "Sep 28", "Sep 29", "Sep 30", "Oct 1", "Oct 2"], values: [6500, 10800, 10400, 19800, 12600, 20400, 26700] },
    month: { label: "Last 30 days", labels: ["Sep 3", "Sep 8", "Sep 13", "Sep 18", "Sep 23", "Sep 28", "Oct 2"], values: [8200, 13000, 11000, 16700, 21400, 19000, 29000] },
    quarter: { label: "Last 90 days", labels: ["Jul 5", "Jul 20", "Aug 4", "Aug 19", "Sep 3", "Sep 18", "Oct 2"], values: [3800, 7000, 13500, 11000, 17600, 22300, 28300] },
  },
  projects: [
    { id: 1, name: "Analytics dashboard", category: "Product design", progress: 72, status: "In progress", initials: ["AM", "SL", "MC"] },
    { id: 2, name: "Customer onboarding", category: "User experience", progress: 48, status: "In progress", initials: ["SL", "JW"] },
    { id: 3, name: "API integration", category: "Engineering", progress: 100, status: "Complete", initials: ["MC", "AM"] },
  ] as DemoProject[],
  team: [
    { id: 1, name: "Alex Morgan", email: "alex@example.com", role: "Admin", initials: "AM" },
    { id: 2, name: "Sarah Lee", email: "sarah@example.com", role: "Editor", initials: "SL" },
    { id: 3, name: "Marcus Chen", email: "marcus@example.com", role: "Editor", initials: "MC" },
    { id: 4, name: "Jamie Wilson", email: "jamie@example.com", role: "Viewer", initials: "JW" },
  ] as DemoMember[],
  activity: [
    { id: 1, title: "New user registered", detail: "jordan@example.com", time: "2m ago", type: "user" },
    { id: 2, title: "Subscription upgraded", detail: "Pro plan · $99/month", time: "12m ago", type: "subscription" },
    { id: 3, title: "Payment received", detail: "$199.00 · Invoice #1245", time: "28m ago", type: "payment" },
    { id: 4, title: "New user registered", detail: "taylor@example.com", time: "42m ago", type: "user" },
    { id: 5, title: "Payment received", detail: "$99.00 · Invoice #1244", time: "1h ago", type: "payment" },
  ] as DemoActivity[],
  invoices: [{ id: "INV-1245", date: "Oct 2, 2026", amount: 199, status: "Paid" }, { id: "INV-1244", date: "Sep 2, 2026", amount: 199, status: "Paid" }, { id: "INV-1243", date: "Aug 2, 2026", amount: 199, status: "Paid" }],
  plans: [{ name: "Starter", price: 49, detail: "For your first customers" }, { name: "Pro", price: 99, detail: "For a growing product" }, { name: "Team", price: 199, detail: "For teams building together" }],
};
