"use client";

import Link from "next/link";
import { ActionCard, DashboardPageHeader, DashboardShell, Icon, StatusPill } from "../../../platform";

export default function MentorSessionsPage() {
  return (
    <DashboardShell role="mentor">
      <DashboardPageHeader
        eyebrow="Your calendar"
        title={<>Sessions & <em>commitments.</em></>}
        description="Prepare, host and record the conversations that move participants forward."
        action={
          <Link className="button button-dark" href="/dashboard/mentor/availability">
            <Icon name="calendar" size={16} /> Set availability
          </Link>
        }
      />
      <section className="dash-panel full-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">November 2026</p>
            <h2>Upcoming sessions</h2>
          </div>
        </div>
        {[
          ["18 Nov", "Jordan A.", "Career clarity & professional positioning", "10:00 GMT"],
          ["21 Nov", "Lydia M.", "Interview preparation & confidence", "14:30 GMT"],
          ["26 Nov", "Samuel O.", "From idea to business model", "11:00 GMT"],
        ].map(([date, name, topic, time]) => (
          <div className="session-detail-row" key={name}>
            <div className="session-date">
              <strong>{date.split(" ")[0]}</strong>
              <span>{date.split(" ")[1]}</span>
            </div>
            <div>
              <strong>{name}</strong>
              <small>{topic} · {time}</small>
            </div>
            <StatusPill>Confirmed</StatusPill>
            <ActionCard
              title={`${name} session notes`}
              description={`Prepare notes and follow-up actions for ${topic}, scheduled at ${time}.`}
            >
              <span className="button button-outline">Open notes</span>
            </ActionCard>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
