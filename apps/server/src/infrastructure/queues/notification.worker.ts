import { Worker } from "bullmq";

import type { NotificationService } from "../../modules/notification/notification.service.js";

import type {
  SendNotificationJobData,
  NotificationJobName,
} from "./notification.types.js";

import { redisQueueConnection } from "./redis-queue.connection.js";

type Dependencies = {
  notificationService: NotificationService;
};

export function createNotificationWorker({
  notificationService,
}: Dependencies) {
  const worker = new Worker<SendNotificationJobData, void, NotificationJobName>(
    "notifications",

    async (job) => {
      await notificationService.send(job.data);
    },

    {
      connection: redisQueueConnection,
      concurrency: 5,
    },
  );

  worker.on("completed", (job) => {
    console.log(`Notification job completed: ${job.id}`);
  });

  worker.on("failed", (job, error) => {
    console.error(`Notification job failed: ${job?.id}`, error);
  });

  return worker;
}
