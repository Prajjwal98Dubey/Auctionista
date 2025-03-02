import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

const dailyQueue = new Queue("fetch-daily-products", { connection });

const startDailyQueue = async () => {
  await dailyQueue.upsertJobScheduler(
    "daily-morning-job",
    {
      pattern: "0 0 6 * * 0-7", // everyday at 6:00 am
    },F
    {
      name: "fetch-auction-near-products",
      opts: {
        removeOnComplete: true,
      },
    }
  );
};

startDailyQueue();
