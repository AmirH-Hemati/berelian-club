import mongoose, { Query } from "mongoose";

export interface RequestDocument extends mongoose.Document {
  investor: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId | null;
  assignedAt: Date | null;
  description: string;
  type: "renew_contract" | "increase_capital" | "decrease_capital";
  status: "pending" | "approved" | "cancelled" | "completed";
  createdAt: Date;
  updatedAt: Date;
  cancellationReason?: string;
  cancelledBy?: mongoose.Types.ObjectId;
  completedAt: Date | null;
}
const requestSchema = new mongoose.Schema<RequestDocument>(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assignedAt: {
      type: Date,
      default: null,
    },
    type: {
      type: String,
      enum: ["renew_contract", "increase_capital", "decrease_capital"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "completed"],
      default: "pending",
      required: true,
    },
    cancellationReason: {
      type: String,
      default: null,
      trim: true,
    },
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

requestSchema.pre<Query<RequestDocument, RequestDocument>>(
  /^find/,
  function () {
    this.populate(
      "investor",
      "firstName lastName photo _id phoneNumber nationalCode ",
    )
      .populate("cancelledBy", "firstName lastName photo")
      .populate("assignedTo", "firstName lastName photo");
  },
);

const RequestModel = mongoose.model<RequestDocument>("Request", requestSchema);

export default RequestModel;
