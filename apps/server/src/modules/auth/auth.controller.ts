import crypto from "crypto";
import type { CookieOptions, NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import multer, { type FileFilterCallback } from "multer";
import path from "path";
import sharp from "sharp";
import { AppError } from "../../utils/AppError.js";
import CatchError from "../../utils/catchAsync.js";
import { authService } from "../../container/index.js";
import { thirtyDaysFromNow } from "../../utils/date.js";
import type { UserDocument } from "../../models/user.model.js";
import UserModel from "../../models/user.model.js";


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
  if (!req.file) {
    return next();
  }
  const uniqueName = crypto.randomBytes(16).toString("hex");
  const fileName = `user-${uniqueName}.jpeg`;
  const imagePath = path.join(
    process.cwd(),
    "public",
    "images",
    "users",
    fileName,
  );
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(imagePath);

  req.body.photo = fileName;

  const user = await UserModel.findById((req.user as UserDocument)._id).select(
    "photo",
  );
  if (!user?.photo) {
    return next();
  }

  const oldPhotoPath = path.join(
    process.cwd(),
    "public",
    "images",
    "users",
    user.photo as string,
  );
  try {
    await fs.unlink(oldPhotoPath);
  } catch (error: any) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
  next();
});

export const handleSendOtp = CatchError(async (req, res, next) => {
  const { phoneNumber } = req.body;

  const otpCode = await authService.sendOtp(phoneNumber);

  return res.status(200).json({
    message: "کد تایید به شماره همراه شما ارسال گردید",
    data: { code: otpCode },
  });
});

export const handleVerifyOtp = CatchError(async (req, res, next) => {
  const { phoneNumber, otp } = req.body;

  const { user, token } = await authService.verifyOtp(phoneNumber, otp);

  const cookieOption: CookieOptions = {
    expires: thirtyDaysFromNow(),
    secure: true,
    httpOnly: true,
    sameSite: "none",
  };
  res.cookie("token", token, cookieOption);
  return res.status(200).json({
    message: "خوش آمدید",
    data: { user },
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

export const updateMe = CatchError(async (req, res, next) => {
  const userId = (req.user as UserDocument)._id.toString();
  const forbiddenFields = ["role", "isActive", "createdAt", "_id", "password"];

  const filtersBody: Record<string, string> = {};
  Object.keys(req.body).forEach((key) => {
    if (!forbiddenFields.includes(key)) {
      filtersBody[key] = req.body[key];
    }
  });

  const user = await authService.updateMe(userId, filtersBody);

  res.status(200).json({
    status: "success",
    data: user,
  });
});
