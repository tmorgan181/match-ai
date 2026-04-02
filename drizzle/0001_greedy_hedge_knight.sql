PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_responses` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`name` text,
	`email` text,
	`consent` integer NOT NULL,
	`archetype` text NOT NULL,
	`score_data` text NOT NULL,
	`answers` text NOT NULL,
	`debrief` text,
	`matched_with` text,
	`matched_at` text,
	`match_notes` text
);
--> statement-breakpoint
INSERT INTO `__new_responses`("id", "created_at", "name", "email", "consent", "archetype", "score_data", "answers", "debrief", "matched_with", "matched_at", "match_notes") SELECT "id", "created_at", "name", "email", "consent", "archetype", "score_data", "answers", "debrief", "matched_with", "matched_at", "match_notes" FROM `responses`;--> statement-breakpoint
DROP TABLE `responses`;--> statement-breakpoint
ALTER TABLE `__new_responses` RENAME TO `responses`;--> statement-breakpoint
PRAGMA foreign_keys=ON;