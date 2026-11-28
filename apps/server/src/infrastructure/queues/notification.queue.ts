import { Queue } from "bullmq";

import type {
  SendNotificationJobData,
  NotificationJobName,
} from "./notification.types.js";

import { redisQueueConnection } from "./redis-queue.connection.js";

export const notificationQueue = new Queue<
  SendNotificationJobData,
  void,
  NotificationJobName
>("notifications", {
  connection: redisQueueConnection,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 1000,
    },

    removeOnComplete: {
      count: 1000,
    },

    removeOnFail: {
      count: 5000,
    },
  },
});
