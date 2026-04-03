import { ARCHETYPE_KEYS } from "../lib/archetypes/definitions";
import { scoreAnswers, assignArchetype, computeConfidence } from "../lib/archetypes/scoring";
import { STEPS, type Question } from "../lib/survey/questions";

type ProfileName = "uniform" | "centered" | "engaged";

type Options = {
  trials: number;
  profile: ProfileName;
  includeSkips: boolean;
};

type Counts = Record<(typeof ARCHETYPE_KEYS)[number], number>;

const DEFAULTS: Options = {
  trials: 20000,
  profile: "centered",
  includeSkips: true,
};

function parseArgs(argv: string[]): Options {
  const options = { ...DEFAULTS };
  const rawNpmArgv = process.env.npm_config_argv;
  const forwardedArgs =
    rawNpmArgv && argv.length === 0
      ? (() => {
          try {
            const parsed = JSON.parse(rawNpmArgv) as { original?: string[] };
            return parsed.original?.filter((arg) => arg.startsWith("--")) ?? [];
          } catch {
            return [];
          }
        })()
      : [];

  const allArgs = [...argv, ...forwardedArgs];

  for (const arg of allArgs) {
    if (arg.startsWith("--trials=")) {
      const value = Number(arg.split("=")[1]);
      if (!Number.isNaN(value) && value > 0) options.trials = Math.floor(value);
    }
    if (arg.startsWith("--profile=")) {
      const value = arg.split("=")[1] as ProfileName;
      if (["uniform", "centered", "engaged"].includes(value)) options.profile = value;
    }
    if (arg === "--no-skips") options.includeSkips = false;
    if (arg === "--include-skips") options.includeSkips = true;
  }

  return options;
}

function createCounts(): Counts {
  return Object.fromEntries(ARCHETYPE_KEYS.map((key) => [key, 0])) as Counts;
}

function pickWeighted<T>(entries: Array<{ value: T; weight: number }>): T {
  const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
  let target = Math.random() * total;

  for (const entry of entries) {
    target -= entry.weight;
    if (target <= 0) return entry.value;
  }

  return entries[entries.length - 1]!.value;
}

function maybeSkip<T>(value: T, options: Options): T | undefined {
  if (!options.includeSkips) return value;
  const skipChance = options.profile === "uniform" ? 0.08 : options.profile === "centered" ? 0.05 : 0.03;
  return Math.random() < skipChance ? undefined : value;
}

function sampleScale(options: Options): number | undefined {
  const weighted =
    options.profile === "uniform"
      ? [
          { value: 1, weight: 1 },
          { value: 2, weight: 1 },
          { value: 3, weight: 1 },
          { value: 4, weight: 1 },
          { value: 5, weight: 1 },
        ]
      : options.profile === "centered"
        ? [
            { value: 1, weight: 1 },
            { value: 2, weight: 2 },
            { value: 3, weight: 3 },
            { value: 4, weight: 2 },
            { value: 5, weight: 1 },
          ]
        : [
            { value: 1, weight: 1 },
            { value: 2, weight: 2 },
            { value: 3, weight: 2 },
            { value: 4, weight: 3 },
            { value: 5, weight: 2 },
          ];

  return maybeSkip(pickWeighted(weighted), options);
}

function sampleYns(options: Options): "yes" | "sometimes" | "no" | undefined {
  const weighted =
    options.profile === "uniform"
      ? [
          { value: "yes" as const, weight: 1 },
          { value: "sometimes" as const, weight: 1 },
          { value: "no" as const, weight: 1 },
        ]
      : options.profile === "centered"
        ? [
            { value: "yes" as const, weight: 2 },
            { value: "sometimes" as const, weight: 3 },
            { value: "no" as const, weight: 2 },
          ]
        : [
            { value: "yes" as const, weight: 3 },
            { value: "sometimes" as const, weight: 2 },
            { value: "no" as const, weight: 2 },
          ];

  return maybeSkip(pickWeighted(weighted), options);
}

function sampleChoice(question: Extract<Question, { type: "choice" }>, options: Options): string | undefined {
  const weighted = question.options.map((option) => ({
    value: option.value,
    weight: 1,
  }));

  return maybeSkip(pickWeighted(weighted), options);
}

function sampleAnswers(options: Options): Record<string, string | number | undefined> {
  const answers: Record<string, string | number | undefined> = {};

  for (const question of STEPS.flatMap((step) => step.questions)) {
    if (question.type === "text") continue;
    if (question.type === "scale") answers[question.id] = sampleScale(options);
    if (question.type === "yns") answers[question.id] = sampleYns(options);
    if (question.type === "choice") answers[question.id] = sampleChoice(question, options);
  }

  return answers;
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const counts = createCounts();
  const confidenceByArchetype = Object.fromEntries(
    ARCHETYPE_KEYS.map((key) => [key, [] as number[]])
  ) as Record<(typeof ARCHETYPE_KEYS)[number], number[]>;

  for (let i = 0; i < options.trials; i += 1) {
    const answers = sampleAnswers(options);
    const scores = scoreAnswers(answers);
    const archetype = assignArchetype(scores);
    const confidence = computeConfidence(scores, archetype);
    counts[archetype] += 1;
    confidenceByArchetype[archetype].push(confidence);
  }

  const rows = ARCHETYPE_KEYS.map((key) => ({
    archetype: key,
    wins: counts[key],
    pct: ((counts[key] / options.trials) * 100).toFixed(2) + "%",
    avgConfidence: average(confidenceByArchetype[key]).toFixed(1),
  })).sort((a, b) => b.wins - a.wins);

  console.log("");
  console.log(`Simulation profile: ${options.profile}`);
  console.log(`Trials: ${options.trials}`);
  console.log(`Include skips: ${options.includeSkips}`);
  console.log("");
  console.table(rows);
}

main();
