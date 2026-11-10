"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { Icon } from "../../../../platform";
import { readStore, writeStore } from "@/lib/local-store";

function subscribeToNotes(storageKey: string, onStoreChange: () => void) {
  const handleLocalUpdate = (event: Event) => {
    if (event instanceof CustomEvent && event.detail === storageKey) {
      onStoreChange();
    }
  };
  const handleStorageUpdate = () => onStoreChange();

  window.addEventListener("iglespace:updated", handleLocalUpdate);
  window.addEventListener("storage", handleStorageUpdate);

  return () => {
    window.removeEventListener("iglespace:updated", handleLocalUpdate);
    window.removeEventListener("storage", handleStorageUpdate);
  };
}

export function MenteeProfileNotes({ menteeId }: { menteeId: string }) {
  const storageKey = `mentor-notes:${menteeId}`;
  const subscribe = useCallback(
    (onStoreChange: () => void) => subscribeToNotes(storageKey, onStoreChange),
    [storageKey],
  );
  const getSnapshot = useCallback(() => readStore<string | null>(storageKey, null), [storageKey]);
  const notes = useSyncExternalStore(subscribe, getSnapshot, () => undefined);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const isLoading = notes === undefined;

  function saveNotes(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const noteText = String(formData.get("notes") ?? "");
    try {
      writeStore(storageKey, noteText);
      setSaveStatus("saved");
    } catch (error) {
      if (error instanceof DOMException) {
        setSaveStatus("error");
        return;
      }

      throw error;
    }
  }

  return (
    <section className="dash-panel profile-notes">
      <p className="eyebrow">Mentor notes</p>
      <h2>Keep the relationship intentional.</h2>
      {isLoading ? (
        <p className="profile-muted" role="status">Loading saved notes...</p>
      ) : (
        <form onSubmit={saveNotes}>
          <textarea
            key={notes}
            aria-label={`Mentor notes for ${menteeId}`}
            name="notes"
            placeholder="Add private notes for your next conversation..."
            rows={5}
            defaultValue={notes ?? ""}
            onChange={() => setSaveStatus("idle")}
          />
          <p className="profile-muted">Notes are stored only in this browser, not sent to a server.</p>
          <button className="button button-accent" type="submit">
            {saveStatus === "saved" ? "Notes saved" : "Save notes"} <Icon name="check" size={16} />
          </button>
        </form>
      )}
      {saveStatus === "saved" && <p className="form-success" role="status">Your notes are saved in this browser.</p>}
      {saveStatus === "error" && (
        <p className="form-error" role="alert">
          Could not save your notes. Your browser may be blocking local storage.
        </p>
      )}
    </section>
  );
}
