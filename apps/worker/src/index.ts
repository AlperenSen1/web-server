import { db, users } from "@repo/db";
import { Worker } from "bullmq";

console.log("Worker started, BullMQ queue is listening...");

const connection = { host: process.env.REDIS_HOST || "localhost", port: 6379 };

// Worker listens "user-queue"
const worker = new Worker("user-queue", async (job) => {
  if (job.name === "createUser") {
    const { userName } = job.data; // Receive the data we sent from the API.

    console.log(`[Worker] New mission captured. Being written to DB.: ${userName}`);

    // We perform the database write operation here.
    await db.insert(users).values({ userName });

    console.log(`[Worker] The process is complete, the user has been registered.: ${userName}`);
  }
}, { connection });


worker.on("failed", (job, err) => {
  console.error(`[Worker] Mission failed (ID: ${job?.id}):`, err);
});
