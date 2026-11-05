import type { Metadata } from "next";
import "./globals.css";
import SiteLoader from "./site-loader";
import { LanguageProvider } from "../lib/i18n";
import GoogleTranslate from "./google-translate";

export const metadata: Metadata = {
  title: "IgleSpace — Your growth deserves the right guidance",
  description: "Find meaningful mentorship for your next chapter.",
  icons: {
    icon: "/iglespace-logo.png",
    apple: "/iglespace-logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><LanguageProvider><GoogleTranslate /><SiteLoader />{children}</LanguageProvider></body>
    </html>
  );
}
