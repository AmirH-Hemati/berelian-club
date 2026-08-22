import type { Request, Response } from "express";
import { notificationService } from "../../container/index.js";
import type { UserDocument } from "../../models/user.model.js";
import CatchError from "../../utils/catchAsync.js";

export const getMyNotifications = CatchError(
  async (req: Request, res: Response) => {
    const userId = (req.user as UserDocument)._id.toString();

    const result = await notificationService.getUserNotifications(
      userId,
      req.query,
    );

    return res.status(200).json({
      status: "success",
      data: {
        notifications: result.notifications,
        unreadCount: result.unreadCount,
      },
      pagination: result.pagination,
    });
  },
);

export const markAsRead = CatchError(async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)._id.toString();

  const notification = await notificationService.markAsRead(
    req.params.id as string,
    userId,
  );

  return res.status(200).json({
    status: "success",
    data: notification,
  });
});

export const markAllAsRead = CatchError(async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)._id.toString();

  await notificationService.markAllAsRead(userId);

  return res.status(200).json({
    status: "success",
    message: "همه نوتیفیکیشن‌ها خوانده شدند",
  });
});

export const deleteNotification = CatchError(
  async (req: Request, res: Response) => {
    const userId = (req.user as UserDocument)._id.toString();

    await notificationService.deleteNotification(
      req.params.id as string,
      userId,
    );

    return res.status(204).send();
  },
);
