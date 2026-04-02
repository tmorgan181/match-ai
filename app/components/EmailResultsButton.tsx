"use client";

import { useState } from "react";

type Props = {
  archetypeName: string;
  tagline: string;
  reflection: string;
};

export default function EmailResultsButton({ archetypeName, tagline, reflection }: Props) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  function buildMailto(recipient?: string) {
    const subject = encodeURIComponent(`My match.ai result: ${archetypeName}`);
    const body = encodeURIComponent(
      `${archetypeName}\n${tagline}\n\nReflection:\n${reflection}\n\nTake the survey:\n${window.location.origin}/survey`
    );
    const to = recipient ? encodeURIComponent(recipient) : "";
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }

  function handleSend() {
    window.location.href = buildMailto(email.trim() || undefined);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-2"
      >
        Email myself a copy
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold">Email your result</h2>
              <p className="text-sm text-neutral-400 mt-1">
                This opens your mail app with your result filled in. We do not save the address or send anything from our server.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 placeholder:text-neutral-600"
              />
              <p className="text-xs text-neutral-500">
                Leave blank to choose the recipient in your mail app.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 py-2.5 rounded-lg text-sm border border-neutral-700 text-neutral-300 hover:border-neutral-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors"
              >
                Open email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
