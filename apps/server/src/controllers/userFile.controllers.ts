import type { Request, Response } from "express";
import type { UserDocument } from "../models/user.model.js";
import CatchError from "../utils/catchAsync.js";
import { FileModel } from "../models/file.model.js";
import UserFileModel from "../models/userFile.model.js";
import { AppError } from "../utils/AppError.js";
import path from "path";
import fs from "fs";
import { ApiFeatures } from "../utils/ApiFeatures.js";
import UserModel from "../models/user.model.js";

export const sendFileToUser = CatchError(
  async (req: Request, res: Response) => {
    const { userId, fileId } = req.body;

    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new AppError("فایل یافت نشد", 404);
    }

    const userFile = await UserFileModel.create({
      user: userId,
      file: file._id,
      sentBy: (req.user as UserDocument)._id,
    });

    res.status(201).json({
      status: "success",
      message: "فایل با موفقیت ارسال شد",
      data: userFile,
    });
  },
);

export const sendFileToAllInvestors = CatchError(
  async (req: Request, res: Response) => {
    const { fileId } = req.body;

    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new AppError("فایل یافت نشد", 404);
    }

    const existingGlobalFile = await UserFileModel.findOne({
      file: fileId,
      targetRole: "investor",
    });

    if (existingGlobalFile) {
      throw new AppError(
        "این فایل قبلاً برای همه سرمایه‌گذاران ارسال شده است",
        400,
      );
    }

    const userFile = await UserFileModel.create({
      file: fileId,
      sentBy: (req.user as UserDocument)._id,
      targetRole: "investor",
    });

    const investorsCount = await UserModel.countDocuments({
      role: "investor",
      isActive: true,
    });

    res.status(201).json({
      status: "success",
      message: `فایل برای ${investorsCount} سرمایه‌گذار ارسال شد`,
      data: {
        file: file.originalName,
        targetRole: "investor",
        investorsCount,
      },
    });
  },
);

export const getUserFiles = CatchError(async (req: Request, res: Response) => {
  const user = req.user as UserDocument;
  const features = new ApiFeatures(
    UserFileModel.find({
      $or: [
        { user: user._id },
        { targetRole: user.role === "investor" ? "investor" : null },
      ],
    }),
    req.query,
  )
    .filter()
    .search()
    .sort()
    .fields();
  const { total, limit, page, totalPages } = await features.pagination();

  const userFiles = await features.query;
  res.status(200).json({
    status: "success",
    data: userFiles,
    pagination: {
      totalPages,
      total,
      limit,
      page,
    },
  });
});

export const getUserFilesByAdmin = CatchError(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const userFiles = await UserFileModel.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: "success",
      data: userFiles,
    });
  },
);

export const downloadUserFile = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const userFile = await UserFileModel.find({
    file: id,
    user: (req.user as UserDocument)._id,
  });
  if (!userFile) {
    throw new AppError("فایل ارسالی برای کاربر یافت نشد", 404);
  }
  const file = await FileModel.findById(id);
  if (!file) {
    throw new AppError("فایلی یافت نشد", 404);
  }
  const filePath = path.join(process.cwd(), file.path);

  if (!fs.existsSync(filePath)) {
    throw new AppError("فایل روی سرور وجود ندارد.", 404);
  }
  res.download(filePath, file.originalName);
});
