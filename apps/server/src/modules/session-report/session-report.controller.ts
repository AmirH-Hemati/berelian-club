import type { Request, Response } from "express";
import type { UserDocument } from "../../models/user.model.js";
import CatchError from "../../utils/catchAsync.js";
import { sessionReportService } from "../../container/index.js";

export const createSessionReport = CatchError(
  async (req: Request, res: Response) => {
    const {
      appointment,
      summary,
      userId,
      result,
      resultDescription,
      notes,
      needFollowUp,
      followUpDate,
      followUpAction,
    } = req.body;
    const advisor = req.user as UserDocument;

    const sessionReport = await sessionReportService.createSessionReport({
      appointment,
      summary,
      userId,
      advisorId: advisor._id.toString(),
      result,
      resultDescription,
      notes,
      needFollowUp,
      followUpDate,
      followUpAction,
    });

    return res.status(201).json({
      status: "success",
      data: sessionReport,
    });
  },
);

export const getSessionReport = CatchError(
  async (req: Request, res: Response) => {
    const sessionReport =
      await sessionReportService.getSessionReportByAppointment(
        req.params.appointmentId as string,
      );

    return res.status(200).json({
      status: "success",
      data: sessionReport,
    });
  },
);
export const deleteSessionReport = CatchError(
  async (req: Request, res: Response) => {
    await sessionReportService.deleteSessionReport(req.params.id);

    return res.status(204).send();
  },
);
