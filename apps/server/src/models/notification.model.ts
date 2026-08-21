import mongoose from "mongoose";

export interface NotificationDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type:
    | "file_received"
    | "request_approved"
    | "request_rejected"
    | "appointment_approved"
    | "appointment_rejected"
    | "appointment_rescheduled"
    | "reminder"
    | "contract_start"
    | "contract_expiry"
    | "birthday";
  link?: string;
  deduplicationKey?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new mongoose.Schema<NotificationDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "file_received",
        "request_approved",
        "request_rejected",
        "appointment_approved",
        "appointment_rejected",
        "appointment_rescheduled",
        "contract_start",
        "contract_expiry",
        "birthday",
        "reminder",
      ],
    },
    link: {
      type: String,
      required: false,
    },
    deduplicationKey: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

notificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 20 * 24 * 60 * 60 },
);

notificationSchema.index(
  {
    user: 1,
    deduplicationKey: 1,
  },
  { unique: true },
);

const NotificationModel = mongoose.model<NotificationDocument>(
  "Notification",
  notificationSchema,
);

export default NotificationModel;
