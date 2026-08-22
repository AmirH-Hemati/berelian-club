import type { SmsProvider } from "./sms.provider.js";

export class SmsService implements SmsProvider {
  async sendOtp(phoneNumber: string, code: string): Promise<void> {
    console.log(`Sending OTP ${code} to ${phoneNumber}`);
  }
}
