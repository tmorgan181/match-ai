import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-xl flex flex-col gap-6">
        <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
          ← Back
        </Link>

        <h1 className="text-2xl font-bold">Privacy Policy</h1>
        <p className="text-xs text-neutral-500">match.ai beta · last updated March 2026</p>

        <div className="flex flex-col gap-5 text-sm text-neutral-300 leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-neutral-100">What we collect</h2>
            <p>
              When you complete the survey, we store your survey answers, the archetype assigned
              to you, and the timestamp of your submission. We do not collect IP addresses, device
              identifiers, or any data beyond what you type into the form.
            </p>
            <p>
              Name and email are <strong className="text-neutral-200">optional</strong>. You may
              complete the survey anonymously — your archetype and answers will still be recorded,
              but we will have no way to contact you. If you provide your name and email, you are
              consenting separately to be contacted for a potential collaborator introduction.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-neutral-100">How we use it</h2>
            <p>
              Your responses are used to validate the archetype model and understand how people
              think about AI ethics. If you left your email, we will use it only to notify you
              about future updates — more questions, archetypes, domains, and ways to connect.
            </p>
            <p>
              Your free-text answers may also be used to generate a personalised reflection shown
              to you on the result page.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-neutral-100">Who can see your data</h2>
            <p>
              Only the project administrator can view your responses. We do not share, sell, or
              transfer your data to any third party.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-neutral-100">Data security</h2>
            <p>
              This is a beta project. Data is stored in a local SQLite database with no guarantees
              of enterprise-grade security. We take reasonable precautions but cannot promise
              protection against all risks. By consenting to the survey, you acknowledge this.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-neutral-100">Deletion requests</h2>
            <p>
              You can request deletion of your data at any time by emailing us with the email
              address you submitted. We will delete your record within 7 days.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-neutral-100">Cookies</h2>
            <p>
              We do not use tracking cookies or analytics. The only cookies set are those required
              for Next.js to function.
            </p>
          </section>
        </div>

        <div className="pt-4">
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
