import { db } from "~/server/db";

export function initErrorTracking() {
  process.on("unhandledRejection", async (reason) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    await db.errorLog.create({
      data: { message: error.message, stack: error.stack },
    });
  });

  process.on("uncaughtException", async (error) => {
    await db.errorLog.create({
      data: { message: error.message, stack: error.stack },
    });
  });
}
