import type { Server } from "socket.io";

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
import { setupSocketGateway } from "../modules/socket/socket.gateway.js";
import { SocketService } from "../modules/socket/socket.service.js";
import { TokenService } from "../modules/token/TokenService.js";
import { UserService } from "../modules/user/user.service.js";
import { UserFileService } from "../modules/userFile/userFile.service.js";
import { OtpService } from "../modules/verification/verification.service.js";
import { SmsService } from "../services/sms/sms.service.js";

const SmsProvider = new SmsService();
const otpService = new OtpService(SmsProvider);

export const tokenService = new TokenService();
export const authService = new AuthService(otpService, tokenService);
export const userService = new UserService();

export const conversationService = new ConversationService();

export let notificationService: NotificationService;
export let socketService: SocketService;
export let messageService: MessageService;

export let appointmentService: AppointmentService;
export let requestService: RequestService;

export let fileService: FileService;
export let userFileService: UserFileService;

export let dashboardService: DashboardService;

export const followUpService = new FollowUpService();
export const sessionReportService = new SessionReportService(followUpService);

export const initializeSocketServices = (io: Server) => {
  socketService = new SocketService(io);

  notificationService = new NotificationService(socketService);

  messageService = new MessageService(conversationService, socketService);

  appointmentService = new AppointmentService(notificationService, userService);
  requestService = new RequestService(
    notificationService,
    conversationService,
    userService,
  );

  fileService = new FileService();

  userFileService = new UserFileService(fileService, notificationService);

  dashboardService = new DashboardService(
    userService,
    requestService,
    notificationService,
    appointmentService,
    followUpService,
  );

  setupSocketGateway(io, socketService);
};
