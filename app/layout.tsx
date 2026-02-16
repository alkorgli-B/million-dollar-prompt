import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Million Dollar Prompt — Buy a Word. Shape the AI. Make History.",
  description:
    "The world's largest collaborative AI experiment. Buy a word for $1, join one million others, and watch AI respond to humanity's collective voice. 30% of profits donated to children's hospitals.",
  keywords:
    "million dollar prompt, collaborative AI experiment, buy a word, AI prompt, internet history, collective AI, word grid",
  authors: [{ name: "MillionDollarPrompt" }],
  metadataBase: new URL("https://milliondollarprompt.com"),
  openGraph: {
    title: "Million Dollar Prompt — The World's Largest Collaborative AI Experiment",
    description:
      "1,000,000 words. $1 each. One massive AI prompt. What happens when a million minds write together?",
    type: "website",
    url: "https://milliondollarprompt.com",
    siteName: "Million Dollar Prompt",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Million Dollar Prompt — Buy a Word. Shape the AI.",
    description:
      "Buy a word for $1. Join the world's largest collaborative AI experiment. 30% donated to children's hospitals.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>$</text></svg>",
  },
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
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
