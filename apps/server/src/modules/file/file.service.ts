import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";

import { FileModel } from "../../models/file.model.js";
import UserFileModel from "../../models/userFile.model.js";
import { AppError } from "../../utils/AppError.js";

type FileType = "image" | "video" | "document";

export class FileService {
  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new AppError("فایلی آپلود نشده است", 400);
    }

    try {
      const createdFile = await FileModel.create({
        originalName: this.decodeOriginalName(file.originalname),
        fileName: file.filename,
        fileType: this.getFileType(file.mimetype),
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
      });

      return createdFile;
    } catch (error) {
      try {
        await fs.unlink(file.path);
      } catch (cleanupError) {
        console.error("Failed to clean up uploaded file:", cleanupError);
      }

      throw error;
    }
  }

  async getFileById(fileId: string) {
    if (!mongoose.isValidObjectId(fileId)) {
      throw new AppError("شناسه فایل معتبر نیست", 400);
    }

    const file = await FileModel.findById(fileId);

    if (!file) {
      throw new AppError("فایلی یافت نشد", 404);
    }

    return file;
  }

  async downloadFile(fileId: string) {
    const file = await this.getFileById(fileId);
    const filePath = this.resolveFilePath(file.path);

    try {
      await fs.access(filePath);
    } catch (error) {
      if (this.isNodeError(error) && error.code === "ENOENT") {
        throw new AppError("فایل روی سرور وجود ندارد", 404);
      }

      throw error;
    }

    return { file, filePath };
  }

  async deleteFile(fileId: string) {
    const file = await this.getFileById(fileId);
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      await UserFileModel.deleteMany({
        file: file._id,
      }).session(session);

      await FileModel.findByIdAndDelete(file._id).session(session);

      await session.commitTransaction();
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      throw error;
    } finally {
      await session.endSession();
    }

    const filePath = this.resolveFilePath(file.path);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (this.isNodeError(error) && error.code === "ENOENT") {
        return;
      }

      console.error("Failed to delete physical file:", error);

      throw new AppError(
        "رکورد فایل حذف شد، اما حذف فایل از دیسک ناموفق بود",
        500,
      );
    }
  }

  private getFileType(mimeType: string): FileType {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";

    return "document";
  }

  private resolveFilePath(filePath: string): string {
    return path.isAbsolute(filePath)
      ? path.resolve(filePath)
      : path.resolve(process.cwd(), filePath);
  }

  private decodeOriginalName(name: string): string {
    return Buffer.from(name, "latin1").toString("utf8");
  }

  private isNodeError(error: unknown): error is NodeJS.ErrnoException {
    return error instanceof Error && "code" in error;
  }
}
