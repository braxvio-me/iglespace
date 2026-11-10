"use client";
import { Icon, PageIntro, PublicLayout } from "../platform";

const types = ["Knowledge partner", "Mentorship partner", "Industry partner", "Resource partner", "Opportunity partner", "Funding / sponsorship"];
export default function PartnersPage() {
  function openEnquiryEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = [
      `Name: ${formData.get("name") ?? ""}`,
      `Organisation: ${formData.get("organisation") ?? ""}`,
      `Contribution: ${formData.get("contribution") ?? ""}`,
      `Email: ${formData.get("email") ?? ""}`,
    ].join("\n");
    const query = new URLSearchParams({ subject: "Partnership enquiry", body });
    window.location.href = `mailto:iglespace@gmail.com?${query.toString()}`;
  }

  return (
    <PublicLayout>
      <PageIntro eyebrow="Build with us" title={<>Your contribution<br />can change a <em>trajectory.</em></>}>
        <p>IGLE_SPACE invites leaders, founders, experts, coaches, organisations and businesses to invest in the next generation.</p>
      </PageIntro>
      <section className="partner-content">
        <div className="partner-benefits">
          <p className="eyebrow">Ways to contribute</p>
          <h2>Bring what you<br /><em>know.</em></h2>
          <p>Partnership can mean time, knowledge, networks, resources, opportunities, expertise, platforms or financial support.</p>
          <div className="partner-list">
            {types.map((type, index) => (
              <div key={type}><span>0{index + 1}</span><strong>{type}</strong><Icon name="arrow" size={16} /></div>
            ))}
          </div>
        </div>
        <div className="partner-form">
          <form onSubmit={openEnquiryEmail}>
            <p className="eyebrow">Start a conversation</p>
            <h2>Let&apos;s make an<br /><em>introduction.</em></h2>
            <label>Name<input required name="name" placeholder="Your name" /></label>
            <label>Organisation<input required name="organisation" placeholder="Company or organisation" /></label>
            <label>How can you help?<select required name="contribution" defaultValue=""><option value="" disabled>Choose a contribution</option>{types.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label>Email<input required name="email" type="email" placeholder="you@organisation.com" /></label>
            <p className="form-hint">Your email app will open with these details filled in. Review them and press Send there.</p>
            <button className="button button-dark" type="submit">Open email to send enquiry <Icon name="arrow" size={16} /></button>
          </form>
        </div>
      </section>
      <section className="partner-note">
        <p className="eyebrow">What partners gain</p>
        <h2>Meaningful visibility.<br /><em>Measurable impact.</em></h2>
        <p>Partners may gain direct engagement with emerging talent, thought-leadership opportunities, impact visibility and a role in creating access to opportunity.</p>
      </section>
    </PublicLayout>
  );
}
