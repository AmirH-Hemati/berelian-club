import { AppointmentService } from "../modules/appointment/appointment.service.js";
import { AuthService } from "../modules/auth/auth.service.js";
import { ConversationService } from "../modules/conversation/conversation.service.js";
import { FileService } from "../modules/file/file.service.js";
import { MessageService } from "../modules/message/message.service.js";
import { NotificationService } from "../modules/notification/notification.service.js";
import { RequestService } from "../modules/request/request.service.js";
import { TokenService } from "../modules/token/TokenService.js";
import { OtpService } from "../modules/verification/verification.service.js";
import { SmsService } from "../services/sms/sms.service.js";

const SmsProvider = new SmsService();
const otpService = new OtpService(SmsProvider);

export const tokenService = new TokenService();
export const authService = new AuthService(otpService, tokenService);

export const notificationService = new NotificationService();
export const appointmentService = new AppointmentService(notificationService);
export const conversationService = new ConversationService();
export const fileService = new FileService();

export const messageService = new MessageService(conversationService);
export const requestService = new RequestService(
  notificationService,
  conversationService,
);
