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
import NotificationModel from "../models/notification.model.js";
import NotificationService from "../services/reminder/NotificationService.js";
import { formatPersianDate } from "../utils/date.js";

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
  const appointment = await AppointmentModel.findById(id);
  if (!appointment) {
    throw new AppError("درخواستی یافت نشد", 404);
  }

  appointment.status = "approved";
  await appointment.save();

  await NotificationService.send({
    userId: appointment.user._id.toString(),
    title: "مشاوره شما تأیید شد",
    message: `درخواست مشاوره شما برای تاریخ ${formatPersianDate(appointment.appointmentDate)} تأیید شد.`,
    type: "appointment_approved",
    link: `/appointments/${appointment._id}`,
    deduplicationKey: `appointment-approved-${appointment._id}`,
  });

  res.status(200).json({
    status: "success",
    message: "جلسه مشاوره با موفقیت تایید شد",
    data: appointment,
  });
});
export const rejectAppointment = CatchError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reason } = req.body;

    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      throw new AppError("جلسه مشاوره یافت نشد", 404);
    }

    if (
      appointment.status === "completed" ||
      appointment.status === "cancelled"
    ) {
      throw new AppError("این جلسه قبلاً به پایان رسیده یا کنسل شده است", 400);
    }

    appointment.status = "cancelled";
    appointment.cancellationReason = reason || "کنسل شده توسط ادمین";
    appointment.cancelledBy = (req.user as UserDocument)._id;
    await appointment.save();

    await NotificationService.send({
      userId: appointment.user._id.toString(),
      title: "درخواست مشاوره شما تأیید نشد",
      message: `متأسفانه درخواست مشاوره شما برای تاریخ ${formatPersianDate(appointment.appointmentDate)} تأیید نشد.`,
      type: "appointment_rejected",
      link: `/appointments/${appointment._id}`,
      deduplicationKey: `appointment-rejected-${appointment._id}`,
    });

    res.status(200).json({
      status: "success",
      message: "جلسه با موفقیت کنسل شد",
      data: appointment,
    });
  },
);

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

export const rescheduleAppointment = CatchError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newDate, reason } = req.body;
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      throw new AppError("جلسه مشاوره یافت نشد", 404);
    }

    if (appointment.status !== "approved" && appointment.status !== "pending") {
      throw new AppError("این جلسه قابل تغییر زمان نیست", 400);
    }

    const newAppointmentDate = new Date(newDate);
    if (newAppointmentDate <= new Date()) {
      throw new AppError("تاریخ جدید باید در آینده باشد", 400);
    }

    appointment.appointmentDate = newAppointmentDate;
    appointment.rescheduleReason =
      reason || "زمان جلسه مشاوره توسط ادمین تغییر کرد";
    appointment.rescheduledBy = (req.user as UserDocument)._id;
    await appointment.save();

    await NotificationService.send({
      userId: appointment.user._id.toString(),
      title: "زمان مشاوره تغییر کرد",
      message: `زمان جلسه مشاوره شما به ${formatPersianDate(appointment.appointmentDate)} تغییر یافت.${
        reason ? ` دلیل: ${reason}` : ""
      }`,
      type: "appointment_rescheduled",
      link: `/appointments/${appointment._id}`,
      deduplicationKey: `appointment-rescheduled-${appointment._id}-${new Date(newAppointmentDate).getTime()}`,
    });

    res.status(200).json({
      status: "success",
      message: "زمان جلسه با موفقیت تغییر یافت",
      data: appointment,
    });
  },
);

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
