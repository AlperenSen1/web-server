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

//this is the homepage section-------------------------------------------------------

//this is route
app.get("/", (c) => {
  return c.text("This is homepage.");
});

app.get("/users", async (c) => {
  const allUsers = await db.select().from(users);
  return c.json(allUsers);
});

app.post("/users", async (c) => {
  const body = await c.req.json();
  await db.insert(users).values({ userName: body.userName });
  return c.json({ message: "User Successfully Created" }, 201);
});

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

app.post("/threads", async (c) => {
  const body = await c.req.json();
  await db.insert(threads).values({ threadName: body.threadName });
  return c.json({ message: "Thread Successfully Created" }, 201);
});

//this is messages section-------------------------------------------------------------
app.get("/messages", async (c) => {
  const allMessages = await db.select().from(messages);
  return c.json(allMessages);
});

// this is zod schema where i define the message sending by user must looks like. it is outside of app.post
const messageSchema = z.object({
  contentOfMessage: z.string().min(1),
  //you must start with javascript data types(string,number,boolean) when defining rules then add mathematicals
  userID: z.number().int().positive(),
  threadID: z.number().int().positive(),
});

app.post("/messages", zValidator("json", messageSchema), async (c) => {
  const { contentOfMessage, userID, threadID } = c.req.valid("json");

  try {
    const currentTime = DateTime.now().toUTC().toISO();

    await db.insert(messages).values({
      contentOfMessage,
      userID,
      threadID,
      sendingTime: currentTime,
    });
    return c.json({ message: "Message Successfully Created" }, 201);
  } catch (error) {
    c.json({ error: "Internal server error" }, 500);
  }
});

// says to bun : app object is the one you should use to listen for web traffic.
export default app;

//API ucu= API Endpoint
