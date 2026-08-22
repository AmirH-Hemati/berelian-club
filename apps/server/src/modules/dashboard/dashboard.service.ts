import type { UserService } from "../user/user.service.js";
import type { RequestService } from "../request/request.service.js";
import type { NotificationService } from "../notification/notification.service.js";
import type { AppointmentService } from "../appointment/appointment.service.js";
import type { FollowUpService } from "../follow-up/follow-up.service.js";

export class DashboardService {
  constructor(
    private readonly userService: UserService,
    private readonly requestService: RequestService,
    private readonly notificationService: NotificationService,
    private readonly appointmentService: AppointmentService,
    private readonly followUpService: FollowUpService,
  ) {}

  async getUserStats(userId: string) {
    const [activeContractDays, pendingRequests, unreadNotifications] =
      await Promise.all([
        this.userService.getContractDaysRemaining(userId),

        this.requestService.countPendingRequests(userId),

        this.notificationService.countUnread(userId),
      ]);

    return {
      activeContractDays,
      pendingRequests,
      unreadNotifications,

      xp: 100,
    };
  }

  async getAdminDashboardStats() {
    const [
      pendingRequests,
      pendingAppointment,
      followUpsToday,
      appointmentsToday,
    ] = await Promise.all([
      this.requestService.countPendingRequests(),

      this.appointmentService.countPendingAppointments(),

      this.followUpService.countTodayPendingFollowUps(),

      this.appointmentService.countTodayApprovedAppointments(),
    ]);

    return {
      pendingRequests,
      pendingAppointment,
      followUpsToday,
      appointmentsToday,
    };
  }
}
