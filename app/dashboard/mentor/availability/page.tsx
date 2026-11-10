"use client";

import type { FormEvent } from "react";
import { useState, useSyncExternalStore } from "react";
import { DashboardPageHeader, DashboardShell, Icon } from "../../../platform";
import { readStore, writeStore } from "@/lib/local-store";

type Availability = {
  days: string[];
  startTime: string;
  endTime: string;
  sessionLength: number;
};

const defaultAvailability: Availability = {
  days: ["Mon", "Tue", "Thu", "Fri"],
  startTime: "09:00",
  endTime: "17:00",
  sessionLength: 45,
};

function subscribeToClientState() {
  return () => {};
}

function getClientState() {
  return true;
}

function getServerClientState() {
  return false;
}

export default function MentorAvailabilityPage() {
  const isClient = useSyncExternalStore(
    subscribeToClientState,
    getClientState,
    getServerClientState,
  );
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const availability = isClient
    ? readStore<Availability>("mentor-availability", defaultAvailability)
    : defaultAvailability;

  function clearFeedback() {
    setSaved(false);
    setSaveError(false);
  }

  function saveAvailability(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextAvailability: Availability = {
      days: formData.getAll("days").map(String),
      startTime: String(formData.get("startTime") ?? ""),
      endTime: String(formData.get("endTime") ?? ""),
      sessionLength: Number(formData.get("sessionLength") ?? defaultAvailability.sessionLength),
    };

    try {
      writeStore("mentor-availability", nextAvailability);
      setSaved(true);
      setSaveError(false);
    } catch (error) {
      if (error instanceof DOMException) {
        setSaved(false);
        setSaveError(true);
        return;
      }

      throw error;
    }
  }

  return (
    <DashboardShell role="mentor">
      <DashboardPageHeader
        eyebrow="Make room for guidance"
        title={<>Your <em>availability.</em></>}
        description="Choose when participants can request a session. You can update this at any time."
      />
      <section className="dash-panel availability-panel">
        {!isClient ? (
          <p className="profile-muted" role="status">Loading saved availability...</p>
        ) : (
          <form onSubmit={saveAvailability}>
            <div className="availability-days">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    name="days"
                    value={day}
                    defaultChecked={availability.days.includes(day)}
                    onChange={clearFeedback}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
            <div className="time-fields">
              <label>
                Start time
                <input
                  name="startTime"
                  type="time"
                  defaultValue={availability.startTime}
                  required
                  onChange={clearFeedback}
                />
              </label>
              <label>
                End time
                <input
                  name="endTime"
                  type="time"
                  defaultValue={availability.endTime}
                  required
                  onChange={clearFeedback}
                />
              </label>
              <label>
                Session length
                <select
                  name="sessionLength"
                  defaultValue={String(availability.sessionLength)}
                  onChange={clearFeedback}
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </label>
            </div>
            <p className="profile-muted">
              These settings are stored only in this browser demo, not shared with participants.
            </p>
            <button className="button button-dark" type="submit">
              {saved ? "Availability saved" : "Save availability"} <Icon name="check" size={16} />
            </button>
          </form>
        )}
        {saved && (
          <p className="form-success" role="status">
            Your availability is saved in this browser demo.
          </p>
        )}
        {saveError && (
          <p className="form-error" role="alert">
            Could not save your availability. Your browser may be blocking local storage.
          </p>
        )}
      </section>
    </DashboardShell>
  );
}
