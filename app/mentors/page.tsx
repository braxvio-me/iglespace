"use client";
import { useMemo, useState } from "react";
import { Icon, PageIntro, PublicLayout, StatusPill } from "../platform";

const people = [
  ["Mr. Aaron Sangmor", "Life purpose coach", "Discipleship, purpose, leadership & kingdom impact", "/contributors/aaron-sangmor.png"],
  ["Dr. Joseph Budu", "Senior lecturer", "Artificial intelligence, data analytics, leadership & sustainable development", "/contributors/joseph-budu.png"],
  ["Mr. Anthony Arthur", "Marketing consultant & mentor", "Brand strategy, digital media, sales & youth empowerment", "/contributors/anthony-arthur.png"],
  ["READHouse Africa Network", "Mentorship community partner", "Equipping, nurturing and deploying people to serve with purpose", "/contributors/readhouse-africa.png"],
];

function getConnectionRequestHref(name: string) {
  const query = new URLSearchParams({
    subject: `Connection request for ${name}`,
    body: `Hello IgleSpace team,\n\nI would like to request a connection with ${name}.\n\nMy name:\nMy email:\n\nThank you.`,
  });
  return `mailto:iglespace@gmail.com?${query.toString()}`;
}

export default function MentorsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All contributors");
  const results = useMemo(() => people.filter(([, role, expertise]) => filter === "All contributors" || `${role} ${expertise}`.toLowerCase().includes(filter.toLowerCase())).filter(([name, role, expertise]) => `${name} ${role} ${expertise}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  return (
    <PublicLayout>
      <PageIntro eyebrow="The contributor network" title={<>Meet the people<br />who <em>open doors.</em></>}>
        <p>Mentors, industry experts, founders and coaches contribute their experience to help young people move from learning to opportunity.</p>
      </PageIntro>
      <section className="directory-section">
        <div className="directory-toolbar">
          <label className="search-field">
            <Icon name="search" size={18} />
            <input placeholder="Search by name or expertise" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option>All contributors</option>
            <option>Employability</option>
            <option>Digital</option>
            <option>Entrepreneurial</option>
          </select>
        </div>
        <p className="form-hint">Request connection opens a pre-filled email draft. Review and send it in your email app.</p>
        {results.length ? (
          <div className="directory-grid">
            {results.map(([name, role, expertise, image]) => (
              <article className="directory-card" key={name}>
                <div className="directory-photo">
                  <img src={image} alt={`${name} profile`} />
                  <StatusPill>Available</StatusPill>
                </div>
                <h3>{name}</h3>
                <p className="directory-role">{role}</p>
                <p>{expertise}</p>
                <a className="text-link" href={getConnectionRequestHref(name)} aria-label={`Request connection with ${name}`}>
                  Request connection <Icon name="arrow" size={15} />
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="search" size={25} />
            <h3>No contributors found</h3>
            <p>Try a different search or reset your filters.</p>
            <button className="text-link" onClick={() => { setQuery(""); setFilter("All contributors"); }}>
              Clear filters <Icon name="arrow" size={15} />
            </button>
          </div>
        )}
      </section>
    </PublicLayout>
  );
}
