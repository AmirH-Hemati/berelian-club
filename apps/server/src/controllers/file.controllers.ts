import fs from "fs/promises";

import type { NextFunction, Request, Response } from "express";

import CatchError from "../utils/catchAsync.js";
import { FileModel, type FileDocument } from "../models/file.model.js";
import { getAll } from "./handlerFactory.js";
import { AppError } from "../utils/AppError.js";
import path from "path";
import UserFileModel from "../models/userFile.model.js";

export const uploadFile = CatchError(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError("فایلی آپلود نشده است", 400);
  }

  const file = await FileModel.create({
    originalName: req.file.originalname,
    fileName: req.file.filename,
    fileType: req.file.mimetype.startsWith("image/")
      ? "image"
      : req.file.mimetype.startsWith("video/")
        ? "video"
        : "document",
    mimeType: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    url: `/files/${req.file.filename}`,
  });

  res.status(201).json({
    status: "success",
    data: file,
  });
});

export const getAllFiles = getAll<FileDocument>(FileModel);

export const downloadFileById = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const file = await FileModel.findById(id);
  if (!file) {
    throw new AppError("فایلی یافت نشد", 404);
  }

  const filePath = path.join(process.cwd(), file.path);

  res.download(filePath, file.originalName, (err:any) => {
    if (err) {
      if (err.code === "ENOENT") {
        return next(new AppError("فایل روی سرور وجود ندارد", 404));
      }

      return next(new AppError("خطا در دانلود فایل", 500));
    }
  });
});

export const deleteFile = CatchError(async (req: Request, res: Response) => {
  const file = await FileModel.findById(req.params.id);

  if (!file) {
    throw new AppError("فایل یافت نشد", 404);
  }

  try {
    await fs.unlink(file.path);
  } catch (error: any) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await Promise.all([
    FileModel.findByIdAndDelete(file._id),
    UserFileModel.deleteMany({ file: file._id }),
  ]);

  res.status(204).send();
});
