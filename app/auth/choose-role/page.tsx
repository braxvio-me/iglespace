"use client";

import { useState } from "react";
import Link from "next/link";
import { Brand, Icon } from "../../platform";
import { setDemoRole } from "@/lib/local-store";

const roles = [
  {
    key: "participant",
    label: "Participant",
    description: "Build practical skills, connect with mentors and track your development journey.",
    href: "/dashboard/participant",
    icon: "users" as const,
    tone: "role-blue",
  },
  {
    key: "mentor",
    label: "Mentor / contributor",
    description: "Share your experience, guide young people and create meaningful opportunities.",
    href: "/dashboard/mentor",
    icon: "image" as const,
    tone: "role-gold",
  },
  {
    key: "admin",
    label: "Programme admin",
    description: "Manage applications, programme delivery, measurement and impact reporting.",
    href: "/admin",
    icon: "briefcase" as const,
    tone: "role-dark",
  },
];

export default function ChooseRolePage() {
  const [selected, setSelected] = useState("participant");
  const role = roles.find((item) => item.key === selected) ?? roles[0];

  return (
    <main className="role-page">
      <div className="auth-brand"><Brand /></div>
      <section className="role-shell">
        <div className="role-heading">
          <p className="eyebrow">Choose your workspace</p>
          <h1>Where do you<br /><em>belong?</em></h1>
          <p>Choose the space that matches your role in the IGLE_SPACE Youth Mentorship Program.</p>
        </div>
        <div className="role-grid">
          {roles.map((item) => (
            <button
              className={`role-card ${item.tone} ${selected === item.key ? "selected" : ""}`}
              key={item.key}
              onClick={() => { setSelected(item.key); setDemoRole(item.key as "participant" | "mentor" | "admin"); }}
              aria-pressed={selected === item.key}
            >
              <span className="role-card-top"><span className="role-icon"><Icon name={item.icon} size={22} /></span><span className="role-check"><Icon name="check" size={14} /></span></span>
              <span className="role-card-label">{item.label}</span>
              <span className="role-card-description">{item.description}</span>
              <span className="role-card-arrow"><Icon name="arrow" size={17} /></span>
            </button>
          ))}
        </div>
        <div className="role-action">
          <Link className="button button-dark" href={role.href}>Continue as {role.label} <Icon name="arrow" size={16} /></Link>
          <p>Already have an account? <Link href="/auth/sign-in">Sign in</Link></p>
        </div>
        <p className="role-note">Admin access is restricted to authorised IGLE_SPACE programme staff.</p>
      </section>
      <Link className="auth-back" href="/">← Back to homepage</Link>
    </main>
  );
}
