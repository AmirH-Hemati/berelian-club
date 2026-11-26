import mongoose from "mongoose";

export interface PermissionDocument extends mongoose.Document {
  key: string;
  name: string;
  group: string;
  isActive: boolean;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const permissionSchema = new mongoose.Schema<PermissionDocument>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      immutable: true,
      lowercase: true,
      match: /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$/,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    group: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

permissionSchema.index({ group: 1, isActive: 1 });

export const PermissionModel = mongoose.model<PermissionDocument>(
  "Permission",
  permissionSchema,
);
