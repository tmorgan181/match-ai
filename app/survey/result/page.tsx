import { ARCHETYPES, type ArchetypeKey } from "@/lib/archetypes/definitions";
import { getStaticDebrief } from "@/lib/debrief/static";
import EmailResultsButton from "@/app/components/EmailResultsButton";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { searchParams: Promise<{ a?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { a } = await searchParams;
  if (!a || !(a in ARCHETYPES)) return { title: "Your archetype" };
  return { title: `${ARCHETYPES[a as ArchetypeKey].name}` };
}

export default async function EphemeralResultPage({ searchParams }: Props) {
  const { a } = await searchParams;

  if (!a || !(a in ARCHETYPES)) notFound();

  const archetypeKey = a as ArchetypeKey;
  const archetype = ARCHETYPES[archetypeKey];
  const debrief = getStaticDebrief(archetypeKey);

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

        {/* Anonymous mode notice */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 py-5 flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-neutral-300">Nothing was stored</h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            You chose anonymous mode — your answers and archetype were not saved. If you'd like to be notified about future updates, retake the survey and consent to data storage.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3">
          <EmailResultsButton
            archetypeName={archetype.name}
            tagline={archetype.tagline}
            reflection={debrief}
          />
          <Link
            href="/survey"
            className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-2"
          >
            Retake and save responses →
          </Link>
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
