"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xs flex flex-col gap-4"
      >
        <h1 className="text-lg font-semibold text-neutral-100">Admin</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-violet-500 placeholder:text-neutral-600"
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="py-2.5 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white transition-colors"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
