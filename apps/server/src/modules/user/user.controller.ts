import type { NextFunction, Request, Response } from "express";
import userModel, {
  type UserDocument,
  type UserRole,
} from "../../models/user.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../../controllers/handlerFactory.js";
import CatchError from "../../utils/catchAsync.js";
import { userService } from "../../container/index.js";

export const createUser = createOne<UserDocument>(userModel);
export const getUsers = getAll<UserDocument>(userModel);
export const getUser = getOne<UserDocument>(userModel);
export const updateUser = updateOne<UserDocument>(userModel);
export const deleteUser = deleteOne<UserDocument>(userModel);

export const setUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req.user as UserDocument)._id.toString();
  if (!req.params.id) req.params.id = userId;
  next();
};

export const getUsersByRole = CatchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.params;

    const userRoles = ["admin", "investor", "reception", "consultant"];

    if (!userRoles.includes(role as UserRole)) {
      return res.status(400).json({
        status: "fail",
        message: "نقش کاربر معتبر نیست.",
      });
    }

    const users = await userService.getUsersByRole(role as UserRole);

    return res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  },
);
