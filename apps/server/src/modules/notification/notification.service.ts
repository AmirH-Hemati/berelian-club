import NotificationModel, {
  type NotificationType,
} from "../../models/notification.model.js";

import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

import type { SocketService } from "../socket/socket.service.js";

import { notificationQueue } from "../../infrastructure/queues/notification.queue.js";

import type { SendNotificationJobData } from "../../infrastructure/queues/notification.types.js";

type EnqueueManyInput = {
  userIds: string[];
  title: string;
  message: string;
  type: NotificationType;
  link: string;
  deduplicationKey: (userId: string) => string;
};

export class NotificationService {
  constructor(private readonly socketService: SocketService) {}

  async enqueue(data: SendNotificationJobData) {
    return notificationQueue.add("send-notification", data, {
      jobId: data.deduplicationKey,
    });
  }

  async enqueueMany(data: EnqueueManyInput) {
    const jobs = data.userIds.map((userId) => {
      const deduplicationKey = data.deduplicationKey(userId);

      return {
        name: "send-notification" as const,

        data: {
          userId,
          title: data.title,
          message: data.message,
          type: data.type,
          link: data.link,
          deduplicationKey,
        },

        opts: {
          jobId: deduplicationKey,
        },
      };
    });

    if (jobs.length === 0) return [];

    return notificationQueue.addBulk(jobs);
  }

  async send(data: SendNotificationJobData) {
    try {
      const notification = await NotificationModel.create({
        user: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        link: data.link,
        deduplicationKey: data.deduplicationKey,
      });

      this.emitNotification(notification);

      return notification;
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000
      ) {
        return null;
      }

      throw error;
    }
  }

  async getUserNotifications(userId: string, query: Record<string, unknown>) {
    const features = new ApiFeatures(
      NotificationModel.find({
        user: userId,
      }),
      query,
    )
      .filter()
      .sort()
      .fields();

    const { total, limit, page, totalPages } = await features.pagination();

    const notifications = await features.query;

    return {
      notifications,
      pagination: {
        total,
        limit,
        page,
        totalPages,
      },
    };
  }

  async countUnread(userId: string) {
    return NotificationModel.countDocuments({
      user: userId,
      isRead: false,
    });
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await NotificationModel.findOneAndUpdate(
      {
        _id: notificationId,
        user: userId,
      },
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    if (!notification) {
      throw new AppError("نوتیفیکیشن یافت نشد", 404);
    }

    return notification;
  }

  async markAllAsRead(userId: string) {
    await NotificationModel.updateMany(
      {
        user: userId,
        isRead: false,
      },
      {
        isRead: true,
      },
    );
  }

  async deleteNotification(notificationId: string, userId: string) {
    const notification = await NotificationModel.findOneAndDelete({
      _id: notificationId,
      user: userId,
    });

    if (!notification) {
      throw new AppError("نوتیفیکیشن یافت نشد", 404);
    }

    return notification;
  }

  private emitNotification(notification: any) {
    this.socketService.emitToUser(
      notification.user.toString(),
      "notification:new",
      {
        _id: notification._id.toString(),
        title: notification.title,
        message: notification.message,
        type: notification.type,
        link: notification.link,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
      },
    );
  }
}
