// import Hono class from hono package which is installed from internet.
import { Hono } from "hono";

// i wrote ../ at the beginning of the path becasue that ./
//  means "Look inside my current folder" and  ../ means "go up one level".

import { db, users, threads, messages } from "@repo/db";
//equal
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { Queue } from "bullmq";

// Create a Hono class object named app.
const app = new Hono();

const connection = { host: process.env.REDIS_HOST || "localhost", port: 6379 };
const userQueue = new Queue("user-queue", { connection });

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

const validatorHook = (result, c) => {
  if (!result.success) {
    return c.json({ error: result.error.issues[0].message }, 400);
  }
};

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
app.post(
  "/users",
  zValidator("json", usersSchema, validatorHook),
  async (c) => {
    const { userName } = c.req.valid("json");

    await userQueue.add("createUser", { userName });
    return c.json({ message: "User creation job added to queue" }, 202);
  }
);

const idSchema = z.object({ id: z.string().min(1) });
app.get(
  "/users/:id",
  zValidator("param", idSchema, validatorHook),
  async (c) => {
    const { id } = c.req.valid("param");

    const result = await db.query.users.findFirst({
      where: eq(users.userId, id),
    });
    if (!result) {
      return c.json({ message: "User not found" }, 404);
    } else {
      return c.json(result, 200);
    }
  }
);

// this is threads section-------------------------------------------------------------
app.get("/threads", async (c) => {
  const allThreads = await db.select().from(threads);
  return c.json(allThreads);
});

const threadsSchema = z.object({ threadName: z.string().min(1) });
app.post(
  "/threads",
  zValidator("json", threadsSchema, validatorHook),
  async (c) => {
    const { threadName } = c.req.valid("json");

    await db.insert(threads).values({ threadName });
    return c.json({ message: "Thread Successfully Created" }, 201);
  }
);

//this is messages section-------------------------------------------------------------
app.get("/messages", async (c) => {
  const allMessages = await db.select().from(messages);
  return c.json(allMessages);
});

const messageSchema = z.object({
  contentOfMessage: z.string().min(1),
  //you must start with javascript data types(string,number,boolean) when defining rules then add mathematicals
  userId: z.string(),
  threadId: z.string(),
});

app.post(
  "/messages",
  zValidator("json", messageSchema, validatorHook),
  async (c) => {
    const { contentOfMessage, userId, threadId } = c.req.valid("json");
    const userExists = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });
    if (!userExists) {
      return c.json({ error: "User not found." }, 404);
    }
    const threadExists = await db.query.threads.findFirst({
      where: eq(threads.threadId, threadId),
    });
    if (!threadExists) {
      return c.json({ error: "Thread not found." }, 404);
    }

    await db.insert(messages).values({
      contentOfMessage,
      userId,
      threadId,
    });
    return c.json({ message: "Message Successfully Created" }, 201);
  }
);

// says to bun : app object is the one you should use to listen for web traffic.
export default app;

//API ucu= API Endpoint
