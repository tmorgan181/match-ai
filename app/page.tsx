import { ARCHETYPES } from "@/lib/archetypes/definitions";
import Link from "next/link";
import DeleteDataButton from "./components/DeleteDataButton";
import NotifyButton from "./components/NotifyButton";

const ARCHETYPE_GRID = [
  "builder",
  "guardian",
  "advocate",
  "student",
  "researcher",
  "optimist",
  "pragmatist",
  "skeptic",
  "purist",
  "antagonist",
  "displaced",
  "doomer",
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-24 pb-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 font-medium mb-4">
          Beta
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          Find your focus in the AI ethics conversation.
          {/* Find your people in the AI ethics conversation. */}
        </h1>
        <p className="mt-5 text-lg text-neutral-400 max-w-xl leading-relaxed">
          Take a short survey. Get your archetype. Find your focus in the AI landscape and use it for good.
          {/* If we find someone whose
          perspective complements yours, we'll make an introduction — by hand. */}
        </p>
        <Link
          href="/survey"
          className="mt-8 inline-block px-7 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors"
        >
          Take the survey →
        </Link>
        <p className="mt-3 text-xs text-neutral-600">
          ~8 minutes · no account required · open beta
        </p>
      </section>

      {/* How it works */}
      <section className="px-4 pb-20 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-8 text-center">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Take the survey",
                body: "A hand-crafted set of questions about your views on AI, your background, and what you want to build or change.",
              },
              {
                step: "02",
                title: "Get your archetype",
                body: "You'll be assigned an AI archetype based on your answers, with a short reflection on your perspective.",
              },
              {
                step: "03",
                title: "Make a difference",
                body: "Use your understanding of your own perspective to engage more thoughtfully in the conversation and build a better future for AI.",
                // title: "We make the intro",
                // body: "If we find a good complement — someone whose skills and stance fit yours — we'll email both of you. No platform, no DMs.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex flex-col gap-2">
                <span className="text-xs text-violet-500 font-mono">{step}</span>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archetype previews */}
      <section className="px-4 pb-20 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-8 text-center">
            The AI archetypes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {ARCHETYPE_GRID.map((key) => {
              const archetype = ARCHETYPES[key];
              return (
                <Link
                  key={archetype.name}
                  href={`/archetypes/${key}`}
                  className="group rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-4 min-h-36 flex items-center justify-center text-center transition-colors hover:border-violet-700 hover:bg-neutral-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-lg font-semibold leading-tight">{archetype.name}</p>
                    <p className="text-sm text-violet-400 italic leading-relaxed">{archetype.tagline}</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {archetype.strengths.join(" · ")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Focus note */}
      <section className="px-4 pb-20 flex flex-col items-center">
        <div className="w-full max-w-xl rounded-xl border border-neutral-800 bg-neutral-900/30 px-6 py-5">
          <p className="text-sm text-neutral-400 leading-relaxed">
            <span className="text-neutral-200 font-medium">This is version one.</span><br></br>{" "}
            The survey focuses on a few specific domains in AI ethics. For now, we're keeping it tight so the
            insights are meaningful.{" "}
            <NotifyButton /> for future updates — more questions, archetypes, domains, and ways to connect with others.
          </p>
        </div>
      </section>

      {/* CTA footer */}
      <section className="px-4 pb-24 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold">Ready to find out where you stand?</h2>
        <Link
          href="/survey"
          className="inline-block px-7 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors"
        >
          Take the survey →
        </Link>
        <Link
          href="/privacy"
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
        >
          Privacy policy
        </Link>
        <DeleteDataButton />
      </section>

    </main>
  );
}
