CREATE TABLE `unmatched_searches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`normalizedQuery` varchar(120) NOT NULL,
	`latestQuery` varchar(120) NOT NULL,
	`selectedUf` varchar(2),
	`searchCount` int NOT NULL DEFAULT 1,
	`firstSeenAt` timestamp NOT NULL DEFAULT (now()),
	`lastSeenAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `unmatched_searches_id` PRIMARY KEY(`id`),
	CONSTRAINT `unmatched_searches_normalizedQuery_unique` UNIQUE(`normalizedQuery`)
);
--> statement-breakpoint
CREATE INDEX `unmatched_searches_last_seen_idx` ON `unmatched_searches` (`lastSeenAt`);