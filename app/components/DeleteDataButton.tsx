"use client";

import { useState } from "react";

export default function DeleteDataButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"done" | "none" | null>(null);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setOpen(false);
    setEmail("");
    setResult(null);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/delete-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
      } else {
        setResult(json.deleted > 0 ? "done" : "none");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
      >
        Delete my data
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={reset} />
          <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-2xl p-6 flex flex-col gap-5">
            {result === "done" ? (
              <>
                <h2 className="text-lg font-semibold">Data deleted</h2>
                <p className="text-sm text-neutral-400">
                  All records associated with that email have been removed.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                >
                  Done
                </button>
              </>
            ) : result === "none" ? (
              <>
                <h2 className="text-lg font-semibold">No records found</h2>
                <p className="text-sm text-neutral-400">
                  We couldn't find any data associated with that email. If you submitted anonymously, there's nothing to delete.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="w-full py-2.5 rounded-lg text-sm font-medium border border-neutral-700 text-neutral-300 hover:border-neutral-500 transition-colors"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-semibold">Delete my data</h2>
                  <p className="text-sm text-neutral-400 mt-1">
                    Enter the email you submitted with. All associated records will be permanently deleted.
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

                  {error && <p className="text-xs text-red-400">{error}</p>}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={reset}
                      className="flex-1 py-2.5 rounded-lg text-sm border border-neutral-700 text-neutral-300 hover:border-neutral-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || !email}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                    >
                      {submitting ? "Deleting…" : "Delete"}
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
