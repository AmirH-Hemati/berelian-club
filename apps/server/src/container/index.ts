import { AppointmentService } from "../modules/appointment/appointment.service.js";
import { AuthService } from "../modules/auth/auth.service.js";
import { ConversationService } from "../modules/conversation/conversation.service.js";
import { DashboardService } from "../modules/dashboard/dashboard.service.js";
import { FileService } from "../modules/file/file.service.js";
import { FollowUpService } from "../modules/follow-up/follow-up.service.js";
import { MessageService } from "../modules/message/message.service.js";
import { NotificationService } from "../modules/notification/notification.service.js";
import { RequestService } from "../modules/request/request.service.js";
import { SessionReportService } from "../modules/session-report/session-report.service.js";
import { TokenService } from "../modules/token/TokenService.js";
import { UserService } from "../modules/user/user.service.js";
import { UserFileService } from "../modules/userFile/userFile.service.js";
import { OtpService } from "../modules/verification/verification.service.js";
import { SmsService } from "../services/sms/sms.service.js";

const SmsProvider = new SmsService();
const otpService = new OtpService(SmsProvider);

export const tokenService = new TokenService();
export const authService = new AuthService(otpService, tokenService);
const userService = new UserService();

export const notificationService = new NotificationService();
export const appointmentService = new AppointmentService(notificationService);
export const conversationService = new ConversationService();

export const messageService = new MessageService(conversationService);
export const requestService = new RequestService(
  notificationService,
  conversationService,
);

export const fileService = new FileService();
export const userFileService = new UserFileService(
  fileService,
  notificationService,
);
export const followUpService = new FollowUpService();
export const sessionReportService = new SessionReportService(followUpService);

export const dashboardService = new DashboardService(
  userService,
  requestService,
  notificationService,
  appointmentService,
  followUpService,
);
