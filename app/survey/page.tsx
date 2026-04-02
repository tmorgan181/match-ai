import { Suspense } from "react";
import SurveyClient from "./SurveyClient";

function SurveyFallback() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4 py-12">
      <p className="text-sm text-neutral-500">Loading survey...</p>
    </main>
  );
}

export default function SurveyPage() {
  return (
    <Suspense fallback={<SurveyFallback />}>
      <SurveyClient />
    </Suspense>
  );
}
