import { DashboardPageHeader, DashboardShell, DashboardTable } from "../../platform";
export default function AdminParticipantsPage() {
  return <DashboardShell role="admin"><DashboardPageHeader eyebrow="Participant directory" title={<>Know the <em>cohort.</em></>} description="Track participation, pathways, connections and development progress." /><section className="dash-panel full-panel"><DashboardTable headers={["Participant", "Pathway", "Mentor", "Progress"]} rows={[["Jordan A.", "Employability", "Amara Okafor", "72%"], ["Lydia M.", "Digital skills", "David Chen", "48%"], ["Samuel O.", "Entrepreneurial", "Nia Williams", "35%"], ["Amina K.", "Digital skills", "Unmatched", "61%"]]}/></section></DashboardShell>;
}
