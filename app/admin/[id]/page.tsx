import { ARCHETYPES, type ArchetypeKey } from "@/lib/archetypes/definitions";
import { STEPS } from "@/lib/survey/questions";
import { db } from "@/lib/db";
import { responses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminResponsePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [response] = await db
    .select()
    .from(responses)
    .where(eq(responses.id, id))
    .limit(1);

  if (!response) notFound();

  const archetype = ARCHETYPES[response.archetype as ArchetypeKey];
  const answers = JSON.parse(response.answers) as Record<string, string | number>;
  const parsedScoreData = JSON.parse(response.scoreData) as {
    scores?: Record<string, number>;
    confidence?: number;
  } | Record<string, number>;
  const scores = "scores" in parsedScoreData && parsedScoreData.scores
    ? parsedScoreData.scores
    : parsedScoreData as Record<string, number>;
  const maxScore = Math.max(...Object.values(scores), 1);

  // Build a flat question map for lookup
  const questionMap: Record<string, string> = {};
  for (const step of STEPS) {
    for (const q of step.questions) {
      questionMap[q.id] = q.text;
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-xs text-neutral-500 hover:text-neutral-300">
            ← All responses
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">{response.name}</h1>
          <p className="text-sm text-neutral-400">{response.email}</p>
          <p className="text-xs text-neutral-600 mt-1">
            Submitted{" "}
            {new Date(response.createdAt).toLocaleDateString("en-US", {
              month: "long", day: "numeric", year: "numeric",
            })}
          </p>
        </div>

        {/* Archetype + scores */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 py-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold">{archetype.name}</span>
            <span className="text-xs text-violet-400">{archetype.tagline}</span>
            {"confidence" in parsedScoreData && typeof parsedScoreData.confidence === "number" && (
              <span className="text-xs text-neutral-500">
                {parsedScoreData.confidence}% confidence
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(scores)
              .sort(([, a], [, b]) => b - a)
              .map(([key, score]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="text-xs text-neutral-400 capitalize">{key}</span>
                  <div className="w-16 h-1.5 bg-neutral-800 rounded-full">
                    <div
                      className="h-1.5 bg-violet-500 rounded-full"
                      style={{ width: `${Math.max(0, (score / maxScore) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-600">{score}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 py-5 flex flex-col gap-2">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Admin notes</p>
          <p className="text-sm text-neutral-300">{response.matchNotes || "None"}</p>
          {response.matchedAt && (
            <p className="text-xs text-violet-400 mt-1">
              Matched {new Date(response.matchedAt).toLocaleDateString()}
              {response.matchedWith && ` · with ${response.matchedWith}`}
            </p>
          )}
        </div>

        {/* All answers */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Full answers
          </h2>
          {Object.entries(answers).map(([qId, answer]) => {
            const questionText = questionMap[qId];
            if (!questionText) return null;
            return (
              <div key={qId} className="flex flex-col gap-1 border-b border-neutral-900 pb-4">
                <p className="text-xs text-neutral-500">{questionText}</p>
                <p className="text-sm text-neutral-200">{String(answer)}</p>
              </div>
            );
          })}
        </div>

        {/* Debrief */}
        {response.debrief && (
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Debrief shown to user
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">{response.debrief}</p>
          </div>
        )}

      </div>
    </main>
  );
}
