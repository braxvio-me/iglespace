import Link from "next/link";
import { ActionCard, DashboardShell, Icon, Stat, StatusPill } from "../platform";
export default function AdminPage() {
  return (
    <DashboardShell role="admin">
      <div className="dashboard-welcome">
        <div>
          <p className="eyebrow">Programme operations · sample dashboard</p>
          <h1>Impact at a <em>glance.</em></h1>
          <p>Track participation, learning, mentorship and opportunities across the programme.</p>
        </div>
        <ActionCard
          title="Impact report export"
          description="The report is ready to export once live programme data is connected. This demo currently displays the reporting workspace."
        >
          <span className="button button-outline"><Icon name="download" size={16} /> Export report</span>
        </ActionCard>
      </div>

      <div className="stat-grid">
        <Stat value="100" label="Cohort target" tone="blue" />
        <Stat value="68" label="Applications received" tone="yellow" />
        <Stat value="42" label="Active connections" tone="coral" />
        <Stat value="87%" label="Attendance rate" tone="green" />
        <Stat value="38%" label="Projects submitted" tone="blue" />
        <Stat value="4.7/5" label="Participant satisfaction" tone="yellow" />
      </div>

      <div className="dashboard-columns">
        <section className="dash-panel">
          <div className="panel-heading">
            <div><p className="eyebrow">Selection pipeline</p><h2>Applications</h2></div>
            <Link className="text-link" href="/admin/applications">Manage <Icon name="arrow" size={14} /></Link>
          </div>
          {[["Lydia Mensah", "Digital skills", "Under review"], ["Samuel Owusu", "Entrepreneurial skills", "Shortlisted"], ["Amina K.", "Employability skills", "New"]].map(([name, area, status]) => (
            <div className="admin-row" key={name}>
              <span className="user-avatar">{name.charAt(0)}</span>
              <div><strong>{name}</strong><small>{area}</small></div>
              <StatusPill tone={status === "Shortlisted" ? "green" : status === "New" ? "amber" : "blue"}>{status}</StatusPill>
            </div>
          ))}
        </section>

        <section className="dash-panel">
          <div className="panel-heading">
            <div><p className="eyebrow">KPI snapshot</p><h2>Programme health</h2></div>
            <Link className="text-link" href="/admin/reports">Full evaluation <Icon name="arrow" size={14} /></Link>
          </div>
          <div className="kpi-row"><span>Participants completing baseline</span><strong>91%</strong><div className="progress"><span style={{ width: "91%" }} /></div></div>
          <div className="kpi-row"><span>Participants connected to mentors</span><strong>62%</strong><div className="progress"><span style={{ width: "62%" }} /></div></div>
          <div className="kpi-row"><span>Practical projects submitted</span><strong>38%</strong><div className="progress"><span style={{ width: "38%" }} /></div></div>
        </section>
      </div>

      <section className="dash-panel impact-table">
        <div className="panel-heading">
          <div><p className="eyebrow">Monitoring & evaluation</p><h2>Measurement framework</h2></div>
          <Link className="text-link" href="/admin/reports">View details <Icon name="arrow" size={14} /></Link>
        </div>
        <div className="table-row table-head"><span>Indicator</span><span>Current</span><span>Target</span><span>Period</span></div>
        {[
          ["Young people trained", "Not connected", "100", "By Dec 2027"],
          ["Mentors engaged", "Not connected", "25", "Programme total"],
          ["Projects completed", "Not connected", "80", "By Dec 2027"],
        ].map((row) => (
          <div className="table-row" key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>
        ))}
      </section>
    </DashboardShell>
  );
}
