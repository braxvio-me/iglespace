"use client";

import Script from "next/script";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (options: { pageLanguage: string; autoDisplay: boolean }, elementId: string) => unknown } };
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslate() {
  return <>
    <div id="google_translate_element" aria-hidden="true" />
    <Script
      src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      strategy="afterInteractive"
      onLoad={() => {
        window.googleTranslateElementInit = () => {
          if (window.google?.translate?.TranslateElement) {
            new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "google_translate_element");
          }
        };
        window.googleTranslateElementInit();
      }}
    />
  </>;
}
