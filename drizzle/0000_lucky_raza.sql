CREATE TABLE `ddd_codes` (
	`code` varchar(2) NOT NULL,
	CONSTRAINT `ddd_codes_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `municipalities` (
	`ibgeCode` int NOT NULL,
	`name` varchar(120) NOT NULL,
	`stateIbgeCode` int NOT NULL,
	`ddd` varchar(2) NOT NULL,
	`latitude` decimal(9,6) NOT NULL,
	`longitude` decimal(9,6) NOT NULL,
	`timezone` varchar(64) NOT NULL,
	`capital` boolean NOT NULL DEFAULT false,
	CONSTRAINT `municipalities_ibgeCode` PRIMARY KEY(`ibgeCode`)
);
--> statement-breakpoint
CREATE TABLE `states` (
	`ibgeCode` int NOT NULL,
	`uf` varchar(2) NOT NULL,
	`name` varchar(64) NOT NULL,
	`region` varchar(20) NOT NULL,
	CONSTRAINT `states_ibgeCode` PRIMARY KEY(`ibgeCode`),
	CONSTRAINT `states_uf_unique` UNIQUE(`uf`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE INDEX `municipalities_state_idx` ON `municipalities` (`stateIbgeCode`);--> statement-breakpoint
CREATE INDEX `municipalities_ddd_idx` ON `municipalities` (`ddd`);--> statement-breakpoint
CREATE INDEX `municipalities_name_idx` ON `municipalities` (`name`);--> statement-breakpoint
CREATE INDEX `states_region_idx` ON `states` (`region`);