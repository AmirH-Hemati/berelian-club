import NotificationModel from "../../models/notification.model.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import type { SocketService } from "../socket/socket.service.js";

export type SendNotification = {
  userId: string;
  title: string;
  message: string;
  type:
    | "file_received"
    | "request_new"
    | "request_approved"
    | "request_rejected"
    | "request_completed"
    | "appointment_new"
    | "appointment_approved"
    | "appointment_rejected"
    | "appointment_completed"
    | "appointment_rescheduled"
    | "reminder"
    | "contract_start"
    | "contract_expiry"
    | "birthday";
  deduplicationKey?: string;
  link?: string;
};

export class NotificationService {
  constructor(private readonly socketService: SocketService) {}
  async send(data: SendNotification) {
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
  }

  async sendMany(notifications: SendNotification[]) {
    const createdNotifications = [];

    for (const data of notifications) {
      try {
        const notification = await NotificationModel.create({
          user: data.userId,
          title: data.title,
          message: data.message,
          type: data.type,
          link: data.link,
          deduplicationKey: data.deduplicationKey,
        });

        createdNotifications.push(notification);

        this.emitNotification(notification);
      } catch (error: any) {
        if (error.code === 11000) {
          continue;
        }

        throw error;
      }
    }

    return createdNotifications;
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
