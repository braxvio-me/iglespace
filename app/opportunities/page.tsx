import Link from "next/link";
import { Icon, PageIntro, PublicLayout } from "../platform";

const opportunities = [
  ["Digital product internship", "Partner opportunity", "A six-week placement supporting a digital product team."],
  ["Community project showcase", "IGLE_SPACE opportunity", "Share a practical project and meet people who can help it grow."],
  ["Entrepreneurship clinic", "Mentor-led session", "Bring your business idea for focused feedback on the next step."],
];

export default function OpportunitiesPage() {
  return <PublicLayout><PageIntro eyebrow="Opportunities" title={<>Turn learning into <em>momentum.</em></>}><p>Explore practical openings, projects and conversations that connect your skills to the next chapter.</p></PageIntro><section className="opportunity-grid">{opportunities.map(([title, type, description]) => <article className="opportunity-card" key={title}><p className="eyebrow">{type}</p><h2>{title}</h2><p>{description}</p><Link className="text-link" href="/auth/sign-in">View opportunity <Icon name="arrow" size={15} /></Link></article>)}</section></PublicLayout>;
}
