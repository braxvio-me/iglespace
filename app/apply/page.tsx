"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon, PageIntro, PublicLayout } from "../platform";

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    status: "",
    location: "",
    pathway: "",
    goal: "",
    motivation: "",
  });

  function updateFormData(field: keyof typeof formData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function advanceForm(form: HTMLFormElement) {
    if (!form.checkValidity()) {
      setError("Please complete every field before continuing.");
      form.reportValidity();
      return;
    }
    setError("");
    if (step === 3) {
      setIsSubmitting(true);
      window.setTimeout(() => router.push("/auth/choose-role"), 900);
      return;
    }
    setStep((current) => current + 1);
  }

  function advance(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    advanceForm(event.currentTarget);
  }

  return <PublicLayout><PageIntro eyebrow="Join the 2026–2027 cohort" title={<>Your next step<br />starts <em>here.</em></>}><p>The programme is designed for university students, recent graduates, young professionals, job seekers and aspiring entrepreneurs ready to learn and contribute.</p></PageIntro><section className="application-wrap"><div className="application-progress"><span className={step >= 1 ? "active" : ""}>01 <b>About you</b></span><span className={step >= 2 ? "active" : ""}>02 <b>Your goals</b></span><span className={step >= 3 ? "active" : ""}>03 <b>Review</b></span></div><form className="application-form" noValidate onSubmit={advance}><p className="eyebrow">Step 0{step} of 03</p>{step === 1 && <><h2>Tell us about yourself.</h2><div className="form-grid"><label>Full name<input required name="fullName" value={formData.fullName} onChange={(event) => updateFormData("fullName", event.target.value)} placeholder="Your name" /></label><label>Email address<input required name="email" type="email" value={formData.email} onChange={(event) => updateFormData("email", event.target.value)} placeholder="you@example.com" /></label><label>Current status<select required name="status" value={formData.status} onChange={(event) => updateFormData("status", event.target.value)}><option value="" disabled>Select one</option><option>University / tertiary student</option><option>Recent graduate</option><option>Young professional</option><option>Entrepreneur</option></select></label><label>Location<input required name="location" value={formData.location} onChange={(event) => updateFormData("location", event.target.value)} placeholder="City, country" /></label></div></>}{step === 2 && <><h2>What do you want to build?</h2><div className="form-grid"><label>Primary pathway<select required name="pathway" value={formData.pathway} onChange={(event) => updateFormData("pathway", event.target.value)}><option value="" disabled>Choose an area</option><option>Employability skills</option><option>Digital skills</option><option>Entrepreneurial skills</option></select></label><label>Learning goal<input required name="goal" value={formData.goal} onChange={(event) => updateFormData("goal", event.target.value)} placeholder="What would progress look like?" /></label><label className="full-field">Tell us about your motivation<textarea required name="motivation" value={formData.motivation} onChange={(event) => updateFormData("motivation", event.target.value)} rows={5} placeholder="Share where you are now and what you hope to gain..." /></label></div></>}{step === 3 && <div className="review-box"><h2>Ready to submit?</h2><p>Review your details, then submit your application. This is a sample frontend flow; selection and communication will be handled by the IGLE_SPACE team.</p><div className="review-check"><Icon name="check" size={17} /> I&apos;m ready to commit to the learning journey.</div></div>}{error && <p className="form-error" role="alert">{error}</p>}<div className="form-actions">{step > 1 && <button className="button button-outline" type="button" onClick={() => { setError(""); setStep((current) => current - 1); }}>Back</button>}<button className="button button-dark" type="button" disabled={isSubmitting} onClick={(event) => { const form = event.currentTarget.form; if (form) advanceForm(form); }}>{isSubmitting ? <><span className="button-spinner" /> Submitting…</> : <>{step === 3 ? "Submit application" : "Continue"} <Icon name="arrow" size={16} /></>}</button></div></form>{isSubmitting && <div className="submit-loading" role="status"><div className="loading-logo-wrap"><img className="loading-logo" src="/iglespace-logo.png" alt="" /></div><strong>Sending your application</strong><span>One moment please.</span></div>}</section></PublicLayout>;
}
