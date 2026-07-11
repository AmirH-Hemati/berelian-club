import type { Request, Response } from "express";

import FollowUpModel, {
  type FollowUpDocument,
} from "../models/followUp.model.js";
import catchAsync from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import { getAll } from "./handlerFactory.js";

export const getAllFollowUps = getAll<FollowUpDocument>(FollowUpModel);

export const getTodayFollowUps = catchAsync(
  async (req: Request, res: Response) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    const followUps = await FollowUpModel.find({
      isCompleted: false,
      dueDate: {
        $gte: start,
        $lte: end,
      },
    })
      .populate("sessionReport")
      .sort({
        followUpDate: 1,
      });

    res.status(200).json({
      status: "success",
      results: followUps.length,
      data: followUps,
    });
  },
);

export const getOverdueFollowUps = catchAsync(
  async (req: Request, res: Response) => {
    const followUps = await FollowUpModel.find({
      isCompleted: false,
      followUpDate: {
        $lt: new Date(),
      },
    })
      .populate("appointment", "scheduledAt")
      .sort({
        followUpDate: 1,
      });

    res.status(200).json({
      status: "success",
      results: followUps.length,
      data: followUps,
    });
  },
);

export const getFollowUp = catchAsync(async (req: Request, res: Response) => {
  const followUp = await FollowUpModel.findById(req.params.id).populate(
    "appointment",
  );

  if (!followUp) {
    throw new AppError("پیگیری مورد نظر پیدا نشد", 404);
  }

  res.status(200).json({
    status: "success",
    data: followUp,
  });
});

export const completeFollowUp = catchAsync(
  async (req: Request, res: Response) => {
    const followUp = await FollowUpModel.findByIdAndUpdate(
      req.params.id,
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

    res.status(200).json({
      status: "success",
      data: followUp,
    });
  },
);

export const deleteFollowUp = catchAsync(
  async (req: Request, res: Response) => {
    const followUp = await FollowUpModel.findByIdAndDelete(req.params.id);

    if (!followUp) {
      throw new AppError("پیگیری مورد نظر پیدا نشد", 404);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  },
);
