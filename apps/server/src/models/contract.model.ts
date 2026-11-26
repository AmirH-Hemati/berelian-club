import mongoose from "mongoose";

export type ContractStatus = "draft" | "active" | "expired" | "terminated";

export interface ContractDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: ContractStatus;
  createdAt: Date;
  updatedAt: Date;

  contractDaysRemaining: number;
  contractProgress: number;
}

const contractSchema = new mongoose.Schema<ContractDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "active", "expired", "terminated"],
      default: "draft",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

contractSchema.virtual("contractDaysRemaining").get(function () {
  const today = new Date();
  const end = new Date(this.endDate);

  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
});

contractSchema.virtual("contractProgress").get(function () {
  const start = new Date(this.startDate).getTime();
  const end = new Date(this.endDate).getTime();
  const now = Date.now();

  if (now < start) return 0;
  if (now >= end) return 100;
  if (end <= start) return 0;

  return Math.round(((now - start) / (end - start)) * 100);
});

export const ContractModel = mongoose.model<ContractDocument>(
  "Contract",
  contractSchema,
);
