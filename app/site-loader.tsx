"use client";

import { useEffect, useState } from "react";

export default function SiteLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("iglespace-loader-seen")) return;
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const timer = window.setTimeout(() => setVisible(false), 5000);
    window.sessionStorage.setItem("iglespace-loader-seen", "true");
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="site-loader" role="status" aria-label="Loading IgleSpace">
      <div className="loading-logo-wrap">
        <img className="loading-logo" src="/iglespace-logo.png" alt="" />
      </div>
      <span className="loading-label">Preparing your space</span>
    </div>
  );
}
