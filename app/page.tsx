"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { languages, useLanguage } from "../lib/i18n";

type IconName =
  | "arrow"
  | "book"
  | "briefcase"
  | "chevron"
  | "close"
  | "globe"
  | "menu"
  | "play"
  | "search"
  | "image"
  | "users";

const mentors = [
  {
    name: "Amara Okafor",
    role: "Employability & leadership",
    category: "Employability",
    image: "/contributors/aaron-sangmor.png",
    color: "coral",
  },
  {
    name: "David Chen",
    role: "Digital tools & entrepreneurship",
    category: "Digital",
    image: "/contributors/joseph-budu.png",
    color: "blue",
  },
  {
    name: "Nia Williams",
    role: "Branding & professional confidence",
    category: "Entrepreneurial",
    image: "/contributors/anthony-arthur.png",
    color: "yellow",
  },
];

const categories = [
  { name: "Employability skills", count: "CVs, interviews & work", icon: "briefcase" as IconName },
  { name: "Digital skills", count: "AI, tools & technology", icon: "globe" as IconName },
  { name: "Entrepreneurial skills", count: "Ideas, business & income", icon: "image" as IconName },
  { name: "Mentorship & networks", count: "Guidance & opportunity", icon: "users" as IconName },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    briefcase: <><rect width="18" height="14" x="3" y="6" rx="2" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 11h18M10 11v2h4v-2" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    play: <path fill="currentColor" stroke="none" d="m9 6 10 6-10 6V6Z" />,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    image: <><rect width="18" height="16" x="3" y="4" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m21 15-5-5L5 20" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All mentors");

  const visibleMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const matchesQuery =
        !query ||
        `${mentor.name} ${mentor.role}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        activeCategory === "All mentors" ||
        mentor.category.toLowerCase().includes(activeCategory.split(" ")[0].toLowerCase());
      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, query]);

  return (
    <main>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#" aria-label="IgleSpace home">
          <img src="/iglespace-logo.png" alt="IgleSpace" width="150" height="72" />
        </a>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="/mentors" onClick={() => setMenuOpen(false)}>{t("contributors")}</a>
          <a href="/programme" onClick={() => setMenuOpen(false)}>{t("programme")}</a>
          <a href="/about" onClick={() => setMenuOpen(false)}>{t("about")}</a>
          <a href="/community" onClick={() => setMenuOpen(false)}>{t("community")}</a>
          <a href="/partners" onClick={() => setMenuOpen(false)}>{t("partner")}</a>
          <div className="mobile-nav-actions">
            <label className="language-picker"><span className="sr-only">Language</span><select value={language} onChange={(event) => setLanguage(event.target.value as typeof language)} aria-label="Language">{languages.map((option) => <option key={option}>{option}</option>)}</select></label>
            <a href="/auth/sign-in">{t("signIn")}</a>
            <a className="button button-dark" href="/apply">{t("apply")} <Icon name="arrow" size={16} /></a>
          </div>
        </div>
        <div className="nav-actions">
          <label className="language-picker"><span className="sr-only">Language</span><select value={language} onChange={(event) => setLanguage(event.target.value as typeof language)} aria-label="Language">{languages.map((option) => <option key={option}>{option}</option>)}</select></label>
          <a href="/auth/sign-in">{t("signIn")}</a>
          <a className="button button-dark" href="/apply">{t("apply")} <Icon name="arrow" size={16} /></a>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> {t("heroEyebrow")}</p>
          <h1>{t("heroTitle")}</h1>
          <p className="hero-text">{t("heroText")}</p>
          <div className="hero-actions">
            <a className="button button-accent" href="#get-started">{t("join")} <Icon name="arrow" size={17} /></a>
            <a className="text-link" href="#become-a-mentor">{t("partnerWithUs")} <Icon name="arrow" size={16} /></a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar-one" /><span className="avatar avatar-two" /><span className="avatar avatar-three" /><span className="avatar avatar-four">+</span>
            </div>
            <span>{t("proof")}<br /><strong>{t("proofStrong")}</strong></span>
          </div>
        </div>
        <div className="hero-visual" aria-label="A mentor and mentee in conversation">
          <div className="hero-image" role="img" aria-label="The IgleSpace team together" />
          <div className="image-note image-note-top"><span className="note-icon"><Icon name="image" size={15} /></span><span>{t("imageNote")}<br /><strong>{t("imageNoteStrong")}</strong></span></div>
          <div className="image-note image-note-bottom"><span className="online-dot" /><span><strong>{t("realPeople")}</strong><br />{t("realProgress")}</span></div>
          <div className="sun-shape" />
        </div>
      </section>

      <section className="trust-strip" aria-label="Sample platform metrics">
        <p>A collaborative youth development initiative</p>
        <div className="trust-metrics">
          <span><strong>100</strong> young people</span>
          <span><strong>3</strong> skill pathways</span>
          <span><strong>2026–27</strong> programme period</span>
        </div>
      </section>

      <section className="section categories-section" id="community">
        <div className="section-heading">
          <div><p className="eyebrow">The learning journey</p><h2>Build what the<br />future <em>needs.</em></h2></div>
          <p className="section-intro">Young people need more than information. They need access, exposure, guidance, practice and people willing to invest in them.</p>
        </div>
        <div className="category-list">
          {categories.map((category, index) => (
            <a className={`category-row category-${index}`} href="#mentors" key={category.name} onClick={() => setActiveCategory(category.name.split(" ")[0])}>
              <span className="category-icon"><Icon name={category.icon} size={22} /></span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">{category.count}</span>
              <span className="category-arrow"><Icon name="arrow" size={19} /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="mentor-section" id="mentors">
        <div className="section-heading mentors-heading">
          <div><p className="eyebrow">The people behind progress</p><h2>Experience that<br /><em>opens doors.</em></h2></div>
          <div className="mentor-controls">
            <label className="search-field"><Icon name="search" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search contributors" aria-label="Search programme contributors" /></label>
            <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} aria-label="Filter contributors by category">
              <option>All mentors</option><option>Employability</option><option>Digital</option><option>Entrepreneurial</option><option>Mentorship</option>
            </select>
          </div>
        </div>
        {visibleMentors.length > 0 ? (
          <div className="mentor-grid">
            {visibleMentors.map((mentor, index) => (
              <article className="mentor-card" key={`${mentor.name}-${index}`}>
                <div className={`mentor-photo photo-${mentor.color}`} style={{ backgroundImage: `url("${mentor.image}")` }}>
                  <span className="available-badge"><span /> Available</span>
                </div>
                <div className="mentor-info"><div><h3>{mentor.name}</h3><p>{mentor.role}</p></div><span className="rating"><Icon name="image" size={13} /> 5.0</span></div>
                <Link className="card-link" href="/mentors">Meet contributors <Icon name="arrow" size={16} /></Link>
              </article>
            ))}
          </div>
        ) : <div className="empty-state"><Icon name="search" size={24} /><h3>No mentors found</h3><p>Try a different search or explore all mentors.</p><button className="text-link" onClick={() => { setQuery(""); setActiveCategory("All mentors"); }}>Clear filters <Icon name="arrow" size={16} /></button></div>}
        <div className="center-action"><Link className="button button-outline" href="/mentors">Explore all mentors <Icon name="arrow" size={17} /></Link></div>
      </section>

      <section className="how-section section" id="how-it-works">
        <div className="how-intro"><p className="eyebrow">Four stages, one journey</p><h2>Learn. Apply.<br /><em>Connect.</em></h2><p>From self-discovery to opportunity access, the programme turns relevant learning into tangible evidence, confidence and connections.</p><a className="text-link" href="#get-started">Explore the programme <Icon name="arrow" size={16} /></a></div>
        <div className="steps">
          <div className="step"><span className="step-number">01</span><span className="step-icon"><Icon name="search" size={23} /></span><h3>Discover</h3><p>Understand your strengths, interests, goals and areas for development.</p></div>
          <div className="step"><span className="step-number">02</span><span className="step-icon"><Icon name="book" size={23} /></span><h3>Develop</h3><p>Build relevant employability, digital and entrepreneurial capabilities.</p></div>
          <div className="step"><span className="step-number">03</span><span className="step-icon"><Icon name="image" size={23} /></span><h3>Apply</h3><p>Turn knowledge into projects, portfolios, business ideas and practical evidence.</p></div>
          <div className="step"><span className="step-number">04</span><span className="step-icon"><Icon name="users" size={23} /></span><h3>Connect</h3><p>Move towards mentors, professionals, networks and opportunities.</p></div>
        </div>
      </section>

      <section className="quote-section" id="get-started">
        <div className="quote-image" />
        <div className="quote-copy"><span className="quote-mark">“</span><blockquote>One opportunity can change someone&apos;s trajectory.</blockquote><p>IGLE_SPACE Youth Mentorship Program</p><a className="text-link text-link-light" href="#become-a-mentor">Become a programme partner <Icon name="arrow" size={16} /></a></div>
      </section>

      <section className="final-cta section" id="become-a-mentor">
        <p className="eyebrow">Be part of the ecosystem</p><h2>Invest in the next<br /><em>generation.</em></h2><p>Bring your time, knowledge, networks, resources or opportunities to a collaborative programme preparing 100 young people for what&apos;s next.</p><div className="hero-actions"><a className="button button-dark" href="/apply">Apply to join <Icon name="arrow" size={16} /></a><a className="button button-outline" href="/partners">Partner with IGLE_SPACE <Icon name="arrow" size={16} /></a></div>
      </section>

      <footer className="footer" id="sign-in">
        <div className="footer-top"><a className="brand brand-light" href="#"><img src="/iglespace-logo.png" alt="IgleSpace" width="150" height="72" /></a><p>Growth becomes more meaningful<br />when we don&apos;t do it alone.<br /><a className="footer-email" href="mailto:iglespace@gmail.com">iglespace@gmail.com</a></p><div className="footer-links"><a href="/about">About us</a><a href="/programme">The programme</a><a href="/mentors">Contributors</a><a href="/partners">Partners</a><a href="/auth/sign-in">Sign in</a></div></div>
        <div className="footer-bottom"><span>© 2025 IgleSpace · Sample experience</span><span><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#contact">Contact</a></span></div>
      </footer>
    </main>
  );
}
