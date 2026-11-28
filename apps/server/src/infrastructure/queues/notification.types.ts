import type { NotificationType } from "../../models/notification.model.js";

export type SendNotificationJobData = {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  link: string;
  deduplicationKey: string;
};

export type NotificationJobName = "send-notification";
