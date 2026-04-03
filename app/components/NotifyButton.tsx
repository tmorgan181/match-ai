"use client";

import { useState } from "react";

export default function NotifyButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, consent }),
    });
    if (res.ok) {
      setDone(true);
    } else {
      const json = await res.json();
      setError(typeof json.error === "string" ? json.error : "Something went wrong.");
    }
    setSubmitting(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
      >
        Sign up for notifications
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-2xl p-6 flex flex-col gap-5">
            {done ? (
              <>
                <h2 className="text-lg font-semibold">You're on the list</h2>
                <p className="text-sm text-neutral-400">We'll reach out when updates launch.</p>
                <button
                  type="button"
                  onClick={() => { setOpen(false); setDone(false); setEmail(""); setConsent(false); }}
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-semibold">Get notified</h2>
                  <p className="text-sm text-neutral-400 mt-1">
                    We'll email you when updates launch — more questions, archetypes, domains, and ways to connect.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 placeholder:text-neutral-600"
                    />
                  </div>

                  <label className="flex gap-3 items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 accent-violet-500 w-4 h-4 shrink-0"
                    />
                    <span className="text-xs text-neutral-400 leading-snug">
                      I consent to receiving update notifications. No marketing, no sharing.
                    </span>
                  </label>

                  {error && (
                    <p className="text-xs text-red-400">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="flex-1 py-2.5 rounded-lg text-sm border border-neutral-700 text-neutral-300 hover:border-neutral-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || !consent || !email}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                    >
                      {submitting ? "Saving…" : "Notify me"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
