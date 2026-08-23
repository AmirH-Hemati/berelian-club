import { Types } from "mongoose";
import UserFileModel from "../../models/userFile.model.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import type { FileService } from "../file/file.service.js";
import type { NotificationService } from "../notification/notification.service.js";

type SendFileToUserInput = {
  userId: string;
  fileId: string;
  sentBy: Types.ObjectId;
};

type SendFileToRoleInput = {
  fileId: string;
  sentBy: Types.ObjectId;
  targetRole: "investor";
};

export class UserFileService {
  constructor(
    private readonly fileService: FileService,
    private readonly notificationService: NotificationService,
  ) {}

  async sendFileToUser(data: SendFileToUserInput) {
    const file = await this.fileService.getFileById(data.fileId);

    const userFile = await UserFileModel.create({
      user: data.userId,
      file: file._id,
      sentBy: data.sentBy,
    });

    await this.notificationService.send({
      userId: data.userId,
      title: "فایل جدید برای شما ارسال شد",
      message: `فایل «${file.originalName}» برای شما ارسال شد.`,
      type: "file_received",
      link: "/learning",
      deduplicationKey: `file-received-${userFile._id}`,
    });

    return userFile;
  }

  async sendFileToRole(data: SendFileToRoleInput) {
    const file = await this.fileService.getFileById(data.fileId);

    await UserFileModel.create({
      file: file._id,
      sentBy: data.sentBy,
      targetRole: data.targetRole,
    });

    return file;
  }

  async getUserFiles(
    userId: Types.ObjectId,
    role: string,
    query: Record<string, unknown>,
  ) {
    const features = new ApiFeatures(
      UserFileModel.find({
        $or: [
          { user: userId },

          {
            targetRole: role === "investor" ? "investor" : null,
          },
        ],
      }),
      query,
    )
      .filter()
      .search()
      .sort()
      .fields();

    const { total, limit, page, totalPages } = await features.pagination();

    const userFiles = await features.query;

    return {
      userFiles,

      pagination: {
        total,
        limit,
        page,
        totalPages,
      },
    };
  }

  async getDownloadData(userId: Types.ObjectId, role: string, fileId: string) {
    const userFile = await UserFileModel.findOne({
      file: fileId,

      $or: [
        { user: userId },

        {
          targetRole: role === "investor" ? "investor" : null,
        },
      ],
    });

    if (!userFile) {
      throw new AppError("شما به این فایل دسترسی ندارید", 403);
    }

    return this.fileService.downloadFile(fileId);
  }

  async deleteByFileId(fileId: string) {
    await UserFileModel.deleteMany({
      file: fileId,
    });
  }
}
