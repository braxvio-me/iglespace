"use client";

export type PortalRole = "participant" | "mentor" | "admin";

const prefix = "iglespace:";

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(`${prefix}${key}`);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T) {
  window.localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("iglespace:updated", { detail: key }));
}

export function setDemoRole(role: PortalRole) {
  window.sessionStorage.setItem(`${prefix}role`, role);
}

export function clearDemoRole() {
  window.sessionStorage.removeItem(`${prefix}role`);
}
