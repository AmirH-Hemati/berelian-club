import NotificationModel from "../../models/notification.model.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

export type SendNotification = {
  userId: string;
  title: string;
  message: string;
  type:
    | "file_received"
    | "request_approved"
    | "request_rejected"
    | "request_completed"
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
  async send(data: SendNotification) {
    return NotificationModel.create({
      user: data.userId,
      title: data.title,
      message: data.message,
      type: data.type,
      link: data.link,
      deduplicationKey: data.deduplicationKey,
    });
  }

  async sendMany(notifications: SendNotification[]) {
    if (!notifications.length) return;

    const docs = notifications.map((notification) => ({
      user: notification.userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      link: notification.link,
      deduplicationKey: notification.deduplicationKey,
    }));

    try {
      await NotificationModel.insertMany(docs, {
        ordered: false,
      });
    } catch (error: any) {
      if (error.code !== 11000) {
        throw error;
      }
    }
  }

  async getUserNotifications(userId: string, query: any) {
    const features = new ApiFeatures(
      NotificationModel.find({
        user: userId,
      }),
      query,
    )
      .filter()
      .search()
      .sort()
      .fields();

    const { total, limit, page, totalPages } = await features.pagination();

    const notifications = await features.query;

    const unreadCount = await NotificationModel.countDocuments({
      user: userId,
      isRead: false,
    });

    return {
      notifications,
      unreadCount,
      pagination: {
        totalPages,
        total,
        limit,
        page,
      },
    };
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
  async countUnread(userId: string) {
    return NotificationModel.countDocuments({
      user: userId,
      isRead: false,
    });
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
}
