import UserModel from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import CatchError from "../utils/catchAsync.js";
import { tokenService } from "../container/index.js";

export const protectedRoute = CatchError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new AppError("لطفا برای ادامه دسترسی وارد حساب کاربری خود شوید", 401);
  }

  const decoded = tokenService.verifyToken(token);

  const user = await UserModel.findById(decoded.id);
  if (!user) {
    throw new AppError("کاربر مربوط به این توکن یافت نشد", 401);
  }

  req.user = user;
  next();
});
