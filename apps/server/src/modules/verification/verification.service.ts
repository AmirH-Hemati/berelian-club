import VerificationModel from "../../models/verification.model.js";
import type { SmsProvider } from "../../services/sms/sms.provider.js";
import { AppError } from "../../utils/AppError.js";

export class OtpService {
  constructor(private readonly smsProvider: SmsProvider) {}
  async checkActiveOtp(phoneNumber: string) {
    const existingVerification = await VerificationModel.findOne({
      phoneNumber,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!existingVerification) return;

    throw new AppError(
      `کد تایید قبلی هنوز معتبر است. 2 دقیقه دیگر می‌توانید درخواست مجدد دهید.`,
      429,
    );
  }
  async createOtp(phoneNumber: string) {
    const verification = await VerificationModel.create({ phoneNumber });

    const verificationCode = verification.generateVerificationCode();
    await verification.save();

    await this.smsProvider.sendOtp(phoneNumber, verificationCode);

    return verificationCode;
  }

  async verifyOtp(phoneNumber: string, otp: string) {
    const verification = await VerificationModel.findOne({
      phoneNumber,
      code: otp,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!verification) {
      throw new AppError("کد تایید نامعتبر یا منقضی شده است", 400);
    }
    verification.isUsed = true;
    await verification.save();
  }
}
