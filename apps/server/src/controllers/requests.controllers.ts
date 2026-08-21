import type { NextFunction, Request, Response } from "express";
import RequestModel, { type RequestDocument } from "../models/request.model.js";
import { createOne, getAll, getOne, updateOne } from "./handlerFactory.js";
import CatchError from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import type { UserDocument } from "../models/user.model.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";
import { ConversationModel } from "../models/conversation.model.js";
import { MessageModel } from "../models/message.model.js";
import NotificationService from "../services/reminder/NotificationService.js";

export const REQUEST_TYPE_LABELS = {
  renew_contract: "تمدید قرارداد",
  increase_capital: "افزایش سرمایه",
  decrease_capital: "کاهش سرمایه",
} as const;

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
  const requestTypeLabel = REQUEST_TYPE_LABELS[request.type];

  await NotificationService.send({
    userId: request.user._id.toString(),
    title: "درخواست شما تایید شد",
    message: `درخواست ${requestTypeLabel} شما تأیید شد. برای ادامه گفتگو وارد چت شوید.`,
    type: "request_approved",
    link: `/chat/${request._id}`,
    deduplicationKey: `request-approved-${request._id}`,
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

export const completeRequest = CatchError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const request = await RequestModel.findById(id);

    if (!request) {
      throw new AppError("درخواستی یافت نشد", 404);
    }
    if (request.status !== "approved") {
      throw new AppError("فقط درخواست‌های تایید شده را می‌توان تکمیل کرد", 400);
    }
    request.status = "completed";
    await request.save();

    const conversation = await ConversationModel.findOne({
      request: id,
    });

    if (conversation) {
      conversation.isActive = false;
      await conversation.save();
    }

    await NotificationService.send({
      userId: request.user._id.toString(),
      title: "درخواست شما تکمیل شد",
      message:
        "درخواست شما با موفقیت تکمیل شد و مکالمه مربوط به این درخواست بسته شد.",
      type: "request_completed",
      link: `/requests/${request._id}`,
      deduplicationKey: `request-completed-${request._id}`,
    });

    res.status(200).json({
      status: "success",
      message: "درخواست با موفقیت تکمیل شد و مکالمه بسته گردید",
      data: {
        request,
        conversation,
      },
    });
  },
);

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

  await NotificationService.send({
    userId: request.user._id.toString(),
    title: "درخواست شما لغو شد",
    message: `درخواست ${REQUEST_TYPE_LABELS[request.type]} شما لغو شد.`,
    type: "request_rejected",
    link: `/requests/${request._id}`,
    deduplicationKey: `request-cancelled-${request._id}`,
  });

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

export const deleteRequest = CatchError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req.user as UserDocument)._id;
  const isAdmin = (req.user as UserDocument).role === "admin";

  const request = await RequestModel.findById(id);
  if (!request) {
    throw new AppError("درخواست یافت نشد", 404);
  }

  if (!isAdmin && request.user.toString() !== userId.toString()) {
    throw new AppError("شما دسترسی به این درخواست ندارید", 403);
  }

  const conversation = await ConversationModel.findOne({ request: id });

  if (conversation) {
    await Promise.all([
      MessageModel.deleteMany({ conversation: conversation._id }),
      ConversationModel.findByIdAndDelete(conversation._id),
    ]);
  }

  await RequestModel.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
