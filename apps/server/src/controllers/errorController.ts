import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { z } from "zod";

const handelDuplicateFieldsDb = (err: AppError) => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || "";
  const message = `فیلد انتخاب شده تکراری است ${value} `;
  return new AppError(message, 400);
};
function handleJWTError() {
  return new AppError("توکن نامعتبر است , دوباره وارد شوید", 401);
}
function handleJWTExpiredError() {
  return new AppError("توکن منقضی شده است , دوباره وارد شوید", 401);
}
const sendErrorDev = (res: Response, err: AppError) => {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      message: "خطا در اعتبارسنجی داده‌ها",
      status: err.status,
      errors,
    });
  }
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    stack: err.stack,
    err,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      message: "خطا در اعتبارسنجی داده‌ها",
      status: err.status,
      errors,
    });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      status: err.status,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "یک خطای غیر منتظره رخ داد",
  });
};
export const errorController = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.APP_ENV === "development") {
    sendErrorDev(res, err);
  } else if (process.env.APP_ENV === "production") {
    if (err.code === 11000) err = handelDuplicateFieldsDb(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();
    sendErrorProd(err, res);
  }
};
