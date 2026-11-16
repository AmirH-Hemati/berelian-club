import mongoose, { Query } from "mongoose";

export interface appointmentDocument extends mongoose.Document {
  investor: mongoose.Types.ObjectId;
  consultant: mongoose.Types.ObjectId | null;

  description: string;

  appointmentDate: Date;
  startAt: string;
  endAt: string;

  status: "pending" | "approved" | "cancelled" | "completed";
  type: "online" | "phone";

  meetingLink: string | null;

  cancellationReason?: string | null;
  rescheduleReason?: string | null;

  cancelledBy?: mongoose.Types.ObjectId | null;
  rescheduledBy?: mongoose.Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new mongoose.Schema<appointmentDocument>(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    consultant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },
    startAt: {
      type: String,
      required: true,
    },

    endAt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "completed"],
      default: "pending",
      required: true,
      index: true,
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
  {
    timestamps: true,
  },
);

appointmentSchema.index({
  consultant: 1,
  startAt: 1,
  endAt: 1,
  status: 1,
});

appointmentSchema.pre<Query<appointmentDocument, appointmentDocument>>(
  /^find/,
  function () {
    this.populate(
      "investor",
      "_id firstName lastName photo phoneNumber nationalCode",
    )
      .populate("consultant", "_id firstName lastName photo")
      .populate("cancelledBy", "firstName lastName photo")
      .populate("rescheduledBy", "firstName lastName photo");
  },
);

const AppointmentModel = mongoose.model<appointmentDocument>(
  "Appointment",
  appointmentSchema,
);

export default AppointmentModel;
