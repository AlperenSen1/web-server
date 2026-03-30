CREATE TABLE `messages` (
	`message_id` integer PRIMARY KEY NOT NULL,
	`content_of_message` text NOT NULL,
	`user_id` integer NOT NULL,
	`thread_id` integer NOT NULL,
	`sending_time` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`thread_id`) REFERENCES `threads`(`thread_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `threads` (
	`thread_id` integer PRIMARY KEY NOT NULL,
	`thread_name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` integer PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL
);
