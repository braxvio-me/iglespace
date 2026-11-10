import { Suspense } from "react";
import Link from "next/link";
import { DashboardPageHeader, DashboardShell, Icon, StatusPill } from "../../../../platform";
import { MenteeProfileNotes } from "./profile-notes";

const mentees: Record<string, { name: string; focus: string; progress: string; goal: string; next: string; sessions: string }> = {
  jordan: { name: "Jordan A.", focus: "Career clarity & professional positioning", progress: "72%", goal: "Build my first professional portfolio", next: "Complete portfolio introduction", sessions: "18 Nov · 10:00 GMT" },
  lydia: { name: "Lydia M.", focus: "Interview preparation & confidence", progress: "48%", goal: "Lead two practice interviews", next: "Prepare STAR response examples", sessions: "21 Nov · 14:30 GMT" },
  samuel: { name: "Samuel O.", focus: "Business model development", progress: "35%", goal: "Validate a first customer segment", next: "Schedule three discovery calls", sessions: "26 Nov · 11:00 GMT" },
  amina: { name: "Amina K.", focus: "Digital portfolio", progress: "61%", goal: "Publish a practical project portfolio", next: "Add project case study", sessions: "To be scheduled" },
};

export function generateStaticParams() {
  return Object.keys(mentees).map((id) => ({ id }));
}

async function MenteeProfileContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mentee = mentees[id] ?? mentees.jordan;
  return (
    <>
      <DashboardPageHeader
        eyebrow="Mentee workspace"
        title={<>{mentee.name}&apos;s <em>profile.</em></>}
        description="Review progress, prepare for the next conversation and keep support focused on a clear next action."
        action={
          <Link className="button button-outline" href="/dashboard/mentor/mentees">
            Back to mentees <Icon name="arrow" size={16} />
          </Link>
        }
      />
      <div className="profile-layout">
        <section className="dash-panel profile-summary">
          <div className="profile-identity">
            <span className="profile-avatar">{mentee.name.charAt(0)}</span>
            <div>
              <h2>{mentee.name}</h2>
              <p>{mentee.focus}</p>
              <StatusPill>Active connection</StatusPill>
            </div>
          </div>
          <div className="profile-progress">
            <span>Journey progress</span>
            <strong>{mentee.progress}</strong>
            <div className="progress">
              <span style={{ width: mentee.progress }} />
            </div>
          </div>
        </section>
        <section className="dash-panel">
          <p className="eyebrow">Current goal</p>
          <h2>{mentee.goal}</h2>
          <p className="profile-muted">
            The next milestone gives this mentorship relationship a practical focus.
          </p>
          <div className="next-action">
            <Icon name="check" size={18} />
            <div>
              <strong>Next action</strong>
              <span>{mentee.next}</span>
            </div>
          </div>
        </section>
        <section className="dash-panel">
          <p className="eyebrow">Next session</p>
          <h2>{mentee.sessions}</h2>
          <p className="profile-muted">
            Use the session to review progress, remove blockers and agree the next small step.
          </p>
          <Link className="button button-dark" href="/dashboard/mentor/sessions">
            Open session plan <Icon name="arrow" size={16} />
          </Link>
        </section>
        <MenteeProfileNotes menteeId={id} />
      </div>
    </>
  );
}

export default function MenteeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <DashboardShell role="mentor">
      <Suspense fallback={<section className="dash-panel" role="status">Loading mentee profile...</section>}>
        <MenteeProfileContent params={params} />
      </Suspense>
    </DashboardShell>
  );
}
