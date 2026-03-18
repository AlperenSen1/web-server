// import Hono class from hono package which is installed from internet.
import { Hono } from "hono";

// i wrote ../ at the beginning of the path becasue that ./
//  means "Look inside my current folder" and  ../ means "go up one level".

import { db } from "../db";
import { users, threads, messages } from "../db/schema";

//datetime object from luxon package
import { DateTime } from "luxon";

//equal
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// Create a Hono class object named app.
const app = new Hono();

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

//this is the homepage section-------------------------------------------------------

//this is route
app.get("/", (c) => {
  return c.text("This is homepage.");
});

//"await" pauses the code flow to wait response from db, at this time server can make other tasks through "async".
// if you use await you must use async
app.get("/users", async (c) => {
  const allUsers = await db.select().from(users);
  return c.json(allUsers);
});

const usersSchema = z.object({ userName: z.string().min(1) });
app.post("/users", zValidator("json", usersSchema), async (c) => {
  const { userName } = c.req.valid("json");

  await db.insert(users).values({ userName });
  return c.json({ message: "User Successfully Created" }, 201);
});

// data that comes from URL variable is string, coerce turns it into number if it is convertable, then
// number()... and other things are checked.
const idSchema = z.object({ id: z.coerce.number().int().positive() });
app.get("/users/:id", zValidator("param", idSchema), async (c) => {
  const { id } = c.req.valid("param");

  const result = await db.select().from(users).where(eq(users.userID, id));
  if (result.length == 0) {
    return c.json({ message: "User not found" }, 404);
  } else {
    return c.json(result[0], 200);
  }
});

// this is threads section-------------------------------------------------------------
app.get("/threads", (c) => {
  return c.text("This is threads page");
});

const threadsSchema = z.object({ threadName: z.string().min(1) });
app.post("/threads", zValidator("json", threadsSchema), async (c) => {
  const { threadName } = c.req.valid("json");

  await db.insert(threads).values({ threadName });
  return c.json({ message: "Thread Successfully Created" }, 201);
});

//this is messages section-------------------------------------------------------------
app.get("/messages", async (c) => {
  const allMessages = await db.select().from(messages);
  return c.json(allMessages);
});

const messageSchema = z.object({
  contentOfMessage: z.string().min(1),
  //you must start with javascript data types(string,number,boolean) when defining rules then add mathematicals
  userID: z.number().int().positive(),
  threadID: z.number().int().positive(),
});

app.post("/messages", zValidator("json", messageSchema), async (c) => {
  const { contentOfMessage, userID, threadID } = c.req.valid("json");

  const currentTime = DateTime.now().toUTC().toISO();

  await db.insert(messages).values({
    contentOfMessage,
    userID,
    threadID,
    sendingTime: currentTime,
  });
  return c.json({ message: "Message Successfully Created" }, 201);
});

// says to bun : app object is the one you should use to listen for web traffic.
export default app;

//API ucu= API Endpoint
