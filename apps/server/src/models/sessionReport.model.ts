import mongoose, { Query } from "mongoose";

export interface SessionReportDocument extends mongoose.Document {
  appointment: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  advisor: mongoose.Types.ObjectId;
  summary: string;
  result: "completed" | "pending" | "cancelled" | "failed";
  resultDescription?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionReportSchema = new mongoose.Schema<SessionReportDocument>(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    advisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summary: {
      type: String,
      required: [true, "خلاصه جلسه الزامی است"],
      trim: true,
    },
    result: {
      type: String,
      enum: ["completed", "pending", "cancelled", "failed"],
      required: [true, "نتیجه جلسه الزامی است"],
    },
    resultDescription: {
      type: String,
      default: null,
      trim: true,
    },
    notes: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true },
);

sessionReportSchema.pre<Query<SessionReportDocument, SessionReportDocument>>(
  /^find/,
  function () {
    this.populate("advisor", "firstName lastName");
  },
);

sessionReportSchema.index({ appointment: 1, user: 1 });
sessionReportSchema.index({ createdBy: 1, createdAt: -1 });

const SessionReportModel = mongoose.model<SessionReportDocument>(
  "SessionReport",
  sessionReportSchema,
);

export default SessionReportModel;
