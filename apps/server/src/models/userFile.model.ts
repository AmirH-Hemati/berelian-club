import mongoose, { Query } from "mongoose";

export interface UserFileDocument extends mongoose.Document {
  user?: mongoose.Types.ObjectId;
  file: mongoose.Types.ObjectId;
  sentBy: mongoose.Types.ObjectId;
  targetRole?: "investor";
  createdAt: Date;
  updatedAt: Date;
}

const userFileSchema = new mongoose.Schema<UserFileDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetRole: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userFileSchema.index({ user: 1, file: 1 });
userFileSchema.index({ targetRole: 1 });

userFileSchema.pre<Query<UserFileDocument, UserFileDocument[]>>(
  /^find/,
  function () {
    this.populate("file")
      .populate({
        path: "sentBy",
        select: "firstName lastName",
      })
      .lean();
  },
);
const UserFileModel = mongoose.model<UserFileDocument>(
  "UserFile",
  userFileSchema,
);

export default UserFileModel;
