import type { Request, Response } from "express";
import CatchError from "../utils/catchAsync.js";
import NotificationModel from "../models/notification.model.js";
import type { UserDocument } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const getMyNotifications = CatchError(
  async (req: Request, res: Response) => {
    const userId = (req.user as UserDocument)._id;
    const notifications = await NotificationModel.find({ user: userId });
    const unreadCount = await NotificationModel.countDocuments({
      user: userId,
      isRead: false,
    });

    res.status(200).json({
      status: "success",
      data: { notifications, unreadCount },
    });
  },
);

export const markAsRead = CatchError(async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)._id;
  const notification = await NotificationModel.findOneAndUpdate(
    { _id: req.params.id, user: userId },
    { isRead: true },
    { new: true },
  );

  if (!notification) {
    throw new AppError("نوتیفیکیشن یافت نشد", 404);
  }

  res.status(200).json({
    status: "success",
    data: notification,
  });
});

export const markAllAsRead = CatchError(async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)._id;
  await NotificationModel.updateMany(
    { user: userId, isRead: false },
    { isRead: true },
  );

  res.status(200).json({
    status: "success",
    message: "همه نوتیفیکیشن‌ها خوانده شدند",
  });
});

export const deleteNotification = CatchError(
  async (req: Request, res: Response) => {
    const userId = (req.user as UserDocument)._id;
    const notification = await NotificationModel.findByIdAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!notification) {
      throw new AppError("نوتیفیکیشن یافت نشد", 404);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  },
);
