import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

//users table schema-----------
// use "export" to make tables visible to the rest of the project

export const users = sqliteTable("users", {
  // left side of : sign, is the name of the column we will use on
  // typescript code (which named as "key") and
  // on the right hand side of : sign, we declared integer("id") then id is the column name
  // in sqlite table.
  userID: integer("user_id").primaryKey(),
  userName: text("user_name").notNull(),
});

//threads table schema--------
export const threads = sqliteTable("threads", {
  threadID: integer("thread_id").primaryKey(),
  threadName: text("thread_name").notNull(),
});

//messages table schema-------
export const messages = sqliteTable("messages", {
  messageID: integer("message_id").primaryKey(),
  contentOfMessage: text("content_of_message").notNull(),
  userID: integer("user_id")
    .notNull()
    .references(() => users.userID),
  threadID: integer("thread_id")
    .notNull()
    .references(() => threads.threadID),
  sendingTime: text("sending_time").notNull(),
});
