"use client";

import Image from "next/image";
import { DashboardSelect } from "./DashboardSelect";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowDownToLine, ArrowRight, ArrowUpRight, BarChart3, Bell, CalendarDays, Check, ChevronDown, CreditCard, FolderKanban, House, Pause, Play, Plus, Search, Settings2, ShieldCheck, Users, Wallet, X, Zap } from "lucide-react";
import { dashboardDemo as demo, type DashboardTab, type DemoMember } from "@/config/dashboard";
import type { LandingConfig } from "@/config/landing";

type Period = keyof typeof demo.periods;
const periodOptions = Object.entries(demo.periods).map(([value, period]) => ({ value, label: period.label, description: value === "week" ? "A closer look at this week" : value === "month" ? "Track your monthly momentum" : "quarter" === value ? "See the bigger picture" : "" }));
const tabIcons = { dashboard: House, projects: FolderKanban, team: Users, analytics: BarChart3, billing: CreditCard, settings: Settings2 };
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const number = (value: number) => new Intl.NumberFormat("en-US").format(value);
const matches = (value: string, query: string) => value.toLowerCase().includes(query.trim().toLowerCase());

function RevenueChart({ period, setPeriod, increase = 0 }: { period: Period; setPeriod: (period: Period) => void; increase?: number }) {
  const [selected, setSelected] = useState(6);
  const id = useId().replaceAll(":", "");
  const data = demo.periods[period];
  const values = data.values.map((value, index) => value + (index === 6 ? increase : 0));
  const ceiling = Math.max(30000, Math.ceil(Math.max(...values) / 10000) * 10000);
  const points = values.map((value, index) => ({ x: 10 + index * 60, y: 150 - value / ceiling * 135 }));
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
  return <div className="alp_demo-card alp_revenue-card">
    <div className="alp_demo-card-heading"><h3>Revenue Overview</h3><DashboardSelect label="Revenue period" value={period} options={periodOptions} onChange={value => setPeriod(value as Period)} /></div>
    <figure className="alp_demo-chart"><figcaption className="alp_chart-readout"><span>{data.labels[selected]}</span><strong>{money(values[selected])}</strong><span>Click a point to explore</span></figcaption><div className="alp_demo-chart-body"><div className="alp_demo-chart-axis">{[1, 2 / 3, 1 / 3, 0].map(value => <span key={value}>{value === 0 ? "0" : `${Math.round(ceiling * value / 1000)}k`}</span>)}</div><div className="alp_demo-chart-plot"><svg viewBox="0 0 380 160" preserveAspectRatio="none" role="img" aria-label={`Revenue for ${data.label}: ${values.map(money).join(", ")}`}><defs><linearGradient id={`alp_fill-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--alp_color-accent)" stopOpacity=".24" /><stop offset="100%" stopColor="var(--alp_color-accent)" stopOpacity=".015" /></linearGradient></defs>{[15, 60, 105, 150].map(y => <path key={y} d={`M0 ${y}H380`} stroke="var(--alp_demo-line)" strokeWidth=".8" />)}<path d={`${path}L370 150L10 150Z`} fill={`url(#alp_fill-${id})`} className="alp_chart-area" /><path key={period} d={path} pathLength="1" fill="none" stroke="var(--alp_color-accent-heading)" strokeWidth="2" strokeLinejoin="round" className="alp_chart-line" /></svg>{points.map((point, index) => <button key={index} className="alp_chart-point" style={{ left: `${point.x / 380 * 100}%`, top: `${point.y / 160 * 100}%` }} aria-label={`${data.labels[index]} revenue ${money(values[index])}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><i /></button>)}</div></div><div className="alp_demo-chart-labels">{data.labels.map(label => <span key={label}>{label}</span>)}</div></figure>
  </div>;
}

function Sparkline({ index }: { index: number }) {
  return <svg className="alp_demo-sparkline" viewBox="0 0 90 45" aria-hidden="true"><path d="M3 39L18 25L30 29L44 17L57 23L72 10L87 3L87 44H3Z" fill="var(--alp_demo-accent-soft)" /><path d={index === 1 ? "M3 39L18 28L30 25L44 13L57 18L72 9L87 3" : "M3 39L18 25L30 29L44 17L57 23L72 10L87 3"} pathLength="1" fill="none" stroke="var(--alp_color-accent-heading)" strokeWidth="1.5" className="alp_chart-line" /><circle cx="87" cy="3" r="2" fill="var(--alp_color-accent-heading)" /></svg>;
}

export function InteractiveDashboard({ brand }: { brand: LandingConfig["brand"] }) {
  const [tab, setTab] = useState<DashboardTab>("dashboard");
  const [period, setPeriod] = useState<Period>("week");
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState(demo.projects);
  const [members, setMembers] = useState(demo.team);
  const [activity, setActivity] = useState(demo.activity);
  const [totals, setTotals] = useState(demo.totals);
  const [projectFilter, setProjectFilter] = useState("All projects");
  const [showAll, setShowAll] = useState(false);
  const [live, setLive] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [plan, setPlan] = useState("Team");
  const [workspace, setWorkspace] = useState(demo.workspace);
  const [profile, setProfile] = useState(demo.profile);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [notice, setNotice] = useState("");
  const [modal, setModal] = useState<"project" | "member">("project");
  const dialog = useRef<HTMLDialogElement>(null);
  const dashboard = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const eventCount = useRef(0);

  const addLiveEvent = useCallback(() => {
    eventCount.current += 1;
    const count = eventCount.current;
    setTotals(current => ({ users: current.users + 1, subscriptions: current.subscriptions + 1, revenue: current.revenue + 99 }));
    setActivity(current => [{ id: Date.now(), title: "New subscription created", detail: `Demo customer ${count} · Pro plan · $99`, time: "Just now", type: "subscription" as const }, ...current].slice(0, 12));
  }, []);

  // The opt-in sample event stream pauses when the dashboard or document is hidden.
  // No animation library, polling, network requests or perpetual render loop.
  useEffect(() => {
    if (!live) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let visible = false;
    const updateTimer = () => {
      if (timer) { clearInterval(timer); timer = undefined; }
      if (visible && !document.hidden) timer = setInterval(addLiveEvent, 5000);
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; updateTimer(); }, { threshold: .1 });
    if (dashboard.current) observer.observe(dashboard.current);
    document.addEventListener("visibilitychange", updateTimer);
    return () => { if (timer) clearInterval(timer); observer.disconnect(); document.removeEventListener("visibilitychange", updateTimer); };
  }, [live, addLiveEvent]);

  const changeTab = (next: DashboardTab) => { setTab(next); setNotificationsOpen(false); setNotice(""); panel.current?.scrollTo({ top: 0 }); };
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 5 : (index + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) + 6) % 6;
    changeTab(demo.tabs[next].id);
    document.getElementById(`alp_tab-${demo.tabs[next].id}`)?.focus();
  };
  const openModal = (kind: "project" | "member") => { setModal(kind); dialog.current?.showModal(); };
  const submitModal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name || (modal === "member" && !email)) return;
    if (modal === "project") {
      setProjects(current => [...current, { id: Date.now(), name, category: String(data.get("category")), progress: 0, status: "In progress", initials: ["AM"] }]);
      setProjectFilter("All projects");
      setNotice(`${name} added to the demo workspace.`);
    } else {
      if (members.some(member => member.email.toLowerCase() === email.toLowerCase())) { setNotice("This email is already in the demo team."); return; }
      setMembers(current => [...current, { id: Date.now(), name, email, role: String(data.get("role")) as DemoMember["role"], initials: name.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase() }]);
      setNotice(`${name} added locally. No invitation email is sent.`);
    }
    setQuery("");
    event.currentTarget.reset();
    dialog.current?.close();
  };
  const saveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextWorkspace = String(data.get("workspace")).trim();
    const nextProfile = String(data.get("profile")).trim();
    if (!nextWorkspace || !nextProfile) return;
    setWorkspace(nextWorkspace); setProfile(nextProfile); setNotice("Preferences saved for this demo session.");
  };
  const resetDemo = () => {
    setLive(false); setProjects(demo.projects); setMembers(demo.team); setActivity(demo.activity); setTotals(demo.totals); setProfile(demo.profile); setWorkspace(demo.workspace); setPlan("Team"); setPeriod("week"); setQuery(""); setEmailNotifications(true); setWeeklyReports(true); setShowAll(false); setProjectFilter("All projects"); setTab("dashboard"); setNotice("Demo reset to its original sample data.");
  };
  const exportInvoices = () => {
    const csv = "Invoice,Date,Amount USD,Status\n" + demo.invoices.map(invoice => `${invoice.id},\"${invoice.date}\",${invoice.amount},${invoice.status}`).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "algofort-demo-invoices.csv"; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Sample invoices exported as CSV.");
  };

  const filteredActivity = activity.filter(item => matches(`${item.title} ${item.detail}`, query));
  const visibleProjects = projects.filter(project => matches(`${project.name} ${project.category}`, query) && (projectFilter === "All projects" || project.status === projectFilter));
  const visibleMembers = members.filter(member => matches(`${member.name} ${member.email} ${member.role}`, query));
  const metrics = [{ label: "Total Users", value: number(totals.users), growth: "+12.5%", icon: Users }, { label: "Active Subscriptions", value: number(totals.subscriptions), growth: "+8.2%", icon: CalendarDays }, { label: "Monthly Revenue", value: money(totals.revenue), growth: "+14.6%", icon: Wallet }];
  const headings = { dashboard: "Welcome back", projects: "Your ideas, in motion.", team: "Great products. Great people.", analytics: "A clearer view of growth.", billing: "Simple, transparent billing.", settings: "Make it your workspace." };
  const subtitles = { dashboard: "Here’s what’s happening with your SaaS platform today.", projects: "Manage work, track progress, and keep your team moving.", team: "Give everyone the right access to do their best work.", analytics: "Explore the numbers behind a growing SaaS business.", billing: "Compare plans and export your sample invoices.", settings: "Personalize your product experience. Changes stay in this demo." };

  return <div className="alp_demo-wrap alp_reveal" id="alp_demo" ref={dashboard}>
    <div className="alp_demo-shell" role="region" aria-label="Interactive SaaS dashboard demo">
      <aside className="alp_demo-sidebar"><div className="alp_demo-logo"><Image src={brand.logo} alt={brand.name} width={139} height={23} /><span>SaaS Workspace</span></div><div className="alp_demo-tabs" role="tablist" aria-label="Dashboard sections">{demo.tabs.map((item, index) => { const Icon = tabIcons[item.id]; return <button key={item.id} id={`alp_tab-${item.id}`} role="tab" aria-selected={tab === item.id} aria-controls="alp_demo-panel" tabIndex={tab === item.id ? 0 : -1} className="alp_demo-tab" onClick={() => changeTab(item.id)} onKeyDown={event => onTabKey(event, index)}><Icon /><span>{item.label}</span>{item.id === "projects" && <small>{projects.length}</small>}</button>; })}</div><div className="alp_demo-sidebar-note"><span className="alp_demo-mini-icon"><Zap /></span><strong>Your product.<br />Your possibilities.</strong><span>Built by Algofort</span></div></aside>
      <div className="alp_demo-workspace"><div className="alp_demo-topbar"><label className="alp_demo-search"><Search /><span className="alp_sr-only">Search demo workspace</span><input type="search" placeholder="Search anything…" value={query} onChange={event => setQuery(event.target.value)} />{query && <button aria-label="Clear search" onClick={() => setQuery("")}><X /></button>}</label><div className="alp_demo-toolbar"><button className="alp_live-control" data-live={live} aria-pressed={live} onClick={() => { if (!live) addLiveEvent(); setLive(!live); }} title="Toggle a local sample event stream">{live ? <Pause /> : <Play />}<span>{live ? "Pause live" : "Run live"}</span></button><div className="alp_notifications"><button className="alp_demo-icon-button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell /><i /></button>{notificationsOpen && <div className="alp_demo-popover"><div><strong>Workspace notifications</strong><button aria-label="Close notifications" onClick={() => setNotificationsOpen(false)}><X /></button></div>{activity.slice(0, 3).map(item => <p key={item.id}><strong>{item.title}</strong><span>{item.detail}</span></p>)}</div>}</div><details className="alp_demo-profile"><summary><span className="alp_demo-avatar">{profile.split(" ").map(part => part[0]).join("").slice(0, 2)}</span><span>{profile}</span><ChevronDown /></summary><div><span>{workspace}</span><button onClick={event => { changeTab("settings"); event.currentTarget.closest("details")?.removeAttribute("open"); }}>Workspace settings</button><button onClick={event => { resetDemo(); event.currentTarget.closest("details")?.removeAttribute("open"); }}>Reset demo</button></div></details></div></div>
        <div className="alp_demo-main" ref={panel} role="tabpanel" id="alp_demo-panel" aria-labelledby={`alp_tab-${tab}`} tabIndex={0}><div className="alp_demo-panel-heading"><div><h2>{headings[tab]}{tab === "dashboard" && <span className="alp_welcome-mark"> ✦</span>}</h2><p>{subtitles[tab]}</p></div>{tab === "dashboard" || tab === "analytics" ? <DashboardSelect label="Reporting period" value={period} options={periodOptions} icon={<CalendarDays />} onChange={value => setPeriod(value as Period)} /> : tab === "projects" || tab === "team" ? <button className="alp_demo-action alp_button-3d alp_button-orange" onClick={() => openModal(tab === "projects" ? "project" : "member")}><Plus />{tab === "projects" ? "New project" : "Add member"}</button> : null}</div>
          <div className="alp_demo-view" key={tab}>
            {(tab === "dashboard" || tab === "analytics") && <><div className="alp_demo-metrics">{metrics.map((metric, index) => <div className="alp_demo-metric" key={metric.label}><span className="alp_demo-metric-icon"><metric.icon /></span><div><span>{metric.label}</span><strong key={metric.value} className="alp_metric-value">{metric.value}</strong><small><ArrowUpRight />{metric.growth}</small></div><Sparkline index={index} /></div>)}</div><div className={`alp_demo-overview-grid ${tab === "analytics" ? "alp_demo-analytics-grid" : ""}`}><RevenueChart period={period} setPeriod={setPeriod} increase={totals.revenue - demo.totals.revenue} />{tab === "dashboard" ? <div className="alp_demo-card alp_activity-card"><div className="alp_demo-card-heading"><h3>Recent Activity</h3><button className="alp_demo-text-button alp_button-3d alp_button-white" onClick={() => setShowAll(!showAll)}>{showAll ? "Show less" : "View all"}</button></div><div className="alp_demo-activities">{filteredActivity.slice(0, showAll ? 12 : 3).map(item => { const Icon = item.type === "user" ? Users : item.type === "payment" ? Wallet : CreditCard; return <div className="alp_demo-activity" key={item.id}><span className={`alp_activity-icon alp_activity-${item.type}`}><Icon /></span><span><strong>{item.title}</strong><small>{item.detail}</small></span><time>{item.time}</time></div>; })}{filteredActivity.length === 0 && <p className="alp_demo-empty">No activity matches your search.</p>}</div></div> : <div className="alp_demo-card alp_conversion-card"><div className="alp_demo-card-heading"><h3>Conversion Funnel</h3><span>{demo.periods[period].label}</span></div>{[{ name: "Visitors", value: 100, total: number(totals.users) }, { name: "Trial started", value: 64, total: number(Math.round(totals.users * .64)) }, { name: "Subscribed", value: 32, total: number(totals.subscriptions) }].map(item => <div className="alp_funnel-row" key={item.name}><span>{item.name}<strong>{item.total}</strong></span><div><i style={{ width: `${item.value}%` }} /></div></div>)}</div>}</div></>}
            {tab === "projects" && <><div className="alp_demo-filterbar"><span>{visibleProjects.length} projects</span><DashboardSelect label="Project status" value={projectFilter} options={["All projects", "In progress", "Complete"].map(value => ({ value, label: value }))} onChange={setProjectFilter} /></div><div className="alp_demo-project-grid">{visibleProjects.map(project => <article className="alp_demo-card alp_demo-project" key={project.id}><div><span className="alp_demo-mini-icon"><FolderKanban /></span><span className="alp_demo-status">{project.status}</span></div><h3>{project.name}</h3><p>{project.category}</p><div className="alp_demo-progress-label"><span>Progress</span><strong>{project.progress}%</strong></div><div className="alp_demo-progress"><i style={{ width: `${project.progress}%` }} /></div><div className="alp_demo-project-bottom"><span className="alp_demo-avatars">{project.initials.map(person => <i key={person}>{person}</i>)}</span><button className="alp_demo-text-button alp_button-3d alp_button-white" onClick={() => setProjects(current => current.map(item => item.id === project.id ? { ...item, status: item.status === "Complete" ? "In progress" : "Complete", progress: item.status === "Complete" ? 0 : 100 } : item))}>{project.status === "Complete" ? "Reopen" : "Mark Complete"}<Check /></button></div></article>)}</div>{visibleProjects.length === 0 && <p className="alp_demo-empty">No projects found. Try another filter or create a project.</p>}</>}
            {tab === "team" && <div className="alp_demo-card alp_demo-table-wrap"><table className="alp_demo-table"><thead><tr><th>Team Member</th><th>Role</th><th>Status</th></tr></thead><tbody>{visibleMembers.map(member => <tr key={member.id}><td><span className="alp_member-cell"><span className="alp_demo-avatar">{member.initials}</span><span><strong>{member.name}</strong><small>{member.email}</small></span></span></td><td><select aria-label={`Role for ${member.name}`} value={member.role} onChange={event => setMembers(current => current.map(item => item.id === member.id ? { ...item, role: event.target.value as DemoMember["role"] } : item))}><option>Admin</option><option>Editor</option><option>Viewer</option></select></td><td><span className="alp_demo-status">Active</span></td></tr>)}</tbody></table>{visibleMembers.length === 0 && <p className="alp_demo-empty">No team members match your search.</p>}</div>}
            {tab === "billing" && <><div className="alp_demo-plan-grid">{demo.plans.map(item => <div className="alp_demo-card alp_demo-plan" data-current={plan === item.name} key={item.name}><div><h3>{item.name}</h3>{plan === item.name && <span className="alp_demo-status">Current plan</span>}</div><p>{item.detail}</p><strong>{money(item.price)}<small>/ month</small></strong><button className="alp_demo-action alp_button-3d alp_button-orange" disabled={plan === item.name} onClick={() => { setPlan(item.name); setNotice(`${item.name} plan selected in the demo. No payment is taken.`); }}>{plan === item.name ? "Selected" : "Try this plan"}{plan === item.name ? <Check /> : <ArrowRight />}</button></div>)}</div><div className="alp_demo-card alp_demo-invoices"><div className="alp_demo-card-heading"><h3>Invoice History</h3><button className="alp_demo-text-button alp_button-3d alp_button-white" onClick={exportInvoices}><ArrowDownToLine />Export CSV</button></div><div className="alp_demo-table-wrap"><table className="alp_demo-table"><thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{demo.invoices.filter(invoice => matches(`${invoice.id} ${invoice.date} ${invoice.status}`, query)).map(invoice => <tr key={invoice.id}><td>{invoice.id}</td><td>{invoice.date}</td><td>{money(invoice.amount)}</td><td><span className="alp_demo-status">{invoice.status}</span></td></tr>)}</tbody></table></div></div></>}
            {tab === "settings" && <form className="alp_demo-card alp_demo-settings" onSubmit={saveSettings}><div className="alp_demo-settings-fields"><label>Workspace Name<input name="workspace" defaultValue={workspace} required maxLength={40} /></label><label>Your Name<input name="profile" defaultValue={profile} required maxLength={30} /></label></div><div className="alp_demo-setting-row"><span><strong>Email notifications</strong><small>Stay informed about activity in your workspace.</small></span><button type="button" role="switch" aria-checked={emailNotifications} aria-label="Email notifications" className="alp_demo-switch" onClick={() => setEmailNotifications(!emailNotifications)}><i /></button></div><div className="alp_demo-setting-row"><span><strong>Weekly reports</strong><small>A summary of your product’s performance.</small></span><button type="button" role="switch" aria-checked={weeklyReports} aria-label="Weekly reports" className="alp_demo-switch" onClick={() => setWeeklyReports(!weeklyReports)}><i /></button></div><div className="alp_demo-settings-bottom"><span><ShieldCheck />Preferences stay in this session</span><button className="alp_demo-action alp_button-3d alp_button-orange" type="submit">Save Changes<Check /></button></div></form>}
          </div>
          <p className="alp_demo-notice" role="status">{notice}</p>
        </div>
      </div>
    </div>
    <div className="alp_demo-caption"><span><span className="alp_caption-dot" />Interactive product demo · Sample data</span><span>Click the tabs. Explore the possibilities.<ArrowUpRight /></span></div>
    <dialog ref={dialog} className="alp_demo-dialog" aria-labelledby="alp_demo-dialog-title" onClick={event => { if (event.target === dialog.current) { const rect = dialog.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current.close(); } }}><div className="alp_dialog-heading"><h2 id="alp_demo-dialog-title">{modal === "project" ? "Create a project" : "Add a team member"}</h2><button aria-label="Close dialog" onClick={() => dialog.current?.close()}><X /></button></div><p>{modal === "project" ? "Turn the next idea into a plan." : "Add a sample member to your demo workspace."}</p><form onSubmit={submitModal}><label>{modal === "project" ? "Project name" : "Full name"}<input key={modal} name="name" placeholder={modal === "project" ? "e.g. Subscription platform" : "e.g. Casey Taylor"} required minLength={2} maxLength={60} /></label>{modal === "member" ? <><label>Email address<input name="email" type="email" placeholder="casey@example.com" required /></label><label>Role<select name="role"><option>Editor</option><option>Viewer</option><option>Admin</option></select></label></> : <label>Category<select name="category"><option>Engineering</option><option>Product design</option><option>User experience</option></select></label>}<div className="alp_dialog-actions"><button className="alp_button-3d alp_button-white" type="button" onClick={() => dialog.current?.close()}>Cancel</button><button className="alp_demo-action alp_button-3d alp_button-orange" type="submit">{modal === "project" ? "Create project" : "Add member"}<Plus /></button></div></form></dialog>
  </div>;
}

