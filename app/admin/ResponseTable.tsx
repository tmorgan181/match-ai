"use client";

import type { Response } from "@/lib/db/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ARCHETYPE_COLORS: Record<string, string> = {
  advocate: "bg-orange-900/50 text-orange-300 border-orange-700",
  antagonist: "bg-red-950/50 text-red-300 border-red-800",
  builder: "bg-blue-900/50 text-blue-300 border-blue-700",
  displaced: "bg-fuchsia-950/50 text-fuchsia-300 border-fuchsia-800",
  doomer: "bg-stone-900/50 text-stone-300 border-stone-700",
  guardian: "bg-green-900/50 text-green-300 border-green-700",
  optimist: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
  pragmatist: "bg-amber-900/50 text-amber-300 border-amber-700",
  purist: "bg-rose-900/50 text-rose-300 border-rose-700",
  researcher: "bg-cyan-950/50 text-cyan-300 border-cyan-800",
  skeptic: "bg-zinc-800 text-zinc-300 border-zinc-600",
  student: "bg-cyan-900/50 text-cyan-300 border-cyan-700",
};

function DeleteResponseButton({ id }: { id: string }) {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function remove() {
    const confirmed = window.confirm("Delete this response?");
    if (!confirmed) return;
    setSaving(true);
    await fetch(`/api/admin/responses/${id}`, {
      method: "DELETE",
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <button
      onClick={remove}
      disabled={saving}
      className="px-2.5 py-1 rounded-full text-xs font-medium border bg-red-950/40 text-red-300 border-red-800 hover:border-red-600 transition-colors disabled:opacity-50"
    >
      Delete
    </button>
  );
}

function NotesCell({ id, initial }: { id: string; initial: string | null }) {
  const [notes, setNotes] = useState(initial ?? "");
  const [saved, setSaved] = useState(true);

  async function save() {
    await fetch(`/api/admin/responses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchNotes: notes }),
    });
    setSaved(true);
  }

  return (
    <div className="flex items-center gap-1.5">
      <input
        value={notes}
        onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
        onBlur={save}
        onKeyDown={(e) => e.key === "Enter" && save()}
        placeholder="Add note…"
        className="bg-transparent border-b border-transparent hover:border-neutral-600 focus:border-violet-500 focus:outline-none text-xs text-neutral-300 placeholder:text-neutral-700 w-36 py-0.5 transition-colors"
      />
      {!saved && <span className="text-xs text-neutral-600">•</span>}
    </div>
  );
}

export function ResponseTable({ responses }: { responses: Response[] }) {
  if (responses.length === 0) {
    return (
      <p className="text-sm text-neutral-500 py-12 text-center">
        No responses yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-neutral-800">
            {["Date", "Name", "Email", "Archetype", "Notes", "", ""].map((h) => (
              <th
                key={h}
                className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider pb-3 pr-6 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responses.map((r) => (
            <tr key={r.id} className="border-b border-neutral-900 hover:bg-neutral-900/30">
              <td className="py-3 pr-6 text-xs text-neutral-500 whitespace-nowrap">
                {new Date(r.createdAt).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </td>
              <td className="py-3 pr-6 font-medium text-neutral-200 whitespace-nowrap">
                {r.name}
              </td>
              <td className="py-3 pr-6 text-neutral-400 whitespace-nowrap">
                {r.email}
              </td>
              <td className="py-3 pr-6">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                    ARCHETYPE_COLORS[r.archetype] ?? "bg-neutral-800 text-neutral-400 border-neutral-700"
                  }`}
                >
                  {r.archetype}
                </span>
              </td>
              <td className="py-3 pr-6">
                <NotesCell id={r.id} initial={r.matchNotes} />
              </td>
              <td className="py-3 pr-6">
                <Link
                  href={`/admin/${r.id}`}
                  className="text-xs text-violet-400 hover:text-violet-300 whitespace-nowrap"
                >
                  View →
                </Link>
              </td>
              <td className="py-3">
                <DeleteResponseButton id={r.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
