import type { ReactNode, CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, BarChart3, Bell, Check, ChevronDown, CreditCard, Ellipsis, House, Layers3, Plus, Radio, Settings2, Signal, Users, Wifi, Zap } from "lucide-react";
import type { SaaSLandingConfig } from "@/config/saas";

type Product = SaaSLandingConfig["product"];

function DeviceFrame({ position, children }: { position: "left" | "center" | "right"; children: ReactNode }) {
  return <div className={`alp_saas-device alp_saas-device-${position}`}>
    <span className="alp_device-button alp_device-button-volume" />
    <span className="alp_device-button alp_device-button-power" />
    <div className="alp_device-bezel">
      <div className="alp_device-screen">
        <div className="alp_device-status"><span>9:41</span><div className="alp_device-island"><i /></div><span className="alp_device-signals"><Signal /><Wifi /><i /></span></div>
        {children}
        <span className="alp_device-home" />
      </div>
    </div>
  </div>;
}

function AppHeader({ product }: { product: Product }) {
  return <div className="alp_app-header"><span className="alp_app-brand"><span className="alp_app-brand-icon"><Layers3 /></span>{product.name}<span className="alp_app-brand-dot">.</span></span><span className="alp_app-bell"><Bell /><i /></span></div>;
}

function AppNavigation({ active }: { active: "overview" | "projects" | "workflows" }) {
  return <div className="alp_app-navigation"><span data-active={active === "overview"}><House /><small>Overview</small></span><span data-active={active === "projects"}><Layers3 /><small>Projects</small></span><span data-active={active === "workflows"}><Zap /><small>Workflows</small></span><span><Settings2 /><small>Settings</small></span></div>;
}

function OverviewScreen({ product }: { product: Product }) {
  const overview = product.overview;
  return <><AppHeader product={product} /><div className="alp_app-content"><p className="alp_app-greeting">{overview.greeting}<span className="alp_app-avatar">A</span></p><h2 className="alp_app-title">{overview.title}</h2>
    <div className="alp_revenue-panel"><div className="alp_revenue-label">{overview.revenueLabel}<Ellipsis /></div><strong>{overview.revenue}</strong><span className="alp_revenue-trend"><ArrowUpRight />{overview.revenueChange}</span>
      <div className="alp_revenue-chart"><div className="alp_revenue-axis"><span>30k</span><span>20k</span><span>10k</span></div><svg viewBox="0 0 210 92" preserveAspectRatio="none"><defs><linearGradient id="alp_saas-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--alp_color-accent)" stopOpacity=".2" /><stop offset="100%" stopColor="var(--alp_color-accent)" stopOpacity="0" /></linearGradient></defs><path d="M0 17H210M0 47H210M0 77H210" stroke="var(--alp_color-line)" strokeDasharray="3 4" strokeWidth=".6" /><path d="M0 76C10 72 15 83 27 65S42 75 57 56S74 67 91 43S108 55 122 34S139 49 153 24S171 39 185 17S200 19 210 8V92H0Z" fill="url(#alp_saas-chart-fill)" /><path d="M0 76C10 72 15 83 27 65S42 75 57 56S74 67 91 43S108 55 122 34S139 49 153 24S171 39 185 17S200 19 210 8" stroke="var(--alp_color-accent)" strokeWidth="2.5" fill="none" /><circle cx="210" cy="8" r="3" fill="var(--alp_color-accent)" /></svg></div><div className="alp_revenue-dates"><span>01 Jun</span><span>15 Jun</span><span>30 Jun</span></div>
    </div>
    <div className="alp_saas-metrics">{overview.metrics.map((metric, index) => <div key={metric.label}><span className="alp_saas-metric-icon">{index === 0 ? <Users /> : <CreditCard />}</span><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.trend}<ArrowUpRight /></small></div>)}</div>
    <div className="alp_app-section-heading"><strong>{overview.activityTitle}</strong><span>View all<ArrowUpRight /></span></div><div className="alp_payments">{overview.payments.map(payment => <div className="alp_payment" key={payment.name}><span className="alp_app-avatar">{payment.initials}</span><span><strong>{payment.name}</strong><small>{payment.plan}</small></span><b>{payment.amount}</b></div>)}</div>
    </div><AppNavigation active="overview" /></>;
}

function ProjectsScreen({ product }: { product: Product }) {
  const projects = product.projects;
  return <><AppHeader product={product} /><div className="alp_app-content"><span className="alp_workspace-label">{product.workspace}<ChevronDown /></span><h2 className="alp_app-title">{projects.title}</h2><p className="alp_app-subtitle">{projects.subtitle}</p><div className="alp_project-toolbar"><span>Projects <i>03</i></span><span><Plus />New project</span></div><div className="alp_project-tabs">{projects.tabs.map((tab,index)=><span data-active={index===0} key={tab}>{tab}</span>)}</div>
    <div className="alp_saas-projects">{projects.items.map((project,index)=><div className="alp_saas-project" key={project.title}><div className="alp_project-category"><span><span className="alp_project-symbol">{index===0 ? <BarChart3 /> : index===1 ? <Users /> : <Layers3 />}</span>{project.category}</span><Ellipsis /></div><h3>{project.title}</h3><div className="alp_project-progress-label"><span>{project.status}</span><span>{project.progress}%</span></div><div className="alp_project-progress" style={{"--alp_progress":`${project.progress}%`} as CSSProperties}><i /></div><div className="alp_project-people"><span>{project.people.map(person=><i key={person}>{person}</i>)}</span><span>{project.progress===100 ? <Check /> : <span className="alp_project-live-dot" />}{project.progress===100 ? "Done" : "On track"}</span></div></div>)}</div>
    </div><AppNavigation active="projects" /></>;
}

function WorkflowScreen({ product }: { product: Product }) {
  const automation = product.automation;
  return <><AppHeader product={product} /><div className="alp_app-content"><span className="alp_workspace-label">{product.workspace}<ChevronDown /></span><h2 className="alp_app-title">{automation.title}</h2><p className="alp_app-subtitle">{automation.subtitle}</p><div className="alp_workflow-heading"><strong>{automation.workflowName}</strong><span><Radio />Live</span></div><div className="alp_workflow">{automation.steps.map((step,index)=><div className="alp_workflow-item" key={step.title}><div className="alp_workflow-step"><span className="alp_workflow-icon">{index===0 ? <Users /> : index===1 ? <Layers3 /> : <Bell />}</span><span><strong>{step.title}</strong><small>{step.detail}</small></span><Check /></div>{index < automation.steps.length-1 && <div className="alp_workflow-connector"><ArrowDown /></div>}</div>)}</div><div className="alp_workflow-success"><Check /><span>All systems working beautifully.</span></div><div className="alp_app-section-heading"><strong>More automations</strong><Plus /></div><div className="alp_automation-list">{automation.items.map(item=><div key={item.title}><span className="alp_automation-icon"><Zap /></span><span><strong>{item.title}</strong><small>{item.detail}</small></span><i className="alp_app-switch" /></div>)}</div>
    </div><AppNavigation active="workflows" /></>;
}

export function SaaSDeviceShowcase({ product }: { product: Product }) {
  return <figure className="alp_saas-showcase alp_reveal" aria-label="Three dimensional mobile SaaS interface concept showing project management, a business dashboard and automated workflows">
    <div className="alp_saas-device-stage" aria-hidden="true">
      <DeviceFrame position="left"><ProjectsScreen product={product} /></DeviceFrame>
      <DeviceFrame position="right"><WorkflowScreen product={product} /></DeviceFrame>
      <DeviceFrame position="center"><OverviewScreen product={product} /></DeviceFrame>
    </div>
    <figcaption className="alp_saas-showcase-caption">{product.caption}</figcaption>
  </figure>;
}
