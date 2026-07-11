import mongoose from "mongoose";

export interface FileDocument extends mongoose.Document {
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

const fileSchema = new mongoose.Schema<FileDocument>(
  {
    originalName: { type: String, required: true },
    fileName: { type: String, required: true, unique: true },
    fileType: {
      type: String,
      enum: ["image", "video", "document", "other"],
      required: true,
    },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true },
);

export const FileModel = mongoose.model<FileDocument>("File", fileSchema);
