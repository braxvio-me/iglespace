"use client";

import { useState } from "react";
import { DashboardPageHeader, DashboardShell, Icon } from "../../../platform";
import { readStore, writeStore } from "@/lib/local-store";

export default function AssessmentsPage() {
  const [answers, setAnswers] = useState(readStore<Record<string, string>>("assessment", {}));
  const [saved, setSaved] = useState(false);
  const questions = ["I can confidently describe my strengths.", "I have a practical project I can show others.", "I know which opportunity I want to pursue next."];
  return <DashboardShell role="participant"><DashboardPageHeader eyebrow="Measure your growth" title={<>Your learning <em>check-in.</em></>} description="Use short reflections to make progress visible across the programme." /><section className="dash-panel assessment-panel"><p className="eyebrow">Baseline / progress check-in</p>{questions.map((question, index) => <label className="assessment-question" key={question}>{question}<select value={answers[String(index)] ?? ""} onChange={(e) => setAnswers({ ...answers, [String(index)]: e.target.value })}><option value="">Choose one</option><option>Not yet</option><option>Getting there</option><option>Confident</option></select></label>)}<button className="button button-dark" type="button" onClick={() => { writeStore("assessment", answers); setSaved(true); }}>{saved ? "Check-in saved" : "Save check-in"} <Icon name="check" size={16} /></button></section></DashboardShell>;
}
