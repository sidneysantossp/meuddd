ALTER TABLE `municipalities` ADD `slug` varchar(160);--> statement-breakpoint
ALTER TABLE `municipalities` ADD `populationEstimated` int;--> statement-breakpoint
ALTER TABLE `municipalities` ADD `populationReferenceYear` int;--> statement-breakpoint
ALTER TABLE `states` ADD `populationEstimated` int;--> statement-breakpoint
ALTER TABLE `states` ADD `populationReferenceYear` int;--> statement-breakpoint
CREATE INDEX `municipalities_state_slug_idx` ON `municipalities` (`stateIbgeCode`,`slug`);