import mongoose from "mongoose";

export type UserRole = "admin" | "investor" | "reception" | "consultant";

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  email: string;
  photo?: string;
  birthDate: Date;
  birthMonth: number;
  birthDay: number;
  role: UserRole;
  permissions: mongoose.Types.ObjectId[] | [];
  isActive: boolean;
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
      enum: ["admin", "investor", "reception", "consultant"],
      default: "investor",
      required: true,
    },
    permissions: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Permission",
        },
      ],
      default: [],
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

userSchema.pre("save", function (this: UserDocument) {
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

userSchema.virtual("contract", {
  ref: "Contract",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

// userSchema.index({ phoneNumber: 1 }, { unique: true });
// userSchema.index({ nationalCode: 1 }, { unique: true });
// userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
