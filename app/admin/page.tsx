import { db } from "@/lib/db";
import { notifySignups, responses } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import type { Metadata } from "next";
import { ResponseTable } from "./ResponseTable";

export const metadata: Metadata = { title: "Admin" };

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [all, signups] = await Promise.all([
    db.select().from(responses).orderBy(desc(responses.createdAt)),
    db.select().from(notifySignups).orderBy(desc(notifySignups.createdAt)),
  ]);

  const matchedCount = all.filter((r) => r.matchedAt).length;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-bold">Responses</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {all.length} total · {matchedCount} matched
            </p>
          </div>
          <a href="/" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">
            ← Site
          </a>
        </div>

        <ResponseTable responses={all} />

        {/* Notification signups */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-base font-semibold">Update Notification Signups</h2>
            <p className="text-sm text-neutral-500 mt-0.5">{signups.length} signed up</p>
          </div>
          {signups.length === 0 ? (
            <p className="text-sm text-neutral-600">No signups yet.</p>
          ) : (
            <div className="rounded-xl border border-neutral-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-xs text-neutral-500 uppercase tracking-wide">
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">Signed up</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((s) => (
                    <tr key={s.id} className="border-b border-neutral-800/50 last:border-0">
                      <td className="px-4 py-2 text-neutral-300">{s.email}</td>
                      <td className="px-4 py-2 text-neutral-500 tabular-nums">{s.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
