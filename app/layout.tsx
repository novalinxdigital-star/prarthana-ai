import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prarthana AI — Speak From Your Heart. Find a Prayer.",
  description:
    "A spiritually immersive Hindu prayer companion. Share your situation and receive a heartfelt, scripturally grounded prayer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Lora for prayer text, Cinzel for headings. Falls back to Georgia. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
        />
      </head>
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
