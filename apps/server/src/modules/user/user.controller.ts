import type { NextFunction } from "express";
import userModel, { type UserDocument } from "../../models/user.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../../controllers/handlerFactory.js";

export const setUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req.user as UserDocument)._id.toString();
  if (!req.params.id) req.params.id = userId;
  next();
};

export const createUser = createOne<UserDocument>(userModel);

export const getUsers = getAll<UserDocument>(userModel);

export const getUser = getOne<UserDocument>(userModel);

export const updateUser = updateOne<UserDocument>(userModel);

export const deleteUser = deleteOne<UserDocument>(userModel);
