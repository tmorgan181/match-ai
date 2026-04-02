CREATE TABLE `responses` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`consent` integer NOT NULL,
	`archetype` text NOT NULL,
	`score_data` text NOT NULL,
	`answers` text NOT NULL,
	`debrief` text,
	`matched_with` text,
	`matched_at` text,
	`match_notes` text
);
