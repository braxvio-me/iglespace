"use client";
import { useState } from "react";
import { DashboardPageHeader, DashboardShell, Icon } from "../../../platform";
export default function MentorAvailabilityPage() {
  const [saved, setSaved] = useState(false);
  return <DashboardShell role="mentor"><DashboardPageHeader eyebrow="Make room for guidance" title={<>Your <em>availability.</em></>} description="Choose when participants can request a session. You can update this at any time." /><section className="dash-panel availability-panel"><div className="availability-days">{["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => <label key={day}><input type="checkbox" defaultChecked={i !== 2} /><span>{day}</span></label>)}</div><div className="time-fields"><label>Start time<input type="time" defaultValue="09:00" /></label><label>End time<input type="time" defaultValue="17:00" /></label><label>Session length<select defaultValue="45"><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></select></label></div><button className="button button-dark" onClick={() => setSaved(true)}>{saved ? "Availability saved" : "Save availability"} <Icon name="check" size={16} /></button>{saved && <p className="form-success" role="status">Participants can now request times within these hours.</p>}</section></DashboardShell>;
}
