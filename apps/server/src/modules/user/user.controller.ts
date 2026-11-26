import type { NextFunction, Request, Response } from "express";
import userModel, {
  type UserDocument,
  type UserRole,
} from "../../models/user.model.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../../controllers/handlerFactory.js";
import CatchError from "../../utils/catchAsync.js";
import { userService } from "../../container/index.js";

export const createUser = CatchError(async (req, res, next) => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const getUser = CatchError(async (req, res) => {
  const user = await userService.getUser(req.params.id as string);

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

export const getUsers = CatchError(async (req, res) => {
  const results = await userService.getUsers(req.query);

  res.status(200).json({
    status: "success",
    data: results.users,
    pagination: results.pagination,
  });
});
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
