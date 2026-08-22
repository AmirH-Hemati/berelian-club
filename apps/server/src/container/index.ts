import { AuthService } from "../modules/auth/auth.service.js";
import { TokenService } from "../modules/token/TokenService.js";
import { OtpService } from "../modules/verification/verification.service.js";
import { SmsService } from "../services/sms/sms.service.js";

const SmsProvider = new SmsService();
const otpService = new OtpService(SmsProvider);
export const tokenService = new TokenService();

export const authService = new AuthService(otpService, tokenService);
