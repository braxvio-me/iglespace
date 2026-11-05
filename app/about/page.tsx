import Link from "next/link";
import { Icon, PageIntro, PublicLayout } from "../platform";

const principles = [
  ["Access", "Open doors to people, networks, tools and opportunities that can change a young person’s trajectory."],
  ["Practice", "Move beyond one-off information into projects, portfolios, challenges and useful evidence."],
  ["Guidance", "Connect learning to people who have walked the journey and are willing to invest in others."],
  ["Collaboration", "Build with partners, communities and young people rather than trying to do this work alone."],
];

const faqs = [
  ["Who is the programme for?", "The programme is designed for university and tertiary students, recent graduates, young professionals, job seekers, aspiring entrepreneurs and young people seeking relevant digital skills."],
  ["Is this only a mentorship programme?", "No. IGLE_SPACE combines skills training, masterclasses, mentorship, practical projects, entrepreneurship challenges, networking and access to opportunities."],
  ["How can I contribute as a partner?", "Partners can contribute knowledge, mentorship, resources, industry exposure, internships, technology, networks or financial support."],
  ["How will impact be measured?", "We track participation, attendance, skills development, mentor connections, projects, portfolios, opportunities accessed and participant feedback across baseline, continuous and endline evaluation."],
];

export default function AboutPage() {
  return <PublicLayout>
    <PageIntro eyebrow="About IGLE_SPACE" title={<>Building the people<br />who will shape <em>what&apos;s next.</em></>}><p>IGLE_SPACE is a youth development and training centre committed to equipping young people with the skills, mindset and opportunities they need to navigate the evolving world of work.</p></PageIntro>
    <section className="about-belief"><div className="about-belief-copy"><p className="eyebrow">Our belief</p><h2>Potential grows<br />when people get <em>access.</em></h2></div><div><p>One expert can change a young person&apos;s perspective. One mentor can shorten someone&apos;s learning curve. One opportunity can change someone&apos;s trajectory.</p><p>That is why IGLE_SPACE brings learning, practical experience, mentorship and opportunity access into one connected ecosystem.</p></div></section>
    <section className="principles-section"><div className="section-heading"><div><p className="eyebrow">How we work</p><h2>More than<br /><em>information.</em></h2></div><p className="section-intro">We create the conditions for young people to learn, apply, connect and keep growing.</p></div><div className="principles-grid">{principles.map(([title, copy], index) => <article className="principle-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="about-vision"><div><p className="eyebrow">Our vision</p><h2>To raise skillful and competent agents of transformation in Africa.</h2></div><div className="vision-stats"><div><strong>100</strong><span>young people targeted</span></div><div><strong>3</strong><span>core skill pathways</span></div><div><strong>1</strong><span>connected ecosystem</span></div></div></section>
    <section className="faq-section"><div className="section-heading"><div><p className="eyebrow">Questions, answered</p><h2>Before you<br /><em>begin.</em></h2></div></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Icon name="chevron" size={18} /></summary><p>{answer}</p></details>)}</div></section>
    <section className="about-cta"><p className="eyebrow">Build with us</p><h2>There is a role<br />for you <em>here.</em></h2><p>Join as a participant, contribute as a mentor or partner with the programme to create more access.</p><div className="hero-actions"><Link className="button button-dark" href="/auth/choose-role">Choose your role <Icon name="arrow" size={16} /></Link><Link className="button button-outline" href="/partners">Partner with us <Icon name="arrow" size={16} /></Link></div></section>
  </PublicLayout>;
}
