import SessionReportModel from "../../models/sessionReport.model.js";

import { AppError } from "../../utils/AppError.js";

import type { FollowUpService } from "../follow-up/follow-up.service.js";

type CreateSessionReportInput = {
  appointment: string;
  summary: string;
  userId: string;
  advisorId: string;
  result: "completed" | "pending" | "cancelled" | "failed";
  resultDescription?: string;
  notes?: string;
  needFollowUp?: boolean;
  followUpDate?: Date;
  followUpAction?: string;
};

export class SessionReportService {
  constructor(private readonly followUpService: FollowUpService) {}

  async createSessionReport(data: CreateSessionReportInput) {
    const existSessionReport = await SessionReportModel.findOne({
      appointment: data.appointment,
    });

    if (existSessionReport) {
      throw new AppError("گزارش جلسه از قبل وارد شده است", 400);
    }

    const sessionReport = await SessionReportModel.create({
      appointment: data.appointment,
      user: data.userId,
      advisor: data.advisorId,
      summary: data.summary,
      result: data.result,
      resultDescription: data.resultDescription,
      notes: data.notes,
    });

    if (data.needFollowUp) {
      if (!data.followUpDate) {
        throw new AppError("تاریخ پیگیری الزامی است", 400);
      }

      await this.followUpService.createFollowUp({
        sessionReport: sessionReport._id.toString(),
        dueDate: data.followUpDate,
        note: data.followUpAction,
      });
    }

    return sessionReport;
  }

  async getSessionReportByAppointment(appointmentId: string) {
    const sessionReport = await SessionReportModel.findOne({
      appointment: appointmentId,
    });

    if (!sessionReport) {
      throw new AppError("گزارش جلسه‌ای پیدا نشد", 404);
    }

    return sessionReport;
  }

  async deleteSessionReport(id: string) {
    const sessionReport = await SessionReportModel.findById(id);

    if (!sessionReport) {
      throw new AppError("گزارشی با آیدی مشخص شده پیدا نشد", 404);
    }

    await this.followUpService.deleteBySessionReportId(
      sessionReport._id.toString(),
    );

    await SessionReportModel.findByIdAndDelete(sessionReport._id);
  }
}
