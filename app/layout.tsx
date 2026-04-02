import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "match.ai",
  description:
    "Take a short survey, discover your AI ethics archetype, and get matched with collaborators who complement your perspective. Focused on AI chatbots and mental health.",
  openGraph: {
    siteName: "match.ai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center px-4 py-3">
          <Link href="/" className="text-xs text-neutral-600 hover:text-neutral-300 transition-colors">
            match.ai
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
