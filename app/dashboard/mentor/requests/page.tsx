"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardPageHeader, DashboardShell, Icon, StatusPill } from "../../../platform";

export default function MentorRequestsPage() {
  const [requests, setRequests] = useState([
    { name: "Jordan A.", profileId: "jordan" },
    { name: "Lydia M.", profileId: "lydia" },
  ]);

  function removeRequest(name: string) {
    setRequests((current) => current.filter((request) => request.name !== name));
  }

  return (
    <DashboardShell role="mentor">
      <DashboardPageHeader
        eyebrow="Mentorship matching"
        title={<>Requests that need<br /><em>your experience.</em></>}
        description="Review a participant’s goals before deciding whether you can support their next step."
      />
      <section className="dash-panel full-panel">
        {requests.length ? requests.map(({ name, profileId }) => (
          <div className="request-detail" key={name}>
            <span className="user-avatar">{name.charAt(0)}</span>
            <div>
              <div className="request-meta">
                <strong>{name}</strong>
                <StatusPill tone="amber">New request</StatusPill>
              </div>
              <h3>{name === "Jordan A." ? "Career clarity & professional positioning" : "Interview preparation & confidence"}</h3>
              <p>{name === "Jordan A." ? "I want to understand how to present my skills and build a portfolio that reflects where I’m going." : "I’m preparing for my first formal interview and need an honest practice partner."}</p>
              <div className="request-actions">
                <button className="button button-dark" type="button" onClick={() => removeRequest(name)}>Accept request</button>
                <button className="button button-outline" type="button" onClick={() => removeRequest(name)}>Pass for now</button>
                <Link className="text-link" href={`/dashboard/mentor/mentees/${profileId}`}>
                  View profile <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>
          </div>
        )) : (
          <div className="empty-state">
            <Icon name="check" size={24} />
            <h3>You&apos;re all caught up</h3>
            <p>New mentorship requests will appear here.</p>
          </div>
        )}
      </section>
    </DashboardShell>
  );
}
