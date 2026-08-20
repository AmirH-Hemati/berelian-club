import mongoose, { Query } from "mongoose";

export interface appointmentDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  description: string;
  appointmentDate: Date;
  status: "pending" | "approved" | "cancelled" | "completed";
  type: "online" | "phone";
  meetingLink: string;
  cancellationReason?: string;
  rescheduleReason?: string;
  cancelledBy?: mongoose.Types.ObjectId;
  rescheduledBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const appointmentSchema = new mongoose.Schema<appointmentDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["online", "phone"],
      required: true,
    },
    meetingLink: {
      type: String,
      default: null,
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
    rescheduleReason: {
      type: String,
      default: null,
      trim: true,
    },
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    rescheduledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

appointmentSchema.pre<Query<appointmentDocument, appointmentDocument>>(
  /^find/,
  function () {
    this.populate("user", "_id firstName lastName photo phoneNumber nationalCode")
      .populate("cancelledBy", "firstName lastName")
      .populate("rescheduledBy", "firstName lastName");
  },
);
const AppointmentModel = mongoose.model<appointmentDocument>(
  "Appointment",
  appointmentSchema,
);

export default AppointmentModel;
