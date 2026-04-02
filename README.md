# match.ai

`match.ai` is an independent AI archetype quiz built to help people locate themselves in the AI conversation.

The current product focus is the quiz itself:

- anonymous participation if desired
- lightweight self-reflection on AI attitudes and concerns
- shareable archetype results

Matching is intentionally deferred for now. The near-term goal is to make the archetype quiz strong, legible, and broadly useful on its own.

## Current Status

This repo contains a working MVP built with Next.js, React, TypeScript, Drizzle, and SQLite.

Current features:

- landing page and survey flow
- anonymous mode and saved-response mode
- deterministic archetype scoring
- result pages with static debrief copy
- admin dashboard for reviewing submissions
- update-notification signup and delete-data flow

## Product Framing

This is not a validated psychological instrument or formal academic study.

It is best understood as:

- an exploratory archetype quiz
- an independent product/research-adjacent experiment
- a tool for helping people reflect on how they relate to AI

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Drizzle ORM
- SQLite
- Vitest

## Local Setup

Install dependencies:

```bash
npm install
```

Create local environment config by copying `.env.local.example` to `.env.local`.

Set at least:

```env
ADMIN_SECRET=your-password-here
```

## Running Locally

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm test
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Data Notes

- survey responses are stored locally in SQLite when the user opts into saved mode
- anonymous mode computes an archetype result without storing responses
- notification signups are stored separately
- local database files are ignored in git

## Admin

The admin area is protected by `ADMIN_SECRET`.

- login page: `/admin/login`
- dashboard: `/admin`

## Docs

Project thinking and roadmap notes live in [`docs/`](/Users/tmorg/Projects/match-ai/docs):

- [MVP requirements](/Users/tmorg/Projects/match-ai/docs/MVP_requirements.md)
- [Technical spec](/Users/tmorg/Projects/match-ai/docs/technical_spec.md)
- [V2 requirements](/Users/tmorg/Projects/match-ai/docs/V2_requirements.md)
- [Archetype quiz rework plan](/Users/tmorg/Projects/match-ai/docs/archetype_quiz_rework_plan.md)
- [Archetype decisions](/Users/tmorg/Projects/match-ai/docs/archetype_quiz_decisions.md)
- [Archetypes v2 draft](/Users/tmorg/Projects/match-ai/docs/archetypes_v2_draft.md)
- [Survey v2 question set](/Users/tmorg/Projects/match-ai/docs/survey_v2_question_set.md)

## Near-Term Priorities

- improve archetype separation
- move from 8 archetypes to a stronger 9-archetype model
- revise the question set for better differentiation and broader accessibility
- keep the quiz lightweight enough for public sharing

## License

No license has been added yet.
