import { ARCHETYPES, type ArchetypeKey } from "@/lib/archetypes/definitions";
import { getStaticDebrief } from "@/lib/debrief/static";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  if (!(id in ARCHETYPES)) return { title: "Archetype" };

  const archetype = ARCHETYPES[id as ArchetypeKey];
  return {
    title: archetype.name,
    description: archetype.tagline,
    openGraph: {
      title: `${archetype.name} — match.ai`,
      description: archetype.tagline,
      type: "website",
    },
  };
}

export default async function ArchetypeDetailPage({ params }: Props) {
  const { id } = await params;
  if (!(id in ARCHETYPES)) notFound();

  const archetypeKey = id as ArchetypeKey;
  const archetype = ARCHETYPES[archetypeKey];
  const debrief = getStaticDebrief(archetypeKey);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
          ← Back
        </Link>

        <div className="rounded-2xl border border-violet-800 bg-violet-950/40 px-6 py-8 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest text-violet-400 font-medium">
            Archetype profile
          </p>
          <h1 className="text-3xl font-bold">{archetype.name}</h1>
          <p className="text-violet-300 text-base italic">{archetype.tagline}</p>
          <p className="text-neutral-300 text-sm leading-relaxed mt-1">
            {archetype.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {archetype.strengths.map((strength) => (
              <span
                key={strength}
                className="text-xs px-3 py-1 rounded-full bg-violet-900/50 border border-violet-700 text-violet-300"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm uppercase tracking-widest text-neutral-500 font-medium">
            Reflection
          </h2>
          <p className="text-neutral-200 text-base leading-relaxed">{debrief}</p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 py-5 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-neutral-200">Want your own result?</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Take the survey to see which archetype fits your answers and get your own result page.
          </p>
          <Link
            href="/survey"
            className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-2"
          >
            Take the survey →
          </Link>
        </div>
      </div>
    </main>
  );
}
