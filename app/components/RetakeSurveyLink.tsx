"use client";

import Link from "next/link";

const SURVEY_DRAFT_KEY = "match-ai-survey-draft";

type Props = {
  href?: string;
  className?: string;
  children: React.ReactNode;
};

export default function RetakeSurveyLink({ href = "/survey", className, children }: Props) {
  return (
    <Link
      href={href}
      onClick={() => {
        try {
          window.localStorage.removeItem(SURVEY_DRAFT_KEY);
        } catch {
          // Ignore storage failures so retake still works.
        }
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
