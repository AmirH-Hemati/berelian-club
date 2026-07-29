import type { CreateUserInputTypes } from "@repo/schema";
import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document, CreateUserInputTypes {
  role: "admin" | "investor";
  isActive: boolean;
  contractDaysRemaining: number;
  contractStatus: string;
  contractProgress: number;
  photo: String;
  birthMonth: number;
  birthDay: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    nationalCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    photo: String,
    birthDate: {
      type: Date,
      required: true,
    },
    birthMonth: {
      type: Number,
      index: true,
    },

    birthDay: {
      type: Number,
      index: true,
    },
    role: {
      type: String,
      enum: ["admin", "investor"],
      default: "investor",
      required: true,
    },
    contractStartDate: {
      type: Date,
      required: true,
    },
    contractEndDate: {
      type: Date,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    // bankName: {
    //   type: String,
    //   enum: ["melli", "melat", "saderat", "sepah", "tejarat", "other"],
    //   required: true,
    // },
    shabaNumber: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual("contractDaysRemaining").get(function () {
  const today = new Date();
  const end = new Date(this.contractEndDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

userSchema.virtual("contractStatus").get(function () {
  const today = new Date();
  const end = new Date(this.contractEndDate);

  if (today > end) return "expired";
  return "active";
});

userSchema.virtual("contractProgress").get(function () {
  const start = new Date(this.contractStartDate);
  const end = new Date(this.contractEndDate);
  const now = new Date();

  if (now < start) return 0;
  if (now > end) return 100;

  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();

  return Math.round((elapsed / total) * 100);
});

userSchema.pre("save", function (next) {
  if (this.isModified("birthDate")) {
    this.birthMonth = this.birthDate.getMonth() + 1;
    this.birthDay = this.birthDate.getDate();
  }
});
userSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate() as any;

  if (update.birthDate) {
    const birthDate = new Date(update.birthDate);

    update.birthMonth = birthDate.getMonth() + 1;
    update.birthDay = birthDate.getDate();
  }
});
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
