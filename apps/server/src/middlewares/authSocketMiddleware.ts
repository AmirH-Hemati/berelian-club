import jwt from "jsonwebtoken";
import type { NextFunction } from "express";
import type { ExtendedError, Socket } from "socket.io";
import { AppError } from "../utils/AppError.js";
import UserModel from "../models/user.model.js";

export const authSocketMiddleware = async function (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void,
) {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return next(new AppError("token not found", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    if (!decoded) {
      return next(new AppError("Invalid token", 401));
    }

    const user = await UserModel.findById(decoded?.id);

    if (!user) {
      return next(new AppError("user not found", 401));
    }

    socket.user = user;
    socket.userId = user._id;
    next();
  } catch (error) {
    next(new AppError("Unauthorized - Authentication failed", 401));
  }
};
