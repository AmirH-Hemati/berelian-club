import type { NextFunction, Request, Response } from "express";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";
import CatchError from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import AppointmentModel, {
  type appointmentDocument,
} from "../models/appointment.model.js";
import type { UserDocument } from "../models/user.model.js";

export const setAppointmentUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.user) req.body.user = req.user?._id;
  next();
};

export const approveAppointment = CatchError(async (req, res, NextRequest) => {
  const { id } = req.params;
  const request = await AppointmentModel.findById(id);
  if (!request) {
    throw new AppError("درخواستی یافت نشد", 404);
  }

  request.status = "approved";
  await request.save();
  res.status(200).json({
    status: "success",
    message: "جلسه مشاوره با موفقیت تایید شد",
    data: request,
  });
});

export const rejectAppointment = CatchError(async (req, res, NextRequest) => {
  const { id } = req.params;
  const request = await AppointmentModel.findById(id);
  if (!request) {
    throw new AppError("جلسه مشاوره ای یافت نشد", 404);
  }

  if (request.status === "completed") {
    throw new AppError("این درخواست قبلا تایید شده است", 400);
  }
  request.status = "cancelled";
  await request.save();
  res.status(200).json({
    status: "success",
    message: "جلسه مشاوره با موفقیت کنسل شد",
    data: request,
  });
});

export const completeAppointment = CatchError(async (req, res, NextRequest) => {
  const { id } = req.params;
  const request = await AppointmentModel.findById(id);
  if (!request) {
    throw new AppError("جلسه مشاوره ای یافت نشد", 404);
  }

  request.status = "completed";
  await request.save();
  res.status(200).json({
    status: "success",
    message: "جلسه مشاوره با موفقیت برگزار شد",
    data: request,
  });
});

export const getUserAppointments = CatchError(async (req, res, next) => {
  const id = (req.user as UserDocument)._id;
  const appointments = await AppointmentModel.find({ user: id }).limit(10);
  if (!appointments) {
    throw new AppError("جلسه مشاوره ای یافت نشد", 404);
  }

  res.status(200).json({
    status: "success",
    data: appointments,
  });
});

export const getTodayAppointments = CatchError(
  async (req: Request, res: Response) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await AppointmentModel.find({
      status: "approved",
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate("user", "firstName lastName phoneNumber email")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      status: "success",
      data: appointments,
    });
  },
);
export const getAppointments = getAll<appointmentDocument>(AppointmentModel);
export const getAppointment = getOne<appointmentDocument>(AppointmentModel);
export const createAppointment =
  createOne<appointmentDocument>(AppointmentModel);
export const updateAppointment =
  updateOne<appointmentDocument>(AppointmentModel);
export const deleteAppointment =
  deleteOne<appointmentDocument>(AppointmentModel);
