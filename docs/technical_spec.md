# match.ai — Technical Specification (MVP)

## Summary

Single-developer web app for surveying AI ethics stances, assigning archetypes, generating AI debriefs, and supporting manual user matching. Solo admin. No user accounts. Open source.

---

## Stack Decision

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Type safety for form data and DB schema; standard for Next.js |
| Framework | Next.js 15 (App Router) | Handles routing, SSR, and API routes in one repo; fits solo-dev workflow |
| Styling | Tailwind CSS | Fast utility-first styling; no design system overhead for MVP |
| Database | SQLite via Drizzle ORM | Matches requirements doc; Drizzle is lightweight and type-safe |
| Hosting | Cloudflare Tunnel (local) or Railway (~$5/mo) | Cloudflare Tunnel is zero-cost for early beta; Railway if stable URL needed without babysitting a machine |
| AI (primary) | Ollama `llama3.2:3b` (local) | Fast enough for debriefs; free; no API key or billing risk |
| AI (fallback) | Static per-archetype debrief template | Used when Ollama unavailable in prod; no Claude API dependency for MVP |
| Email | Resend + React Email | Better DX than SendGrid; 3k free emails/month; React templates |
| Form handling | React Hook Form + Zod | Validation at form and API boundary |
| Admin auth | Env-var secret + middleware | Single admin; no auth library needed for MVP |
| Spam protection | None for MVP | Reddit-sourced traffic doesn't warrant bot protection until there's evidence of abuse |

---

## Architecture

```
match-ai/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── survey/
│   │   ├── page.tsx              # Multi-step survey form
│   │   └── [id]/result/page.tsx  # Archetype result + debrief
│   └── admin/
│       ├── page.tsx              # Response list + match review
│       └── match/[id]/page.tsx   # Side-by-side match interface
├── api/
│   ├── survey/submit/route.ts    # POST: save response, assign archetype
│   ├── debrief/[id]/route.ts     # GET: stream AI debrief
│   └── admin/
│       ├── responses/route.ts    # GET: list all responses
│       └── email/route.ts        # POST: send intro email
├── lib/
│   ├── db/
│   │   ├── schema.ts             # Drizzle schema definitions
│   │   └── index.ts              # DB connection
│   ├── archetypes/
│   │   ├── definitions.ts        # Archetype names, descriptions, criteria
│   │   └── scoring.ts            # Response → archetype assignment logic
│   ├── debrief/
│   │   ├── ollama.ts             # Ollama client + prompt
│   │   └── claude.ts             # Claude API client + prompt (optional path)
│   └── email/
│       ├── templates/intro.tsx   # React Email intro template
│       └── send.ts               # Resend wrapper
├── components/
│   ├── survey/                   # Survey step components
│   ├── archetypes/               # Result card, share button
│   └── admin/                   # Response table, match UI
└── db.sqlite                     # Local SQLite file (dev + self-hosted prod)
```

---

## Database Schema

```typescript
// lib/db/schema.ts (Drizzle)

responses (
  id            TEXT PRIMARY KEY,   // nanoid
  created_at    TEXT NOT NULL,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  consent       INTEGER NOT NULL,   // 0 | 1 (GDPR)
  archetype     TEXT NOT NULL,      // e.g. "guardian"
  score_data    TEXT NOT NULL,      // JSON: raw archetype scores
  answers       TEXT NOT NULL,      // JSON: full question→answer map
  skills        TEXT,               // JSON: selected skills
  collab_prefs  TEXT,               // JSON: collaboration preferences
  open_text_1   TEXT,               // short text response 1
  open_text_2   TEXT,               // short text response 2
  debrief       TEXT,               // AI-generated debrief (cached)
  matched_with  TEXT,               // FK → another response id (nullable)
  matched_at    TEXT,               // ISO timestamp
  match_notes   TEXT                // admin notes on this user
)
```

---

## API Interfaces

### `POST /api/survey/submit`
**Input:** `{ name, email, consent, answers: Record<questionId, answer> }`
**Output:** `{ responseId, archetype, scores }`
**Logic:** Validate with Zod → run scoring → insert to DB → return result

### `GET /api/debrief/[id]`
**Output:** Streaming text response (Server-Sent Events or ReadableStream)
**Logic:** Load response from DB → build prompt → stream from Ollama or Claude API
**Note:** Cache debrief to `responses.debrief` column on first generation

### `GET /api/admin/responses` *(admin-only)*
**Headers:** `Authorization: Bearer $ADMIN_SECRET`
**Output:** `{ responses: Response[] }` with all fields

### `POST /api/admin/email` *(admin-only)*
**Input:** `{ toIds: [id1, id2], templateVars: {...} }`
**Output:** `{ sent: boolean }`

---

## Archetype Scoring Logic

Survey answers map to weighted scores across 4–6 dimensions. Highest-scoring dimension determines archetype. Should be deterministic (no AI involved in assignment itself).

```typescript
// Conceptual shape
type ScoringMap = {
  [questionId: string]: {
    [answerValue: string]: Partial<Record<ArchetypeKey, number>>
  }
}
```

Archetype assignment: `argmax(summed scores)` across all answers.
Tie-breaking: Silent alphabetical default. Ties are rare with well-weighted scoring; log the tie in `score_data` for post-beta review.

---

## AI Debrief

**Prompt structure:**
1. System: Role as a thoughtful AI ethics collaborator, not a therapist
2. Context: User's archetype, description, their specific answers
3. Task: Reflect their patterns, name 2–3 strengths, suggest collaboration areas

**Ollama model:** `llama3.2:3b` — fast inference, sufficient quality for a ~200 word reflective debrief.

**Failure mode:** If Ollama is unavailable (production without local runner), serve a static per-archetype debrief template. No Claude API fallback for MVP — avoids billing risk if the Reddit post drives unexpected traffic.

---

## Admin Interface

- Protected by middleware checking `Authorization` header against `ADMIN_SECRET` env var
- Response list: sortable table with archetype, date, skills, collab prefs
- Match view: two responses side-by-side, notes field, "mark as matched" button
- Email: skipped in initial beta — send intro emails manually from Gmail for first 10–20 matches. Add templated email tooling post-validation.

---

## Implementation Order

### Step 0 — Content First (no code) ⚠️ Blocks everything below
- Write 15–20 survey questions with answer options
- Define 4–6 archetypes with names, descriptions, and scoring weights per answer
- Draft consent language and privacy policy copy
- *This is the critical path — scoring logic can't be built without real questions*

### Step 1 — Project Scaffold
- `npx create-next-app@latest` with TypeScript + Tailwind + App Router
- Add: `drizzle-orm`, `better-sqlite3`, `drizzle-kit`, `zod`, `react-hook-form`, `nanoid`
- Set up `lib/db/schema.ts` and run first migration

### Step 2 — Archetype System (pure logic, no UI)
- Write `lib/archetypes/definitions.ts` with all 4–6 archetypes
- Write `lib/archetypes/scoring.ts` with question scoring map
- Write unit tests for scoring logic (Vitest)

### Step 3 — Survey API
- `POST /api/survey/submit` endpoint with Zod validation
- Writes to SQLite, returns archetype result

### Step 4 — Survey Form UI
- Multi-step form with React Hook Form
- Renders question types: multiple choice, scale (1–5), short text
- Final step: consent checkbox + name/email
- On submit: calls API, redirects to result page

### Step 5 — Result & Debrief Pages
- `/survey/[id]/result` — archetype card, description, shareable URL
- Static per-archetype debrief copy (ships immediately, no Ollama required)
- Ollama streaming debrief as progressive enhancement via `lib/debrief/ollama.ts`

### Step 6 — Landing Page
- Archetype preview cards
- How it works section
- CTA → survey
- Privacy policy page (static)

### Step 7 — Admin Dashboard (minimal)
- Password-protected `/admin` route via middleware
- Plain sortable table: name, email, archetype, date, skills
- Notes field per response; "mark matched" toggle
- *No built-in email UI — handle intros manually via Gmail for beta*

### Step 8 — Deploy
- Cloudflare Tunnel for local hosting OR Railway for persistent cloud deploy
- Set env vars: `ADMIN_SECRET`, `OLLAMA_BASE_URL` (optional)
- End-to-end smoke test

### Step 9 — Post-Beta (add only if Reddit post shows demand)
- Resend email template system for intro emails
- Side-by-side match review UI
- reCAPTCHA if bot submissions become a problem
- Claude API fallback for debrief quality upgrade

---

## Resolved Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Hosting | Cloudflare Tunnel (local) for beta; Railway if stable URL needed | Zero cost for gauging interest; upgrade if demand warrants it |
| Ollama model | `llama3.2:3b` | Fast, free, sufficient quality for ~200 word debrief |
| Debrief fallback | Static per-archetype template | Avoids Claude API billing risk if traffic spikes unexpectedly |
| AI fallback (prod) | Static template only, no Claude API | Keeps MVP free and dependency-free |
| Tie-breaking | Silent alphabetical default | Low friction; ties are rare; log raw scores for post-beta tuning |
| License | MIT | Lowest friction for open source credibility; commercial fork risk negligible pre-validation |
| Survey questions | Content first, before code | Scoring map is a hard dependency; can't scaffold around it meaningfully |
| Admin email | Manual Gmail for beta | 10–20 intros don't warrant tooling; add Resend templates post-validation |
| GDPR | Best-practice only | No EU targeting; consent checkbox + no-sell policy sufficient for Reddit beta |
| Spam protection | None for MVP | Add reCAPTCHA only if abuse is observed |

---

## Key Constraints

- **No user accounts** — responses identified by nanoid, linked via email only
- **No automated matching** — admin reviews and decides manually
- **Debrief is not therapy** — prompt must clearly frame AI as a reflective tool, not clinical support
- **SQLite is single-writer** — fine for MVP load, becomes a bottleneck if concurrent submissions spike (not expected for v1)
