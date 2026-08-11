CREATE TABLE `locality_suggestions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`municipalityIbgeCode` int NOT NULL,
	`topic` enum('mobility','useful_phone','other') NOT NULL,
	`note` varchar(600) NOT NULL,
	`status` enum('pending','reviewed','dismissed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	CONSTRAINT `locality_suggestions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `locality_suggestions_municipality_idx` ON `locality_suggestions` (`municipalityIbgeCode`);--> statement-breakpoint
CREATE INDEX `locality_suggestions_status_created_idx` ON `locality_suggestions` (`status`,`createdAt`);