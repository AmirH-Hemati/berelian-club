import { DateTime } from "luxon";

import FollowUpModel from "../../models/followUp.model.js";
import SessionReportModel from "../../models/sessionReport.model.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

import { AppError } from "../../utils/AppError.js";
import type { ClientSession } from "mongoose";

export class FollowUpService {
  async createFollowUp(data: any, session?: ClientSession) {
    const followUp = new FollowUpModel(data);

    await followUp.save({ session });

    return followUp;
  }

  async getTodayFollowUps(
    consultantId: string,
    startDate: Date,
    endDate: Date,
    query: Record<string, unknown>,
  ) {
    const features = new ApiFeatures(
      FollowUpModel.find({
        consultant: consultantId,
        dueDate: {
          $gte: startDate,
          $lt: endDate,
        },
      }),
      query,
    )
      .filter()
      .sort()
      .fields();

    const { total, limit, page, totalPages } = await features.pagination();

    const followUps = await features.query;

    return {
      followUps,
      pagination: {
        total,
        limit,
        page,
        totalPages,
      },
    };
  }
  async getOverdueFollowUps() {
    return FollowUpModel.find({
      status: "pending",

      dueDate: {
        $lt: new Date(),
      },
    })
      .populate("sessionReport")
      .sort({
        dueDate: 1,
      });
  }

  async completeFollowUp(id: string) {
    const followUp = await FollowUpModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "completed",
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!followUp) {
      throw new AppError("پیگیری مورد نظر پیدا نشد", 404);
    }

    return followUp;
  }
  async countTodayPendingFollowUps() {
    const now = DateTime.now().setZone("Asia/Tehran");

    const startDate = now.startOf("day").toUTC().toJSDate();
    const endDate = now.plus({ days: 1 }).startOf("day").toUTC().toJSDate();

    return FollowUpModel.countDocuments({
      status: "pending",
      dueDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });
  }

  async deleteFollowUp(id: string) {
    const followUp = await FollowUpModel.findByIdAndDelete(id);

    if (!followUp) {
      throw new AppError("پیگیری مورد نظر پیدا نشد", 404);
    }

    return followUp;
  }

  async deleteBySessionReportId(
    sessionReportId: string,
    session?: ClientSession,
  ) {
    return FollowUpModel.deleteMany({
      sessionReport: sessionReportId,
    }).session(session ?? null);
  }
}
