import type { Request, Response } from "express";

import type { UserDocument } from "../../models/user.model.js";
import CatchError from "../../utils/catchAsync.js";
import { dashboardService } from "../../container/index.js";

export const getStats = CatchError(async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)._id.toString();

  const stats = await dashboardService.getUserStats(userId);

  res.status(200).json({
    status: "success",
    data: stats,
  });
});

export const getStatsAdminDashboard = CatchError(
  async (req: Request, res: Response) => {
    const stats = await dashboardService.getAdminDashboardStats();

    res.status(200).json({
      status: "success",
      data: stats,
    });
  },
);
