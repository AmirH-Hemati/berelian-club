import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("شما وارد نشده‌اید", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("شما دسترسی به این بخش ندارید", 403));
    }

    next();
  };
};
