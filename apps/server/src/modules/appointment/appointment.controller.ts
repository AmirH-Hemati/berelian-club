import type { NextFunction, Request, Response } from "express";
import AppointmentModel, {
  type appointmentDocument,
} from "../../models/appointment.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../../controllers/handlerFactory.js";
import { appointmentService } from "../../container/index.js";
import CatchError from "../../utils/catchAsync.js";
import type { UserDocument } from "../../models/user.model.js";

export const setAppointmentUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.user) req.body.user = req.user?._id;
  next();
};

export const approveAppointment = CatchError(async (req, res) => {
  const { id } = req.params;

  const appointment = await appointmentService.approveAppointment(id as string);

  return res.status(200).json({
    status: "success",
    message: "جلسه مشاوره با موفقیت تایید شد",
    data: appointment,
  });
});

export const rejectAppointment = CatchError(async (req, res) => {
  const { id } = req.params;

  const { reason } = req.body;

  const userId = (req.user as UserDocument)._id;

  const appointment = await appointmentService.rejectAppointment(
    id as string,
    reason,
    userId ,
  );

  return res.status(200).json({
    status: "success",
    message: "جلسه مشاوره با موفقیت کنسل شد",
    data: appointment,
  });
});

export const completeAppointment = CatchError(async (req, res) => {
  const { id } = req.params;

  const appointment = await appointmentService.completeAppointment(
    id as string,
  );

  return res.status(200).json({
    status: "success",
    message: "جلسه مشاوره با موفقیت برگزار شد",
    data: appointment,
  });
});

export const rescheduleAppointment = CatchError(async (req, res) => {
  const { id } = req.params;

  const { newDate, reason } = req.body;

  const userId = (req.user as UserDocument)._id;

  const appointment = await appointmentService.rescheduleAppointment(
    id as string,
    newDate,
    reason,
    userId ,
  );

  return res.status(200).json({
    status: "success",
    message: "زمان جلسه با موفقیت تغییر یافت",
    data: appointment,
  });
});

export const getUserAppointments = CatchError(async (req, res) => {
  const userId = (req.user as UserDocument)._id.toString();

  const appointments = await appointmentService.getUserAppointments(userId);

  return res.status(200).json({
    status: "success",
    data: appointments,
  });
});

export const getTodayAppointments = CatchError(async (req, res) => {
  const appointments = await appointmentService.getTodayAppointments();

  return res.status(200).json({
    status: "success",
    data: appointments,
  });
});
export const getAppointments = getAll<appointmentDocument>(AppointmentModel);
export const getAppointment = getOne<appointmentDocument>(AppointmentModel);
export const createAppointment =
  createOne<appointmentDocument>(AppointmentModel);
export const updateAppointment =
  updateOne<appointmentDocument>(AppointmentModel);
export const deleteAppointment =
  deleteOne<appointmentDocument>(AppointmentModel);
