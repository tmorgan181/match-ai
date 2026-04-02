import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const responses = sqliteTable("responses", {
  id: text("id").primaryKey(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),

  // Contact & consent (name/email optional — null means anonymous)
  name: text("name"),
  email: text("email"),
  consentResearch: integer("consent_research", { mode: "boolean" }).notNull(),
  consentMatching: integer("consent_matching", { mode: "boolean" }).notNull(),

  // Archetype result
  archetype: text("archetype").notNull(), // "builder" | "guardian" | "advocate" | "researcher" | "connector"
  scoreData: text("score_data").notNull(), // JSON: { builder: 0, guardian: 0, ... }

  // Survey answers
  answers: text("answers").notNull(), // JSON: { q1: "...", q3: 4, q11: "yes", ... }

  // Debrief
  debrief: text("debrief"), // AI-generated or static, cached after first generation

  // Admin matching
  matchedWith: text("matched_with"), // FK → another response id
  matchedAt: text("matched_at"),
  matchNotes: text("match_notes"),
});

export type Response = typeof responses.$inferSelect;
export type NewResponse = typeof responses.$inferInsert;

export const notifySignups = sqliteTable("notify_signups", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  email: text("email").notNull(),
  consent: integer("consent", { mode: "boolean" }).notNull(),
});
