import type { CookieOptions, NextFunction, Request, Response } from "express";
import UserModel, { type UserDocument } from "../models/user.model.js";
import verificationModel from "../models/verification.model.js";
import VerificationModel from "../models/verification.model.js";
import { AppError } from "../utils/AppError.js";
import CatchError from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { thirtyDaysFromNow } from "../utils/date.js";
import { getOne } from "./handlerFactory.js";
import userModel from "../models/user.model.js";
import multer, { type FileFilterCallback } from "multer";
import crypto from "crypto";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const multerStorage = multer.memoryStorage();
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("لطفا فقط عکس اپلود کنید .", 400));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadUserImage = upload.single("photo");

export const resizeUserImage = CatchError(async (req, res, next) => {
  if (!req.file) return next();
  const uniqueName = crypto.randomBytes(16).toString("hex");
  const fileName = `user-${uniqueName}.jpeg`;
  const pathName = path.join(process.cwd(), `public/images/users/${fileName}`);
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(pathName);

  req.body.photo = fileName;
  const user = await UserModel.findById((req.user as UserDocument)._id);
  if (!user?.photo) {
    next();
  }
  const oldPhotoPath = path.join(
    process.cwd(),
    `public/images/users/${user?.photo}`,
  );
  if (fs.existsSync(oldPhotoPath)) {
    fs.unlinkSync(oldPhotoPath);
  }

  next();
});

export const handleSendOtp = CatchError(async (req, res, next) => {
  const { phoneNumber } = req.body;
  const user = await UserModel.findOne({ phoneNumber });

  if (!user) {
    throw new AppError("حساب کاربری متناسب با شماره موبایل موجود نیست", 404);
  }
  
  const existingVerification = await VerificationModel.findOne({
    phoneNumber,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (existingVerification) {
    const remainingSeconds = Math.ceil(
      (existingVerification.expiresAt.getTime() - Date.now()) / 1000,
    );
    throw new AppError(
      `کد تایید قبلی هنوز معتبر است. ${remainingSeconds} ثانیه دیگر می‌توانید درخواست مجدد دهید.`,
      429,
    );
  }
  const verification = await VerificationModel.create({ phoneNumber });
  const verificationCode = verification.generateVerificationCode();
  await verification.save();

  console.log(verificationCode);
  /// send sms

  return res.status(200).json({
    message: "کد تایید به شماره همراه شما ارسال گردید",
    data: { code: verificationCode },
  });
});

export const handleVerifyOtp = CatchError(async (req, res, next) => {
  const { phoneNumber, otp } = req.body;
  const user = await UserModel.findOne({ phoneNumber });
  if (!user) {
    throw new AppError("حساب کاربری متناسب با شماره موبایل موجود نیست", 404);
  }
  const verification = await verificationModel.findOne({
    phoneNumber,
    code: otp,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!verification) {
    throw new AppError("کد تایید نامعتبر یا منقضی شده است", 400);
  }
  verification.isUsed = true;
  await verification.save();
  // sign token and save in cookies
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "30d",
    },
  );

  const cookieOption: CookieOptions = {
    expires: thirtyDaysFromNow(),
    secure: true,
    httpOnly: true,
    sameSite: "none",
  };
  res.cookie("token", token, cookieOption);
  return res.status(200).json({
    message: "خوش آمدید",
    data: { token, user },
  });
});

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
  res.status(200).json({
    status: "success",
    message: "با موفقیت خارج شدید",
  });
};

export const protectedRoute = CatchError(async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    throw new AppError("لطفا برای ادامه دسترسی وارد حساب کاربری خود شوید", 401);
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  if (typeof decoded === "string" || !decoded || !decoded.id) {
    throw new AppError("توکن نامعتبر است", 401);
  }
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    throw new AppError("کاربر مربوط به این توکن یافت نشد", 401);
  }

  req.user = user;
  next();
});

export const setUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req.user as UserDocument)._id.toString();
  if (!req.params.id) req.params.id = userId;
  next();
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("شما وارد نشده‌اید", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("شما دسترسی به این بخش ندارید", 403));
    }

    next();
  };
};

export const updateMe = CatchError(async (req, res, next) => {
  const forbiddenFields = ["role", "isActive", "createdAt", "_id", "password"];

  const filtersBody: Record<string, string> = {};
  Object.keys(req.body).forEach((key) => {
    if (!forbiddenFields.includes(key)) {
      filtersBody[key] = req.body[key];
    }
  });
  const userId = (req.user as UserDocument)._id.toString();
  const user = await UserModel.findByIdAndUpdate(userId, filtersBody, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw new AppError("کاربری یافت نشد", 404);
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const getUser = getOne<UserDocument>(userModel);
