import type { NextFunction, Request, Response } from "express";
import RequestModel, {
  type RequestDocument,
} from "../../models/request.model.js";
import type { UserDocument } from "../../models/user.model.js";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
} from "../../controllers/handlerFactory.js";
import { requestService } from "../../container/index.js";
import CatchError from "../../utils/catchAsync.js";

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

export const setUserIdToParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id) req.params.id = (req.user as UserDocument)._id.toString();
  next();
};

export const approveRequest = CatchError(async (req, res) => {
  const adminId = (req.user as UserDocument)._id.toString();

  const result = await requestService.approveRequest(
    req.params.id as string,
    adminId,
  );

  return res.status(200).json({
    status: "success",
    message: "درخواست با موفقیت تایید شد و چت فعال گردید",
    data: result,
  });
});

export const completeRequest = CatchError(async (req, res) => {
  const result = await requestService.completeRequest(req.params.id as string);

  return res.status(200).json({
    status: "success",
    message: "درخواست با موفقیت تکمیل شد و مکالمه بسته گردید",
    data: result,
  });
});

export const rejectRequest = CatchError(async (req, res) => {
  const adminId = (req.user as UserDocument)._id.toString();

  const request = await requestService.rejectRequest(
    req.params.id as string,
    req.body.reason,
    adminId,
  );

  return res.status(200).json({
    status: "success",
    message: "درخواست با موفقیت کنسل شد",
    data: request,
  });
});

export const getUserRequests = CatchError(async (req, res) => {
  const userId = (req.user as UserDocument)._id.toString();

  const result = await requestService.getUserRequests(userId, req.query);

  return res.status(200).json({
    status: "success",
    data: result.requests,
    pagination: result.pagination,
  });
});

export const getTodayRequests = CatchError(async (req, res) => {
  const requests = await requestService.getTodayRequests();

  return res.status(200).json({
    status: "success",
    data: requests,
  });
});

export const deleteRequest = CatchError(async (req, res) => {
  const user = req.user as UserDocument;

  await requestService.deleteRequest(
    req.params.id as string,
    user._id.toString(),
    user.role === "admin",
  );

  return res.status(204).send();
});

export const getRequest = getOne<RequestDocument>(RequestModel);
export const getRequests = getAll<RequestDocument>(RequestModel);
export const createRequest = createOne<RequestDocument>(RequestModel);
export const updateRequest = updateOne<RequestDocument>(RequestModel);
