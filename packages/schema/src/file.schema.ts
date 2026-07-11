import { z } from "zod";
import { UserType } from "./user.schema.js";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",

  "video/mp4",
  "video/webm",
  "video/quicktime",

  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
];

export const uploadFileSchema = z.object({
  file: z
    .any()
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `حجم فایل باید کمتر از ${MAX_FILE_SIZE / 1024 / 1024} مگابایت باشد`,
    })
    .refine((file) => ALLOWED_MIME_TYPES.includes(file.type), {
      message: "نوع فایل مجاز نیست. فقط تصویر، ویدئو و PDF مجاز است",
    }),
});

export const sendFileToUserSchema = z.object({
  userId: z.string().min(1, "شناسه کاربر الزامی است"),
  fileId: z.string().min(1, "شناسه فایل الزامی است"),
});

export type uploadFileTypes = z.infer<typeof uploadFileSchema>;
export interface FileType {
  _id: string;
  originalName: string;
  fileName: string;
  fileType: "image" | "video" | "document" | "other";
  mimeType: string;
  size: number;
  path: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserFileType {
  _id: string;
  file: FileType;
  sentBy: Pick<UserType, "firstName" | "lastName">;
  createdAt: Date;
  updatedAt: Date;
}
