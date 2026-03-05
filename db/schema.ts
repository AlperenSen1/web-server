import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

//users table schema-----------
// use "export" to make tables visible to the rest of the project

export const users = sqliteTable("users",{
    // left side of : sign, is the name of the column we will use on 
    // typescript code (which named as "key") and
    // on the right hand side of : sign, we declared integer("id") then id is the column name
    // in sqlite table.
    userID: integer("id").primaryKey(),
    userName: text("userName").notNull(),
})

//threads table schema--------
export const threads = sqliteTable("threads",{
    threadID: integer("id").primaryKey(),
    threadName: text("threadName").notNull(),
})

//messages table schema-------
export const messages = sqliteTable("messages",{
    messageID: integer("messageID").primaryKey(),
    contentOfMessage: text("contentOfMessage").notNull(),
    //if you want to return the exactly same thing which is on the right hand
    // side of equal(=) sign of arrow function, don't use curly bracket{}.

    //there is no problem if the key of userID column on messages table same 
    //with the key of "id" column on users table. We are going to call them later
    // seperately such as users.userID and messages.userID that's why there will not 
    //occur any conflict.
    //.references() function says that: key(userID) from messages table has same values
    //  with userID key from users table 
    userID: integer("userID").notNull().references(()=>users.userID),
    threadID: integer("threadID").notNull().references(()=>threads.threadID),
    // dont use space like sending time, use _ instead, like sending_time
    // there is no timestamp data type(data type is integer,text etc.)on sqlite, instead timestamp
    //  use text
    sendingTime: text("sending_time").notNull(),
})