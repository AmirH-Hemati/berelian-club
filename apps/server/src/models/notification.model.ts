import mongoose from "mongoose";

export interface NotificationDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: "contract_start" | "contract_expiry" | "birthday" | "reminder";
  deduplicationKey: string;
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
      enum: ["contract_start", "contract_expiry", "birthday", "reminder"],
      required: true,
    },
    deduplicationKey: {
      type: String,
      required: false,
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
