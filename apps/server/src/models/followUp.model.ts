import mongoose, { Query } from "mongoose";

export interface FollowUpDocument extends mongoose.Document {
  sessionReport: mongoose.Types.ObjectId;
  dueDate: Date;
  note: string;
  status: "pending" | "completed" | "cancelled";
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const followUpSchema = new mongoose.Schema<FollowUpDocument>(
  {
    sessionReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SessionReport",
      required: true,
      index: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

followUpSchema.index({ dueDate: 1, status: 1 });

followUpSchema.pre<Query<FollowUpDocument, FollowUpDocument[]>>(
  /find/,
  function () {
    this.populate("sessionReport", "summary result ");
  },
);
const FollowUpModel = mongoose.model<FollowUpDocument>(
  "FollowUp",
  followUpSchema,
);

export default FollowUpModel;
