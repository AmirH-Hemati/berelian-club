import type { NextFunction, Request, Response } from "express";

import CatchError from "../../utils/catchAsync.js";

import { getAll } from "../../controllers/handlerFactory.js";

import { FileModel, type FileDocument } from "../../models/file.model.js";

import { fileService } from "../../container/index.js";
import { AppError } from "../../utils/AppError.js";

export const uploadFile = CatchError(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError("فایلی آپلود نشده است", 400);
  }

  const file = await fileService.uploadFile(req.file);

  return res.status(201).json({
    status: "success",
    data: file,
  });
});

export const downloadFileById = CatchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { file, filePath } = await fileService.downloadFile(
      req.params.id as string,
    );

    res.download(filePath, file.originalName, (error: any) => {
      if (!error) {
        return;
      }

      if (error.code === "ENOENT") {
        return next(new AppError("فایل روی سرور وجود ندارد", 404));
      }

      return next(new AppError("خطا در دانلود فایل", 500));
    });
  },
);

export const deleteFile = CatchError(async (req: Request, res: Response) => {
  await fileService.deleteFile(req.params.id as string);

  return res.status(204).send();
});
export const getAllFiles = getAll<FileDocument>(FileModel);
