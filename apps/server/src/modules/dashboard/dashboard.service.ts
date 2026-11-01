import { DateTime } from "luxon";

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

  // async getUserStats(userId: string) {
  //   const [activeContractDays, pendingRequests, unreadNotifications] =
  //     await Promise.all([
  //       this.userService.getContractDaysRemaining(userId),
  //       this.requestService.countPendingRequests(userId),
  //       this.notificationService.countUnread(userId),
  //     ]);

  //   return {
  //     activeContractDays,
  //     pendingRequests,
  //     unreadNotifications,
  //     xp: 100,
  //   };
  // }

  async getAdminDashboard(userId: string) {
    const now = DateTime.now().setZone("Asia/Tehran");

    const startOfDay = now.startOf("day").toUTC().toJSDate();

    const tomorrowStart = now
      .plus({ days: 1 })
      .startOf("day")
      .toUTC()
      .toJSDate();

    const startOfMonth = now.startOf("month").toUTC().toJSDate();

    const endOfMonth = now
      .plus({ months: 1 })
      .startOf("month")
      .toUTC()
      .toJSDate();

    const [
      investorsCount,
      pendingRequestsCount,
      pendingAppointmentsCount,
      receptions,
      consultants,
    ] = await Promise.all([
      this.userService.countUsersByRole("investor"),
      this.requestService.countNewRequests(),
      this.appointmentService.countPendingAppointments(),
      this.userService.getUsersByRole("reception"),
      this.userService.getUsersByRole("consultant"),
    ]);

    const [receptionPerformance, consultantPerformance] = await Promise.all([
      this.requestService.getReceptionPerformance(
        receptions,
        startOfMonth,
        endOfMonth,
      ),
      this.appointmentService.getConsultantPerformance(
        consultants,
        startOfMonth,
        endOfMonth,
        startOfDay,
        tomorrowStart,
      ),
    ]);

    const unreadNotificationsCount =
      await this.notificationService.countUnread(userId);

    return {
      stats: {
        investors: investorsCount,
        pendingRequests: pendingRequestsCount,
        pendingAppointments: pendingAppointmentsCount,
        unreadNotifications: unreadNotificationsCount,
      },

      receptionPerformance: receptionPerformance.sort(
        (a, b) => b.stats.monthlyCompleted - a.stats.monthlyCompleted,
      ),

      consultantPerformance: consultantPerformance.sort(
        (a, b) => b.stats.monthlyCompleted - a.stats.monthlyCompleted,
      ),
    };
  }

  async getReceptionDashboard(userId: string) {
    const defaultQuery = {
      limit: 5,
      page: 1,
    };

    const now = DateTime.now().setZone("Asia/Tehran");

    const startDate = now.startOf("month").toUTC().toJSDate();

    const endDate = now.plus({ months: 1 }).startOf("month").toUTC().toJSDate();

    const [
      newRequestsCount,
      myRequestsCount,
      unreadNotificationsCount,
      monthlyCompletedRequests,
      newRequests,
      myRequests,
      notifications,
    ] = await Promise.all([
      this.requestService.countNewRequests(),

      this.requestService.countAssignedRequests(userId),

      this.notificationService.countUnread(userId),

      this.requestService.countMonthlyCompletedRequests(
        userId,
        startDate,
        endDate,
      ),

      this.requestService.getUnassignedPendingRequests(defaultQuery),

      this.requestService.getRequestsAssignedToUser(userId, defaultQuery),

      this.notificationService.getUserNotifications(userId, defaultQuery),
    ]);

    return {
      stats: {
        newRequests: newRequestsCount,
        myRequests: myRequestsCount,
        unreadNotifications: unreadNotificationsCount,
        monthlyCompletedRequests,
      },

      newRequests,

      myRequests,

      notifications,
    };
  }

  async getConsultantDashboard(userId: string) {
    const defaultQuery = {
      limit: 5,
      page: 1,
    };

    const now = DateTime.now().setZone("Asia/Tehran");

    const startOfDay = now.startOf("day").toUTC().toJSDate();
    const endOfDay = now.plus({ days: 1 }).startOf("day").toUTC().toJSDate();

    const startOfMonth = now.startOf("month").toUTC().toJSDate();
    const endOfMonth = now
      .plus({ months: 1 })
      .startOf("month")
      .toUTC()
      .toJSDate();

    const [
      pendingAppointmentsCount,
      todayAppointmentsCount,
      monthlyCompletedAppointments,
      unreadNotificationsCount,
      pendingAppointments,
      todayAppointments,
      todayFollowUps,
      notifications,
    ] = await Promise.all([
      this.appointmentService.countPendingAppointments(),

      this.appointmentService.countTodayApprovedAppointments(
        userId,
        startOfDay,
        endOfDay,
      ),

      this.appointmentService.countMonthlyCompletedAppointments(
        userId,
        startOfMonth,
        endOfMonth,
      ),

      this.notificationService.countUnread(userId),

      this.appointmentService.getPendingAppointments(defaultQuery),

      this.appointmentService.getConsultantAppointments(
        userId,
        startOfDay,
        endOfDay,
        defaultQuery,
      ),

      this.followUpService.getTodayFollowUps(
        userId,
        startOfDay,
        endOfDay,
        defaultQuery,
      ),

      this.notificationService.getUserNotifications(userId, defaultQuery),
    ]);

    return {
      stats: {
        pendingAppointments: pendingAppointmentsCount,
        todayAppointments: todayAppointmentsCount,
        monthlyCompletedAppointments,
        unreadNotifications: unreadNotificationsCount,
      },

      pendingAppointments,
      todayAppointments,
      todayFollowUps,
      notifications,
    };
  }
}
