import { ActionCard, DashboardPageHeader, DashboardShell, DashboardTable, Icon, Stat } from "../../platform";

const participantPathways = [
  ["Digital skills", "2"],
  ["Employability", "1"],
  ["Entrepreneurial", "1"],
];

const programTargets = [
  ["Young people trained", "Not connected", "100", "Target set"],
  ["Mentors engaged", "Not connected", "25", "Target set"],
  ["Practical projects completed", "Not connected", "80", "Target set"],
  ["Opportunities accessed", "Not connected", "40", "Target set"],
];

export default function AdminReportsPage() {
  return (
    <DashboardShell role="admin">
      <DashboardPageHeader
        eyebrow="Monitoring & evaluation"
        title={<>Make impact<br /><em>visible.</em></>}
        description="Review programme delivery, participant progress and mentor engagement in one place."
        action={
          <ActionCard
            title="Export impact report"
            description="Export will be available when verified programme data is connected. The figures shown here are illustrative demo metrics."
          >
            <span className="button button-dark"><Icon name="download" size={16} /> Export report</span>
          </ActionCard>
        }
      />

      <section className="dash-panel full-panel">
        <p className="eyebrow">Demo snapshot</p>
        <p className="profile-muted">
          Illustrative values from this prototype, not live or independently verified programme results.
          Roster breakdowns are calculated from the four sample participant profiles.
        </p>
      </section>

      <div className="stat-grid">
        <Stat value="100" label="Cohort target" tone="blue" />
        <Stat value="68" label="Applications received" tone="yellow" />
        <Stat value="87%" label="Attendance rate" tone="coral" />
        <Stat value="42" label="Active connections" tone="green" />
        <Stat value="4.7/5" label="Participant rating" tone="blue" />
        <Stat value="4.9/5" label="Mentor rating" tone="yellow" />
      </div>

      <div className="dashboard-columns">
        <section className="dash-panel">
          <div className="panel-heading">
            <p className="eyebrow">Participant evaluation</p>
            <h2>Progress & experience</h2>
          </div>
          <div className="kpi-row"><span>Baseline assessment completed</span><strong>91%</strong><div className="progress"><span style={{ width: "91%" }} /></div></div>
          <div className="kpi-row"><span>Connected to a mentor</span><strong>62%</strong><div className="progress"><span style={{ width: "62%" }} /></div></div>
          <div className="kpi-row"><span>Practical projects submitted</span><strong>38%</strong><div className="progress"><span style={{ width: "38%" }} /></div></div>
          <div className="kpi-row"><span>Participant experience rating</span><strong>4.7/5</strong></div>
        </section>

        <section className="dash-panel">
          <div className="panel-heading">
            <p className="eyebrow">Mentor evaluation</p>
            <h2>Engagement & feedback</h2>
          </div>
          <div className="kpi-row"><span>Mentors engaged</span><strong>Target: 25</strong></div>
          <div className="kpi-row"><span>Sessions completed</span><strong>42</strong></div>
          <div className="kpi-row"><span>Sessions awaiting feedback</span><strong>8</strong></div>
          <div className="kpi-row"><span>Mentor rating</span><strong>4.9/5*</strong></div>
          <p className="profile-muted">*Illustrative rating from the sample mentor workspace; neither rating is live or a programme-wide average.</p>
        </section>
      </div>

      <div className="dashboard-columns">
        <section className="dash-panel">
          <div className="panel-heading">
            <p className="eyebrow">Sample participant roster</p>
            <h2>Pathway mix</h2>
          </div>
          {participantPathways.map(([pathway, count]) => (
            <div className="report-row" key={pathway}>
              <span>{pathway}</span>
              <strong>{count} of 4</strong>
              <div className="progress"><span style={{ width: `${Number(count) * 25}%` }} /></div>
            </div>
          ))}
          <div className="kpi-row"><span>Participants with a listed mentor</span><strong>3 of 4</strong></div>
          <div className="kpi-row"><span>Average listed journey progress</span><strong>54%</strong></div>
          <p className="profile-muted">Roster-only figures; do not interpret as cohort-wide rates.</p>
        </section>

        <section className="dash-panel">
          <div className="panel-heading">
            <p className="eyebrow">Programme evaluation</p>
            <h2>Targets & data coverage</h2>
          </div>
          <DashboardTable
            headers={["Indicator", "Current", "2027 target", "Coverage"]}
            rows={programTargets}
          />
        </section>
      </div>
    </DashboardShell>
  );
}
