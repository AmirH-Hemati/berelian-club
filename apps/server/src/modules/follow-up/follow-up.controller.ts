import type { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync.js";

import { followUpService } from "../../container/index.js";
import { getAll } from "../../controllers/handlerFactory.js";
import type { FollowUpDocument } from "../../models/followUp.model.js";
import FollowUpModel from "../../models/followUp.model.js";

export const getTodayFollowUps = catchAsync(
  async (req: Request, res: Response) => {
    const followUps = await followUpService.getTodayFollowUps();

    res.status(200).json({
      status: "success",
      results: followUps.length,
      data: followUps,
    });
  },
);

export const getOverdueFollowUps = catchAsync(
  async (req: Request, res: Response) => {
    const followUps = await followUpService.getOverdueFollowUps();

    res.status(200).json({
      status: "success",
      results: followUps.length,
      data: followUps,
    });
  },
);

export const completeFollowUp = catchAsync(
  async (req: Request, res: Response) => {
    const followUp = await followUpService.completeFollowUp(req.params.id);

    res.status(200).json({
      status: "success",
      data: followUp,
    });
  },
);

export const deleteFollowUp = catchAsync(
  async (req: Request, res: Response) => {
    await followUpService.deleteFollowUp(req.params.id);

    res.status(204).send();
  },
);

export const getAllFollowUps = getAll<FollowUpDocument>(FollowUpModel);
