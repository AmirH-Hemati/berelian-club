import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export const convertDateFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fields.forEach((field) => {
        if (req.body[field]) {
          if (typeof req.body[field] === "string") {
            const date = new Date(req.body[field]);

            if (isNaN(date.getTime())) {
              throw new AppError(`فرمت ${field} معتبر نیست`, 400);
            }

            req.body[field] = date;
          }
        }
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};
