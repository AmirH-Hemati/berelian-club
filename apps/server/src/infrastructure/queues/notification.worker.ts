import { Worker } from "bullmq";

import type { UserService } from "../../modules/user/user.service.js";
import type { NotificationService } from "../../modules/notification/notification.service.js";

import type {
  NotificationJobData,
  NotificationJobName,
  RequestNotificationJobData,
} from "./notification.types.js";

import RequestModel from "../../models/request.model.js";
import { redisQueueConnection } from "./redis-queue.connection.js";

type Dependencies = {
  userService: UserService;
  notificationService: NotificationService;
};

function isRequestNotificationJobData(
  data: NotificationJobData,
): data is RequestNotificationJobData {
  return (
    "userId" in data &&
    "title" in data &&
    "message" in data &&
    "link" in data &&
    "deduplicationKey" in data &&
    (data.type === "request_approved" ||
      data.type === "request_completed" ||
      data.type === "request_rejected")
  );
}

export function createNotificationWorker({
  userService,
  notificationService,
}: Dependencies) {
  const worker = new Worker<NotificationJobData, void, NotificationJobName>(
    "notifications",

    async (job) => {
      switch (job.name) {
        case "request-created": {
          if (!("requestId" in job.data)) {
            throw new Error(
              "Invalid data for request-created notification job",
            );
          }

          const { requestId } = job.data;

          const request = await RequestModel.findById(requestId)
            .select("_id")
            .lean();

          if (!request) {
            return;
          }

          const receptions = await userService.getUsersByRole("reception");

          const notifications = receptions.map((reception) => ({
            userId: reception._id.toString(),
            title: "درخواست جدید",
            message: "یک درخواست جدید ثبت شده است. برای بررسی وارد پنل شوید.",
            type: "request_new" as const,
            link: `/requests/${request._id}`,
            deduplicationKey: `request-new-${request._id}-${reception._id}`,
          }));

          await notificationService.sendMany(notifications);

          break;
        }

        case "request-approved":
        case "request-completed":
        case "request-rejected": {
          if (!isRequestNotificationJobData(job.data)) {
            throw new Error(`Invalid data for ${job.name} notification job`);
          }

          await notificationService.send(job.data);

          break;
        }

        default: {
          throw new Error(`Unsupported notification job: ${job.name}`);
        }
      }
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
