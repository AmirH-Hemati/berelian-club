import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export const convertDateFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fields.forEach((field) => {
        const [parent, key] = field.includes(".")
          ? field.split(".")
          : [null, field];

        const target = parent ? req.body[parent] : req.body;

        if (!target?.[key]) return;

        if (typeof target[key] === "string") {
          const date = new Date(target[key]);

          if (isNaN(date.getTime())) {
            throw new AppError(`فرمت ${field} معتبر نیست`, 400);
          }

          target[key] = date;
        }
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};
