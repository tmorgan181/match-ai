import { ARCHETYPE_KEYS, type ArchetypeKey } from "./definitions";
import {
  SCORING_CONFIG,
  type ArchetypeScores,
  type ScaleCondition,
} from "./scoring-config";

export type Scores = Record<ArchetypeKey, number>;

export type Answers = Record<string, string | number | undefined>;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function initScores(): Scores {
  return Object.fromEntries(ARCHETYPE_KEYS.map((k) => [k, 0])) as Scores;
}

function addScores(totals: Scores, delta: ArchetypeScores) {
  for (const key of ARCHETYPE_KEYS) {
    if (delta[key] !== undefined) totals[key] += delta[key]!;
  }
}

function matchesScale(condition: ScaleCondition, value: number): boolean {
  if ("any" in condition) return true;
  if ("gte" in condition) return value >= condition.gte;
  if ("lte" in condition) return value <= condition.lte;
  if ("eq" in condition) return value === condition.eq;
  if ("between" in condition) return value >= condition.between[0] && value <= condition.between[1];
  return false;
}

/** Auto-compute "sometimes" as floor(yes[key] / 2) for each archetype. */
function halfOf(scores: ArchetypeScores): ArchetypeScores {
  return Object.fromEntries(
    Object.entries(scores).map(([k, v]) => [k, Math.floor(v / 2)])
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function scoreAnswers(answers: Answers): Scores {
  const totals = initScores();

  for (const [qId, config] of Object.entries(SCORING_CONFIG)) {
    const raw = answers[qId];

    if (config.type === "scale") {
      // Skipped or non-numeric → skip
      if (raw === undefined || raw === null || raw === "") continue;
      const value = Number(raw);
      if (isNaN(value) || value < 1 || value > 5) continue;
      for (const rule of config.rules) {
        if (matchesScale(rule.when, value)) addScores(totals, rule.add);
      }
    }

    if (config.type === "yns") {
      if (raw !== "yes" && raw !== "no" && raw !== "sometimes") continue;
      if (raw === "yes" && config.yes) addScores(totals, config.yes);
      if (raw === "sometimes") {
        const sometimesScores = config.sometimes ?? (config.yes ? halfOf(config.yes) : {});
        addScores(totals, sometimesScores);
      }
      if (raw === "no" && config.no) addScores(totals, config.no);
    }

    if (config.type === "choice") {
      if (typeof raw !== "string" || !config.options[raw]) continue;
      addScores(totals, config.options[raw]);
    }
  }

  return totals;
}

export function assignArchetype(scores: Scores): ArchetypeKey {
  // ARCHETYPE_KEYS is sorted alphabetically — first key wins ties deterministically
  return ARCHETYPE_KEYS.reduce((best, key) =>
    scores[key] > scores[best] ? key : best
  );
}

export function computeConfidence(scores: Scores, winner: ArchetypeKey): number {
  const values = Object.values(scores);
  const min = Math.min(...values);
  const shifted = values.map((value) => value - min);
  const total = shifted.reduce((a, b) => a + b, 0);
  const winnerScore = scores[winner] - min;
  return total === 0 ? 0 : Math.round((winnerScore / total) * 100);
}
