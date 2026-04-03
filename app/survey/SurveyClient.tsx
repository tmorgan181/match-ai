"use client";

import { STEPS } from "@/lib/survey/questions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = Record<string, string | number>;

const TOTAL_STEPS = STEPS.length;
const SURVEY_DRAFT_KEY = "match-ai-survey-draft";

type SurveyDraft = {
  step: number;
  values: FormValues;
};

const QUESTION_NUMBERS = Object.fromEntries(
  STEPS.flatMap((surveyStep) => surveyStep.questions).map((question, index) => [
    question.id,
    String(index + 1).padStart(2, "0"),
  ])
) as Record<string, string>;

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const saveParam = searchParams.get("save");
  const saveData = saveParam === "true";
  const [showConsentModal, setShowConsentModal] = useState(saveParam === null);
  const [consentChoice, setConsentChoice] = useState<"save" | "anon" | null>(null);
  const [consentModalMode, setConsentModalMode] = useState<"entry" | "switch">(saveParam === null ? "entry" : "switch");
  const hydratedRef = useRef(false);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } =
    useForm<FormValues>({ mode: "onTouched" });
  const watchedValues = watch();

  const currentStep = STEPS[step];
  const isLastStep = step === TOTAL_STEPS - 1;
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  useEffect(() => {
    if (hydratedRef.current) return;

    try {
      const rawDraft = window.localStorage.getItem(SURVEY_DRAFT_KEY);
      if (!rawDraft) {
        hydratedRef.current = true;
        return;
      }

      const draft = JSON.parse(rawDraft) as SurveyDraft;
      if (draft.values) reset(draft.values);
      if (typeof draft.step === "number") {
        const nextStep = Math.min(Math.max(draft.step, 0), TOTAL_STEPS - 1);
        setStep(nextStep);
      }
    } catch {
      window.localStorage.removeItem(SURVEY_DRAFT_KEY);
    } finally {
      hydratedRef.current = true;
    }
  }, [reset]);

  useEffect(() => {
    if (!hydratedRef.current) return;

    try {
      const draft: SurveyDraft = {
        step,
        values: watchedValues as FormValues,
      };
      window.localStorage.setItem(SURVEY_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Ignore draft persistence failures so the survey never hard-crashes.
    }
  }, [step, watchedValues]);

  function skipQuestion(id: string) {
    setValue(id, "" as never, { shouldValidate: false });
  }

  function pickAnswer(id: string, value: string | number) {
    setValue(id, value as never, { shouldValidate: true });
  }

  function onNext() {
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openConsentModal(mode: "entry" | "switch") {
    setConsentModalMode(mode);
    setConsentChoice(null);
    setShowConsentModal(true);
  }

  function closeConsentModal() {
    setConsentChoice(null);
    setShowConsentModal(false);
  }

  function restartSurvey() {
    reset({});
    setStep(0);
    setError(null);
    setConsentChoice(null);
    closeConsentModal();
    try {
      window.localStorage.removeItem(SURVEY_DRAFT_KEY);
    } catch {
      // Ignore storage failures so restart still works.
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    setError(null);

    // Coerce scale answers from string → number, drop empty/skipped fields
    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data)) {
      if (v === "" || v === undefined || v === null) continue;
      const scaleIds = ["q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15","q16","q29","q30","q31","q32"];
      if (scaleIds.includes(k)) {
        const n = Number(v);
        if (!isNaN(n) && n >= 1 && n <= 5) cleaned[k] = n;
      } else if (k === "consentMatching") {
        cleaned[k] = v === "true" || String(v) === "true";
      } else {
        cleaned[k] = v;
      }
    }

    if (!saveData) {
      // No research consent — compute archetype only, nothing stored
      try {
        const res = await fetch("/api/survey/compute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleaned),
        });
        if (!res.ok) {
          const json = await res.json();
          setError(json.error ?? "Something went wrong. Please try again.");
          setSubmitting(false);
          return;
        }
        const { archetype } = await res.json();
        window.localStorage.removeItem(SURVEY_DRAFT_KEY);
        router.push(`/survey/result?a=${archetype}`);
      } catch {
        setError("Network error. Please check your connection and try again.");
        setSubmitting(false);
      }
      return;
    }

    // Research consent given — save to DB
    cleaned.consentResearch = true;

    async function submitSaved(confirmOverwrite = false) {
      return fetch("/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cleaned, confirmOverwrite }),
      });
    }

    try {
      let res = await submitSaved(false);

      if (res.status === 409) {
        const json = await res.json();
        const confirmed = window.confirm(
          `${json.message ?? "A saved response already exists for this email."}\n\nPress OK to overwrite the existing saved response, or Cancel to keep the current one.`
        );

        if (!confirmed) {
          setSubmitting(false);
          return;
        }

        res = await submitSaved(true);
      }

      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      const { id } = await res.json();
      window.localStorage.removeItem(SURVEY_DRAFT_KEY);
      router.push(`/survey/${id}/result`);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center px-4 py-12">
      {/* Progress bar */}
      <div className="w-full max-w-xl mb-8">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Step {step + 1} of {TOTAL_STEPS}</span>
          <span>{currentStep.title}</span>
        </div>
        <div className="h-1 bg-neutral-800 rounded-full">
          <div
            className="h-1 bg-violet-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl flex flex-col gap-8">

        {/* Question steps */}
        {step < TOTAL_STEPS - 1 && (
          <div className="flex flex-col gap-8">
            <p className="text-sm text-neutral-500 leading-relaxed">{currentStep.instruction}</p>
            {currentStep.questions.map((q) => {
              const isRequired = false;
              const val = watch(q.id);

              return (
                <div key={q.id} className="flex flex-col gap-3">
                  <span className="text-xs text-violet-500 font-mono">
                    {QUESTION_NUMBERS[q.id]}
                  </span>
                  <div className="flex items-start justify-between gap-4">
                    <label className="text-base font-medium leading-snug">{q.text}</label>
                    {!isRequired && (
                      <button
                        type="button"
                        onClick={() => skipQuestion(q.id)}
                        className="text-xs text-neutral-600 hover:text-neutral-400 shrink-0 mt-0.5 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {q.type === "text" && (
                    <>
                      {q.hint && <p className="text-sm text-neutral-400">{q.hint}</p>}
                      <textarea
                        {...register(q.id)}
                        rows={q.id === "q1" ? 1 : 3}
                        placeholder={q.placeholder}
                        className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-violet-500 placeholder:text-neutral-600"
                      />
                      {errors[q.id] && (
                        <p className="text-xs text-red-400">{String(errors[q.id]?.message)}</p>
                      )}
                    </>
                  )}

                  {q.type === "scale" && (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((n) => {
                          const selected = Number(val) === n;
                          return (
                            <button
                              key={n}
                              type="button"
                              onClick={() => pickAnswer(q.id, n)}
                              className={`flex-1 h-10 rounded-lg text-sm font-medium border transition-colors ${
                                selected
                                  ? "bg-violet-600 border-violet-600 text-white"
                                  : "bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-violet-500"
                              }`}
                            >
                              {n}
                            </button>
                          );
                        })}
                      </div>
                      {q.lowLabel && (
                        <div className="flex justify-between text-xs text-neutral-500">
                          <span>{q.lowLabel}</span>
                          <span>{q.highLabel}</span>
                        </div>
                      )}
                      <input type="hidden" {...register(q.id)} />
                    </div>
                  )}

                  {q.type === "yns" && (
                    <div className="flex gap-2">
                      {(["yes", "sometimes", "no"] as const).map((opt) => {
                        const selected = val === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => pickAnswer(q.id, opt)}
                            className={`flex-1 h-10 rounded-lg text-sm font-medium border capitalize transition-colors ${
                              selected
                                ? "bg-violet-600 border-violet-600 text-white"
                                : "bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-violet-500"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === "choice" && (
                    <div className="flex flex-col gap-2">
                      {q.options.map((opt) => {
                        const selected = val === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => pickAnswer(q.id, opt.value)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm border transition-colors ${
                              selected
                                ? "bg-violet-600 border-violet-600 text-white"
                                : "bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-violet-500"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}


                </div>
              );
            })}
          </div>
        )}

        {/* Final step: contact & consent */}
        {isLastStep && (
          <div className="flex flex-col gap-6">
            <p className="text-sm text-neutral-500 leading-relaxed">{currentStep.instruction}</p>
            {saveData ? (
              <>
                <div>
                  <h2 className="text-lg font-semibold mb-1">One last thing</h2>
                  <p className="text-sm text-neutral-400">
                    Leave your details if you'd like to hear about future updates. Skip them to stay anonymous — your archetype and answers will still be recorded.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">
                    Name <span className="text-neutral-600 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name, or leave blank to stay anonymous"
                    {...register("name")}
                    className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 placeholder:text-neutral-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">
                    Email{" "}
                    {watch("consentMatching")
                      ? <span className="text-red-400 font-normal text-xs">required for update notifications</span>
                      : <span className="text-neutral-600 font-normal">(optional)</span>
                    }
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: watch("consentMatching") ? "Email is required to receive update notifications" : false,
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                    })}
                    className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 placeholder:text-neutral-600"
                  />
                  {errors.email && <p className="text-xs text-red-400">{String(errors.email.message)}</p>}
                </div>

                <label className="flex gap-3 items-start cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("consentMatching")}
                    value="true"
                    className="mt-0.5 accent-violet-500 w-4 h-4 shrink-0"
                  />
                  <span className="text-sm text-neutral-300 leading-snug">
                    Notify me about future updates — more questions, archetypes, domains, and ways to connect.{" "}
                    <span className="text-neutral-500">(optional — requires email above)</span>
                  </span>
                </label>
              </>
            ) : (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 px-5 py-4">
                <p className="text-sm text-neutral-400 leading-relaxed">
                  <span className="text-neutral-200 font-medium">Anonymous mode.</span>{" "}
                  Your answers will be used to compute your archetype on the spot. Nothing will be stored.
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-4">
              <p className="text-xs text-neutral-600">
                {saveData ? "Responses will be recorded." : "Nothing will be stored."}
              </p>
              <button
                type="button"
                onClick={() => saveData ? router.replace("/survey?save=false") : setShowConsentModal(true)}
                className="text-xs text-violet-500 hover:text-violet-400 transition-colors shrink-0"
              >
                {saveData ? "Switch to anonymous mode" : "Switch to research mode"}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-950 border border-red-800 rounded-lg px-4 py-3">
                {error}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <button
              type="button"
              onClick={() => { setStep((s) => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-5 py-2.5 rounded-lg text-sm border border-neutral-700 text-neutral-300 hover:border-neutral-500 transition-colors"
            >
              Back
            </button>
          )}

          {!isLastStep && (
            <button
              type="button"
              onClick={onNext}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors"
            >
              Continue
            </button>
          )}

          {isLastStep && (
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
            >
              {submitting ? "Submitting…" : "See my archetype"}
            </button>
          )}
        </div>

        <div className="pt-1 flex items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={restartSurvey}
            className="cursor-pointer text-xs text-neutral-600 hover:text-neutral-400 underline underline-offset-2 transition-colors"
          >
            Restart survey
          </button>
          <button
            type="button"
            onClick={() => saveData ? router.replace("/survey?save=false") : openConsentModal("switch")}
            className="cursor-pointer text-xs text-violet-500 hover:text-violet-400 underline underline-offset-2 transition-colors"
          >
            {saveData ? "Switch to anonymous mode" : "Switch to saved mode"}
          </button>
          <a
            href="/privacy"
            className="text-xs text-neutral-600 hover:text-neutral-400 underline underline-offset-2 transition-colors"
          >
            Privacy policy
          </a>
        </div>
      </form>

      {/* Consent modal */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={closeConsentModal} />
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-lg font-semibold">Before you start</h2>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setConsentChoice("save")}
                className={`cursor-pointer rounded-xl border px-4 py-3 flex flex-col gap-1 text-left transition-colors ${consentChoice === "save" ? "border-violet-600 bg-violet-950/60" : "border-neutral-700 bg-neutral-800/40 hover:border-violet-800 hover:bg-violet-950/20"}`}
              >
                <p className="text-sm font-medium text-violet-300">Consent to data storage</p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Responses stored for research. Not commercial, not sold, not used to train models.
                  Optionally leave your email to be notified about future updates.
                </p>
              </button>
              <button
                type="button"
                onClick={() => setConsentChoice("anon")}
                className={`cursor-pointer rounded-xl border px-4 py-3 flex flex-col gap-1 text-left transition-colors ${consentChoice === "anon" ? "border-violet-600 bg-violet-950/60" : "border-neutral-700 bg-neutral-800/40 hover:border-violet-800 hover:bg-violet-950/20"}`}
              >
                <p className="text-sm font-medium text-violet-300">Anonymous — nothing stored</p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Archetype computed on the spot. Nothing stored, no email, no notifications.
                </p>
              </button>
            </div>

            <button
              type="button"
              disabled={!consentChoice}
              onClick={() => {
                router.replace(consentChoice === "save" ? "/survey?save=true" : "/survey?save=false");
                closeConsentModal();
              }}
              className="cursor-pointer w-full py-2.5 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
            >
              Confirm
            </button>

            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-xs text-neutral-600 leading-relaxed">
                Your responses will not be sold, shared with third parties, or used to train AI models.
                This is a beta project — security is best-effort, not enterprise-grade.
                You can request deletion of your data at any time.
              </p>
              <div className="flex gap-3 text-xs">
                <a href="/privacy" className="text-violet-500 hover:text-violet-400 underline underline-offset-2">Privacy policy</a>
                <button
                  type="button"
                  onClick={() => {
                    if (consentModalMode === "switch") {
                      closeConsentModal();
                      return;
                    }
                    router.push("/");
                  }}
                  className="cursor-pointer text-neutral-600 hover:text-neutral-400 transition-colors"
                >
                  No thanks, go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
