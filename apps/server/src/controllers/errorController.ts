import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { z } from "zod";

const handleDuplicateFieldsDb = (err: any) => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || "";
  const message = `فیلد انتخاب شده تکراری است ${value} `;
  return new AppError(message, 400);
};
function handleJWTError(err: Error) {
  return new AppError(`توکن نامعتبر است: ${err.message}، دوباره وارد شوید`, 401);
}
function handleJWTExpiredError(err: Error) {
  return new AppError(`توکن منقضی شده است: ${err.message}، دوباره وارد شوید`, 401);
}
const sendErrorDev = (res: Response, err: any) => {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      message: "خطا در اعتبارسنجی داده‌ها",
      status: "fail",
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

const sendErrorProd = (err: any, res: Response) => {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      message: "خطا در اعتبارسنجی داده‌ها",
      status: "fail",
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
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.APP_ENV === "development") {
    sendErrorDev(res, err);
  } else if (process.env.APP_ENV === "production") {
    if (err.code === 11000) err = handleDuplicateFieldsDb(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError(err);
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError(err);
    sendErrorProd(err, res);
  }
};
