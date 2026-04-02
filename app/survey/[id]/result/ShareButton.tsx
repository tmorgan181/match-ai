"use client";

import { useState } from "react";

export default function ShareButton({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={share}
      className="px-5 py-2.5 rounded-full text-sm font-medium border border-neutral-700 text-neutral-300 hover:border-violet-500 hover:text-violet-300 transition-colors"
    >
      {copied ? "Link copied!" : "Share your result"}
    </button>
  );
}
