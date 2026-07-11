import { NextRequest } from "next/server";
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
  const request = await RequestModel.findById(id);
  if (!request) {
    throw new AppError("درخواستی یافت نشد", 404);
  }

  if (request.status !== "pending") {
    throw new AppError("این درخواست قبلا بررسی شده است", 400);
  }
  request.status = "approved";
  await request.save();
  res.status(200).json({
    status: "success",
    message: "درخواست با موفقیت تایید شد",
    data: request,
  });
});
export const rejectRequest = CatchError(async (req, res, NextRequest) => {
  const { id } = req.params;
  const request = await RequestModel.findById(id);
  if (!request) {
    throw new AppError("درخواستی یافت نشد", 404);
  }

  if (request.status !== "pending") {
    throw new AppError("این درخواست قبلا بررسی شده است", 400);
  }
  request.status = "cancelled";
  await request.save();
  res.status(200).json({
    status: "success",
    message: "درخواست با موفقیت رد شد",
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
  const { id } = req.params;
  const requests = await RequestModel.find({ user: id }).limit(10);
  if (!requests) {
    throw new AppError("درخواستی یافت نشد", 404);
  }

  res.status(200).json({
    status: "success",
    data: requests,
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
