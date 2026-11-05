"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardPageHeader, DashboardShell, Icon } from "../../../platform";
import { readStore, writeStore } from "@/lib/local-store";

type Booking = { mentor: string; topic: string; date: string; time: string };

export default function BookSessionPage() {
  const [booking, setBooking] = useState<Booking>({ mentor: "Amara Okafor", topic: "Career clarity & positioning", date: "2026-11-18", time: "10:00" });
  const [saved, setSaved] = useState(false);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    writeStore("bookings", [...readStore<Booking[]>("bookings", []), booking]);
    setSaved(true);
  }
  return <DashboardShell role="participant"><DashboardPageHeader eyebrow="Book a conversation" title={<>Find your next <em>opening.</em></>} description="Choose a mentor, define the focus and request a time that fits your development plan." action={<Link className="button button-outline" href="/dashboard/participant/sessions">Back to sessions <Icon name="arrow" size={16} /></Link>} /><section className="dash-panel booking-panel"><form className="booking-form" onSubmit={submit}><label>Mentor<select value={booking.mentor} onChange={(e) => setBooking({ ...booking, mentor: e.target.value })}><option>Amara Okafor</option><option>David Chen</option><option>Nia Williams</option></select></label><label>Focus<input required value={booking.topic} onChange={(e) => setBooking({ ...booking, topic: e.target.value })} /></label><label>Date<input required type="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} /></label><label>Preferred time<input required type="time" value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })} /></label><button className="button button-dark" type="submit">{saved ? "Request saved" : "Request session"} <Icon name="calendar" size={16} /></button></form>{saved && <p className="form-success" role="status">Your session request is saved in this browser demo.</p>}</section></DashboardShell>;
}
