import UserModel from "../../models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import type { TokenService } from "../token/TokenService.js";
import type { OtpService } from "../verification/verification.service.js";

export class AuthService {
  constructor(
    private readonly otpService: OtpService,
    private readonly tokenService: TokenService,
  ) {}

  async sendOtp(phoneNumber: string) {
    const user = await UserModel.findOne({ phoneNumber });

    if (!user) {
      throw new AppError("حساب کاربری متناسب با شماره موبایل موجود نیست", 404);
    }

    await this.otpService.checkActiveOtp(phoneNumber);

    const otpCode = await this.otpService.createOtp(phoneNumber);

    return otpCode;
  }

  async verifyOtp(phoneNumber: string, otp: string) {
    const user = await UserModel.findOne({ phoneNumber });
    if (!user) {
      throw new AppError("حساب کاربری متناسب با شماره موبایل موجود نیست", 404);
    }

    await this.otpService.verifyOtp(phoneNumber, otp);
    const token = this.tokenService.generateToken(user._id.toString());

    return { user, token };
  }

  async updateMe(userId: string, filtersBody: Record<string, string>) {
    const user = await UserModel.findByIdAndUpdate(userId, filtersBody, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      throw new AppError("کاربری یافت نشد", 404);
    }

    return user;
  }
}
