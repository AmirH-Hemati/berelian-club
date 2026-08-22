import fs from "fs/promises";
import path from "path";

import { FileModel } from "../../models/file.model.js";

import UserFileModel from "../../models/userFile.model.js";

import { AppError } from "../../utils/AppError.js";

export class FileService {
    
  async uploadFile(file: Express.Multer.File) {
    const createdFile = await FileModel.create({
      originalName: file.originalname,

      fileName: file.filename,

      fileType: file.mimetype.startsWith("image/")
        ? "image"
        : file.mimetype.startsWith("video/")
          ? "video"
          : "document",

      mimeType: file.mimetype,

      size: file.size,

      path: file.path,

      url: `/files/${file.filename}`,
    });

    return createdFile;
  }

  async getFileById(fileId: string) {
    const file = await FileModel.findById(fileId);

    if (!file) {
      throw new AppError("فایلی یافت نشد", 404);
    }

    return file;
  }

  async downloadFile(fileId: string) {
    const file = await this.getFileById(fileId);

    const filePath = path.join(process.cwd(), file.path);

    return {
      file,
      filePath,
    };
  }

  async deleteFile(fileId: string) {
    const file = await this.getFileById(fileId);

    try {
      await fs.unlink(file.path);
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await Promise.all([
      FileModel.findByIdAndDelete(file._id),

      UserFileModel.deleteMany({
        file: file._id,
      }),
    ]);
  }
}
