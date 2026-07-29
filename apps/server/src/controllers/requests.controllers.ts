import type { NextFunction, Request, Response } from "express";
import RequestModel, { type RequestDocument } from "../models/request.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";
import CatchError from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import type { UserDocument } from "../models/user.model.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";
import { ConversationModel } from "../models/conversation.model.js";
import NotificationModel from "../models/notification.model.js";

export const setRequestUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.user) req.body.user = req.user?._id;
  next();
};

export const approveRequest = CatchError(async (req, res, NextRequest) => {
  const { id } = req.params;
  const adminId = (req.user as UserDocument)._id;
  const request = await RequestModel.findById(id);
  if (!request) {
    throw new AppError("درخواستی یافت نشد", 404);
  }

  if (request.status !== "pending") {
    throw new AppError("این درخواست قبلا بررسی شده است", 400);
  }

  request.status = "approved";
  await request.save();
  let conversation = await ConversationModel.findOne({ request: id });
  if (!conversation) {
    conversation = await ConversationModel.create({
      participants: [request.user._id, adminId],
      request: id?.toString(),
      isActive: true,
    });
  } else {
    conversation.isActive = true;
    await conversation.save();
  }
  await NotificationModel.create({
    user: request.user._id,
    title: "درخواست شما تایید شد",
    message: `درخواست ${request.type} شما تایید شد. برای ادامه گفتگو وارد چت شوید.`,
    type: "reminder",
  });

  res.status(200).json({
    status: "success",
    message: "درخواست با موفقیت تایید شد و چت فعال گردید",
    data: {
      request,
      conversation,
    },
  });
});
export const rejectRequest = CatchError(async (req, res, NextRequest) => {
  const { id } = req.params;
  const { reason } = req.body;
  const request = await RequestModel.findById(id);
  if (!request) {
    throw new AppError("درخواستی یافت نشد", 404);
  }

  if (request.status !== "pending") {
    throw new AppError("این درخواست قبلا بررسی شده است", 400);
  }

  request.status = "cancelled";
  request.cancellationReason = reason || "کنسل شده توسط ادمین";
  request.cancelledBy = (req.user as UserDocument)._id;

  await request.save();
  res.status(200).json({
    status: "success",
    message: "درخواست با موفقیت کنسل شد",
    data: request,
  });
});

export const setUserIdToParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id) req.params.id = (req.user as UserDocument)._id.toString();
  next();
};

export const getUserRequests = CatchError(async (req, res, next) => {
  const id = (req.user as UserDocument)._id;
  const features = new ApiFeatures(RequestModel.find({ user: id }), req.query)
    .filter()
    .search()
    .sort()
    .fields();
  const { total, limit, page, totalPages } = await features.pagination();

  const requests = await features.query;
  if (!requests) {
    throw new AppError("درخواستی یافت نشد", 404);
  }

  res.status(200).json({
    status: "success",
    data: requests,
    pagination: {
      totalPages,
      total,
      limit,
      page,
    },
  });
});

export const getTodayRequests = CatchError(
  async (req: Request, res: Response) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const requests = await RequestModel.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate("user", "firstName lastName phoneNumber email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: requests,
    });
  },
);

export const getRequest = getOne<RequestDocument>(RequestModel);
export const getRequests = getAll<RequestDocument>(RequestModel);
export const createRequest = createOne<RequestDocument>(RequestModel);
export const updateRequest = updateOne<RequestDocument>(RequestModel);
export const deleteRequest = deleteOne<RequestDocument>(RequestModel);
