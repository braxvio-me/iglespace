"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { languages, useLanguage } from "../lib/i18n";

export type IconName = "arrow" | "book" | "briefcase" | "calendar" | "check" | "chevron" | "close" | "download" | "globe" | "image" | "menu" | "search" | "users";

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    briefcase: <><rect width="18" height="14" x="3" y="6" rx="2" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 11h18" /></>,
    calendar: <><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5M4 21h16" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    image: <><rect width="18" height="16" x="3" y="4" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m21 15-5-5L5 20" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export function Brand() {
  return <Link className="brand" href="/"><img src="/iglespace-logo.png" alt="IgleSpace" /></Link>;
}

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  return <nav className="nav-shell" aria-label="Main navigation">
    <Brand />
    <div className={`nav-links ${open ? "is-open" : ""}`}>
      <Link href="/programme" onClick={() => setOpen(false)}>{t("programme")}</Link>
      <Link href="/opportunities" onClick={() => setOpen(false)}>{t("opportunities")}</Link>
      <Link href="/about" onClick={() => setOpen(false)}>{t("about")}</Link>
      <Link href="/mentors" onClick={() => setOpen(false)}>{t("contributors")}</Link>
      <Link href="/community" onClick={() => setOpen(false)}>{t("community")}</Link>
      <Link href="/partners" onClick={() => setOpen(false)}>{t("partner")}</Link>
      <div className="mobile-nav-actions"><label className="language-picker"><span className="sr-only">Language</span><select value={language} onChange={(event) => setLanguage(event.target.value as typeof language)} aria-label="Language">{languages.map((option) => <option key={option}>{option}</option>)}</select></label><Link href="/auth/sign-in">{t("signIn")}</Link><Link className="button button-dark" href="/apply">{t("apply")} <Icon name="arrow" size={16} /></Link></div>
    </div>
    <div className="nav-actions"><label className="language-picker"><span className="sr-only">Language</span><select value={language} onChange={(event) => setLanguage(event.target.value as typeof language)} aria-label="Language">{languages.map((option) => <option key={option}>{option}</option>)}</select></label><Link href="/auth/sign-in">{t("signIn")}</Link><Link className="button button-dark" href="/apply">{t("apply")} <Icon name="arrow" size={16} /></Link></div>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}><Icon name={open ? "close" : "menu"} /></button>
  </nav>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return <section className="page-intro"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>{children && <div className="page-intro-copy">{children}</div>}</section>;
}

export function Footer() {
  const { t } = useLanguage();
  return <footer className="footer"><div className="footer-top"><Brand /><p>{t("footerText")}<br /><a className="footer-email" href="mailto:iglespace@gmail.com">iglespace@gmail.com</a></p><div className="footer-links"><Link href="/about">{t("about")}</Link><Link href="/programme">{t("programme")}</Link><Link href="/opportunities">{t("opportunities")}</Link><Link href="/mentors">{t("contributors")}</Link><Link href="/partners">{t("partner")}</Link><Link href="/community">{t("community")}</Link><Link href="/auth/sign-in">{t("signIn")}</Link></div></div><div className="footer-bottom"><span>© 2026 IgleSpace · Youth Mentorship Program</span><span><Link href="/auth/sign-in">{t("signIn")}</Link><Link href="/apply">{t("apply")}</Link></span></div></footer>;
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return <><PublicNav />{children}<Footer /></>;
}

export function DashboardShell({ role, children }: { role: "participant" | "mentor" | "admin"; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = role === "participant" ? [["/dashboard/participant", "Overview"], ["/mentors", "Find a mentor"], ["/dashboard/participant/sessions", "My sessions"], ["/dashboard/participant/book", "Book a session"], ["/dashboard/participant/goals", "Goals & progress"], ["/dashboard/participant/assessments", "Assessments"], ["/dashboard/participant/messages", "Messages"]] : role === "mentor" ? [["/dashboard/mentor", "Overview"], ["/dashboard/mentor/mentees", "My mentees"], ["/dashboard/mentor/requests", "Requests"], ["/dashboard/mentor/sessions", "Sessions"], ["/dashboard/mentor/availability", "Availability"]] : [["/admin", "Overview"], ["/admin/participants", "Participants"], ["/admin/applications", "Applications"], ["/admin/sessions", "Sessions"], ["/admin/mentors", "Mentor ratings"], ["/admin/reports", "Impact reports"]];
  const activeLink = links.find(([href]) => href === pathname)
    ?? [...links].sort(([first], [second]) => second.length - first.length).find(([href]) => pathname.startsWith(`${href}/`))
    ?? links[0];
  const roleLabel = role === "admin" ? "Programme admin" : role === "mentor" ? "Mentor workspace" : "Participant workspace";
  return <div className="dashboard-app"><aside className={`dashboard-sidebar ${open ? "is-open" : ""}`}><Brand /><div className="dashboard-role">{roleLabel}</div><nav>{links.map(([href, label], index) => <Link className={href === activeLink[0] ? "active" : ""} href={href} key={label}><span className="dashboard-nav-icon"><Icon name={index === 0 ? "image" : index === 1 ? "users" : index === 2 ? "calendar" : index === 3 ? "book" : "globe"} size={17} /></span>{label}</Link>)}</nav><div className="sidebar-bottom"><Link href="/">Back to site</Link><Link href="/auth/sign-in">Sign out</Link></div></aside><div className="dashboard-main"><header className="dashboard-topbar"><button className="menu-toggle dashboard-menu" onClick={() => setOpen(!open)} aria-label="Open dashboard menu"><Icon name="menu" /></button><div className="dashboard-breadcrumb">IgleSpace / <strong>{activeLink[1]}</strong></div><div className="dashboard-user"><span className="online-dot" />{roleLabel}<span className="user-avatar">{role === "admin" ? "AD" : role === "mentor" ? "ME" : "PA"}</span></div></header><main className="dashboard-content">{children}</main></div></div>;
}

export function Stat({ value, label, tone = "" }: { value: string; label: string; tone?: string }) {
  return <div className={`stat-card ${tone}`}><span className="stat-value">{value}</span><span className="stat-label">{label}</span></div>;
}

export function StatusPill({ children, tone = "green" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status-pill ${tone}`}><span />{children}</span>;
}

export function DashboardPageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: React.ReactNode; description: string; action?: React.ReactNode }) {
  return <div className="dashboard-page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

export function ActionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <><button className="action-card-trigger" type="button" onClick={() => setOpen(true)}>{children}</button>{open && <div className="action-card-backdrop" role="presentation" onClick={() => setOpen(false)}><section className="action-card" role="dialog" aria-modal="true" aria-labelledby={`action-${title}`} onClick={(event) => event.stopPropagation()}><button className="action-card-close" type="button" aria-label="Close card" onClick={() => setOpen(false)}>×</button><p className="eyebrow">Workspace update</p><h2 id={`action-${title}`}>{title}</h2><p>{description}</p><button className="button button-dark" type="button" onClick={() => setOpen(false)}>Done <Icon name="check" size={16} /></button></section></div>}</>;
}

export function DashboardTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className="dashboard-table"><div className="dashboard-table-row dashboard-table-head">{headers.map((header) => <span key={header}>{header}</span>)}</div>{rows.map((row) => <div className="dashboard-table-row" key={row.join("-")}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>;
}
