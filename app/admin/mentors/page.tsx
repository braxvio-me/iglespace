import { DashboardPageHeader, DashboardShell, DashboardTable } from "../../platform";

const mentorRatings = [
  ["Mr. Aaron Sangmor", "Purpose, leadership & discipleship", "4.9 / 5", "18"],
  ["Dr. Joseph Budu", "AI, data analytics & leadership", "4.8 / 5", "12"],
  ["Mr. Anthony Arthur", "Brand strategy, sales & digital media", "4.7 / 5", "9"],
  ["READHouse Africa Network", "Mentorship community partner", "4.9 / 5", "14"],
];

export default function AdminMentorRatingsPage() {
  return (
    <DashboardShell role="admin">
      <DashboardPageHeader
        eyebrow="Mentor evaluation"
        title={<>Mentor <em>ratings.</em></>}
        description="Review each mentor’s overall participant rating and the feedback count behind it."
      />
      <section className="dash-panel full-panel">
        <p className="profile-muted">
          Illustrative demo data only. Ratings and feedback counts are not collected or verified by this prototype.
          In a live system, each overall rating should be calculated from submitted participant feedback.
        </p>
        <DashboardTable
          headers={["Mentor", "Focus area", "Overall rating", "Feedback count"]}
          rows={mentorRatings}
        />
      </section>
    </DashboardShell>
  );
}
