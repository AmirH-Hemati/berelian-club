import FollowUpModel from "../../models/followUp.model.js";

import { AppError } from "../../utils/AppError.js";

export class FollowUpService {
  async createFollowUp(data: {
    sessionReport: string;
    dueDate: Date;
    note?: string;
  }) {
    return FollowUpModel.create({
      sessionReport: data.sessionReport,
      dueDate: data.dueDate,
      note: data.note,
    });
  }

  async getTodayFollowUps() {
    const start = new Date();

    start.setHours(0, 0, 0, 0);

    const end = new Date(start);

    end.setHours(23, 59, 59, 999);

    return FollowUpModel.find({
      isCompleted: false,

      dueDate: {
        $gte: start,
        $lte: end,
      },
    })
      .populate("sessionReport")
      .sort({
        dueDate: 1,
      });
  }

  async getOverdueFollowUps() {
    return FollowUpModel.find({
      isCompleted: false,

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
        isCompleted: true,
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
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);

    endOfDay.setHours(23, 59, 59, 999);

    return FollowUpModel.countDocuments({
      isCompleted: false,

      dueDate: {
        $gte: startOfDay,
        $lte: endOfDay,
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

  async deleteBySessionReportId(sessionReportId: string) {
    return FollowUpModel.deleteOne({
      sessionReport: sessionReportId,
    });
  }
}
