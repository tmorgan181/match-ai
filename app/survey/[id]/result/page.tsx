import { ARCHETYPES, type ArchetypeKey } from "@/lib/archetypes/definitions";
import EmailResultsButton from "@/app/components/EmailResultsButton";
import { getStaticDebrief } from "@/lib/debrief/static";
import { db } from "@/lib/db";
import { responses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShareButton from "./ShareButton";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const [response] = await db
    .select({ archetype: responses.archetype })
    .from(responses)
    .where(eq(responses.id, id))
    .limit(1);

  if (!response) return {};

  const archetype = ARCHETYPES[response.archetype as ArchetypeKey];
  return {
    title: archetype.name,
    description: `${archetype.tagline} Take the survey to find your AI ethics archetype.`,
    openGraph: {
      title: `I'm ${archetype.name} — match.ai`,
      description: `${archetype.tagline} Take the survey to find your archetype.`,
      type: "website",
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { id } = await params;
  const [response] = await db
    .select()
    .from(responses)
    .where(eq(responses.id, id))
    .limit(1);

  if (!response) notFound();

  const archetype = ARCHETYPES[response.archetype as ArchetypeKey];
  const debrief = response.debrief ?? getStaticDebrief(response.archetype as ArchetypeKey);

  // Cache the debrief on first view
  if (!response.debrief) {
    await db
      .update(responses)
      .set({ debrief })
      .where(eq(responses.id, id));
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-xl flex flex-col gap-8">

        {/* Archetype card */}
        <div className="rounded-2xl border border-violet-800 bg-violet-950/40 px-6 py-8 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest text-violet-400 font-medium">
            Your archetype
          </p>
          <h1 className="text-3xl font-bold">{archetype.name}</h1>
          <p className="text-violet-300 text-base italic">{archetype.tagline}</p>
          <p className="text-neutral-300 text-sm leading-relaxed mt-1">
            {archetype.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {archetype.strengths.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full bg-violet-900/50 border border-violet-700 text-violet-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Debrief */}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm uppercase tracking-widest text-neutral-500 font-medium">
            Reflection
          </h2>
          <p className="text-neutral-200 text-base leading-relaxed">{debrief}</p>
        </div>

        {/* What happens next */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 py-5 flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-neutral-300">What happens next</h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Your responses have been recorded. We're using submissions to validate the archetype model and shape what comes next.
          </p>
          {response.consentMatching && (
            <p className="text-sm text-neutral-400 leading-relaxed">
              We'll reach out to the email you provided when updates launch — more questions, archetypes, and ways to connect.
            </p>
          )}
          <p className="text-sm text-neutral-400 leading-relaxed">
            This is an open beta. We're figuring it out as we go.
          </p>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-3">
          <EmailResultsButton
            archetypeName={archetype.name}
            tagline={archetype.tagline}
            reflection={debrief}
          />
          <ShareButton
            title={`I'm ${archetype.name} — match.ai`}
            text={`${archetype.tagline} Take the survey to find your AI ethics archetype.`}
          />
          <a
            href="/survey"
            className="text-xs text-neutral-600 hover:text-neutral-400 underline underline-offset-2 transition-colors"
          >
            Know someone who should take this? Share the survey →
          </a>
        </div>

      </div>
    </main>
  );
}
