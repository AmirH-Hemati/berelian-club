import type { Request, Response } from "express";
import FollowUpModel from "../models/followUp.model.js";
import SessionReportModel from "../models/sessionReport.model.js";
import type { UserDocument } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import CatchError from "../utils/catchAsync.js";

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

    const existSessionReport = await SessionReportModel.findOne({
      appointment,
    });

    if (existSessionReport) {
      throw new AppError("گزارش جلسه از قبل وارد شده است", 400);
    }
    const sessionReport = await SessionReportModel.create({
      appointment,
      user: userId,
      advisor: (req.user as UserDocument)._id,
      summary,
      result,
      resultDescription,
      notes,
    });

    if (needFollowUp) {
      await FollowUpModel.create({
        sessionReport: sessionReport._id,
        dueDate: followUpDate,
        note: followUpAction,
      });
    }

    res.status(201).json({
      status: "success",
      data: sessionReport,
    });
  },
);

export const getSessionReport = CatchError(async (req, res) => {
  const { appointmentId } = req.params;

  const sessionReport = await SessionReportModel.findOne({
    appointment: appointmentId,
  });
  if (!sessionReport) {
    throw new AppError("گزارش جلسه ای پیدا نشد", 400);
  }

  res.status(201).json({
    status: "success",
    data: sessionReport,
  });
});
export const deleteSessionReport = CatchError(async (req, res) => {
  const { id } = req.params;

  const sessionReport = await SessionReportModel.findByIdAndDelete(id);

  if (!sessionReport) {
    throw new AppError("گزارشی با آیدی مشخص شده پیدا نشد", 404);
  }

  const followUp = await FollowUpModel.findOneAndDelete({
    sessionReport: id,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
