import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

//users table schema-----------
// use "export" to make tables visible to the rest of the project

export const users = sqliteTable("users", {
  // left side of : sign, is the name of the column we will use on
  // typescript code (which named as "key") and
  // on the right hand side of : sign, we declared integer("id") then id is the column name
  // in sqlite table.
  userId: text("user_id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userName: text("user_name").notNull(),
});

//threads table schema--------
export const threads = sqliteTable("threads", {
  threadId: text("thread_id")
    .primaryKey()
    .$defaultFn(() => createId()),
  threadName: text("thread_name").notNull(),
});

//messages table schema-------
export const messages = sqliteTable("messages", {
  messageId: text("message_id")
    .primaryKey()
    .$defaultFn(() => createId()),
  contentOfMessage: text("content_of_message").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.userId),
  threadId: text("thread_id")
    .notNull()
    .references(() => threads.threadId),
  sendingTime: text("sending_time")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
