import type { NextFunction, Request, Response } from "express";
import AppointmentModel, {
  type appointmentDocument,
} from "../../models/appointment.model.js";
import {
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

export const createAppointmentController = CatchError(
  async (req: Request, res: Response) => {
    const userId = (req.user as UserDocument)._id.toString();

    const appointment = await appointmentService.createAppointment(
      userId,
      req.body,
    );

    return res.status(201).json({
      status: "success",
      message: "درخواست مشاوره با موفقیت ثبت شد",
      data: appointment,
    });
  },
);

export const approveAppointmentController = CatchError(
  async (req: Request, res: Response) => {
    const consultantId = (req.user as UserDocument)._id;
    const appointment = await appointmentService.approveAppointment(
      req.params.id as string,
      consultantId,
    );

    return res.status(200).json({
      status: "success",
      message: "نوبت مشاوره با موفقیت تأیید شد",
      data: appointment,
    });
  },
);

export const rejectAppointmentController = CatchError(
  async (req: Request, res: Response) => {
    const userId = (req.user as UserDocument)._id.toString();

    const appointment = await appointmentService.rejectAppointment(
      req.params.id as string,
      req.body.reason,
      userId,
    );

    return res.status(200).json({
      status: "success",
      message: "نوبت مشاوره با موفقیت رد شد",
      data: appointment,
    });
  },
);

export const completeAppointmentController = CatchError(
  async (req: Request, res: Response) => {
    const appointment = await appointmentService.completeAppointment(
      req.params.id as string,
    );

    return res.status(200).json({
      status: "success",
      message: "مشاوره با موفقیت تکمیل شد",
      data: appointment,
    });
  },
);

export const rescheduleAppointmentController = CatchError(
  async (req: Request, res: Response) => {
    const userId = (req.user as UserDocument)._id.toString();

    const appointment = await appointmentService.rescheduleAppointment(
      req.params.id as string,
      req.body.appointmentDate,
      req.body.startAt,
      req.body.reason,
      userId,
    );

    return res.status(200).json({
      status: "success",
      message: "زمان مشاوره با موفقیت تغییر کرد",
      data: appointment,
    });
  },
);

export const getUserAppointmentsController = CatchError(
  async (req: Request, res: Response) => {
    const userId = (req.user as UserDocument)._id.toString();

    const { appointments, pagination } =
      await appointmentService.getUserAppointments(userId, req.query);

    return res.status(200).json({
      status: "success",
      data: appointments,
      pagination,
    });
  },
);

export const getUserAppointmentsByParamsController = CatchError(
  async (req: Request, res: Response) => {
    const userId = req.params.id;

    const { appointments, pagination } =
      await appointmentService.getUserAppointments(userId, req.query);

    return res.status(200).json({
      status: "success",
      data: appointments,
      pagination,
    });
  },
);

export const getTodayAppointmentsController = CatchError(
  async (_req: Request, res: Response) => {
    const appointments = await appointmentService.getTodayAppointments();

    return res.status(200).json({
      status: "success",
      results: appointments.length,
      data: appointments,
    });
  },
);
export const getAppointments = getAll<appointmentDocument>(AppointmentModel);
export const getAppointment = getOne<appointmentDocument>(AppointmentModel);

export const updateAppointment =
  updateOne<appointmentDocument>(AppointmentModel);
export const deleteAppointment =
  deleteOne<appointmentDocument>(AppointmentModel);
