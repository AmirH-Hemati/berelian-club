import mongoose, { Query } from "mongoose";

export interface SessionReportDocument extends mongoose.Document {
  appointment: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  consultant: mongoose.Types.ObjectId;
  summary: string;
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
    consultant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    summary: {
      type: String,
      required: [true, "خلاصه جلسه الزامی است"],
      trim: true,
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
    this.populate("consultant", "firstName lastName");
  },
);
sessionReportSchema.index({ appointment: 1 }, { unique: true });
sessionReportSchema.index({ user: 1, createdBy: 1, createdAt: -1 });

const SessionReportModel = mongoose.model<SessionReportDocument>(
  "SessionReport",
  sessionReportSchema,
);

export default SessionReportModel;
