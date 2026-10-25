import type { Request, Response } from "express";

import CatchError from "../../utils/catchAsync.js";

import { followUpService } from "../../container/index.js";
import { getAll } from "../../controllers/handlerFactory.js";
import type { FollowUpDocument } from "../../models/followUp.model.js";
import FollowUpModel from "../../models/followUp.model.js";

export const getTodayFollowUps = CatchError(
  async (req: Request, res: Response) => {
    const followUps = await followUpService.getTodayFollowUps();

    res.status(200).json({
      status: "success",
      results: followUps.length,
      data: followUps,
    });
  },
);

export const getOverdueFollowUps = CatchError(
  async (req: Request, res: Response) => {
    const followUps = await followUpService.getOverdueFollowUps();

    res.status(200).json({
      status: "success",
      results: followUps.length,
      data: followUps,
    });
  },
);

export const completeFollowUp = CatchError(
  async (req: Request, res: Response) => {
    const followUp = await followUpService.completeFollowUp(
      req.params.id as string,
    );

    res.status(200).json({
      status: "success",
      data: followUp,
    });
  },
);

export const deleteFollowUp = CatchError(
  async (req: Request, res: Response) => {
    await followUpService.deleteFollowUp(req.params.id as string);

    res.status(204).send();
  },
);

export const getAllFollowUps = getAll<FollowUpDocument>(FollowUpModel);
