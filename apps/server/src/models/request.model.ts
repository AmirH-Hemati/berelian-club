import mongoose, { Query } from "mongoose";

export interface RequestDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  description: string;
  type:
    "consultation" | "renew_contract" | "increase_capital" | "decrease_capital";
  status: "pending" | "approved" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  cancellationReason?: string;
  cancelledBy?: mongoose.Types.ObjectId;
}
const requestSchema = new mongoose.Schema<RequestDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "consultation",
        "renew_contract",
        "increase_capital",
        "decrease_capital",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
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
  },
  { timestamps: true },
);

requestSchema.pre<Query<RequestDocument, RequestDocument>>(
  /^find/,
  function () {
    this.populate("user", "firstName lastName photo _id phoneNumber nationalCode " ).populate(
      "cancelledBy",
      "firstName lastName",
    );
  },
);

const RequestModel = mongoose.model<RequestDocument>("Request", requestSchema);

export default RequestModel;
