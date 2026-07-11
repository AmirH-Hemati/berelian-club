import userModel, { type UserDocument } from "../models/user.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const createUser = createOne<UserDocument>(userModel);

export const getUsers = getAll<UserDocument>(userModel);

export const getUser = getOne<UserDocument>(userModel);

export const updateUser = updateOne<UserDocument>(userModel);

export const deleteUser = deleteOne<UserDocument>(userModel);
