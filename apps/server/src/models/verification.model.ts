import mongoose from "mongoose";
import crypto from "crypto";
export interface VerificationDocument extends mongoose.Document {
  phoneNumber: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  isUsed: boolean;
  generateVerificationCode: () => string;
}

const verificationSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    index: true,
  },
  code: String,
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 2 * 60 * 1000),
    index: { expires: 0 },
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

verificationSchema.index({ user: 1, code: 1, isUsed: 1 });

verificationSchema.methods.generateVerificationCode = function () {
  const code = crypto.randomInt(100123, 999879).toString();
  this.code = code;
  return code;
};

const verificationModel = mongoose.model<VerificationDocument>(
  "Verification",
  verificationSchema,
);
export default verificationModel;
