import type { Request, Response, NextFunction } from "express";
import CatchError from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";
import type { UserDocument } from "../../models/user.model.js";
import { userFileService } from "../../container/index.js";

export const sendFileToUser = CatchError(
  async (req: Request, res: Response) => {
    const { userId, fileId } = req.body;
    const user = req.user as UserDocument;

    const userFile = await userFileService.sendFileToUser({
      userId,
      fileId,
      sentBy: user._id,
    });

    return res.status(201).json({
      status: "success",
      message: "فایل با موفقیت ارسال شد",
      data: userFile,
    });
  },
);
export const sendFileToAllInvestors = CatchError(
  async (req: Request, res: Response) => {
    const { fileId } = req.body;
    const user = req.user as UserDocument;

    const file = await userFileService.sendFileToRole({
      fileId,
      sentBy: user._id,
      targetRole: "investor",
    });

    return res.status(201).json({
      status: "success",
      message: "فایل برای تمامی سرمایه‌گذاران ارسال شد",
      data: {
        file: file.originalName,
        targetRole: "investor",
      },
    });
  },
);

export const getUserFiles = CatchError(async (req: Request, res: Response) => {
  const user = req.user as UserDocument;

  const result = await userFileService.getUserFiles(
    user._id,
    user.role,
    req.query,
  );

  return res.status(200).json({
    status: "success",
    data: result.userFiles,
    pagination: result.pagination,
  });
});

export const downloadUserFile = CatchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument;

    const { file, filePath } = await userFileService.getDownloadData(
      user._id,
      user.role,
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
