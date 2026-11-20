import type { createAppointmentTypes } from "@repo/schema";
import mongoose from "mongoose";

import AppointmentModel from "../../models/appointment.model.js";
import { UserService } from "../user/user.service.js";
import { NotificationService } from "../notification/notification.service.js";
import { formatPersianDate } from "../../utils/date.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import type { UserDocument } from "../../models/user.model.js";
import { AppError } from "../../utils/AppError.js";

const APPOINTMENT_DURATION = 60;

const BUSINESS_TIMEZONE = "Asia/Tehran";

export class AppointmentService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  private getAppointmentDateTime(appointmentDate: Date, startAt: string) {
    const [hour, minute] = startAt.split(":").map(Number);

    const date = new Date(appointmentDate);

    date.setHours(hour as number, minute, 0, 0);

    return date;
  }

  private calculateEndAt(startAt: string) {
    const [hour, minute] = startAt.split(":").map(Number);

    const endHour = (hour as number) + 1;

    return `${String(endHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  private validateBusinessHours(startAt: string) {
    const [hour, minute] = startAt.split(":").map(Number);

    if (hour < 9 || hour > 15 || minute !== 0) {
      throw new Error("ساعت انتخاب شده خارج از ساعات کاری است");
    }
  }

  async createAppointment(userId: string, data: createAppointmentTypes) {
    const { appointmentDate, startAt, type, description } = data;

    this.validateBusinessHours(startAt);

    const appointmentDateTime = this.getAppointmentDateTime(
      appointmentDate,
      startAt,
    );

    if (appointmentDateTime <= new Date()) {
      throw new Error("زمان مشاوره باید در آینده باشد");
    }

    const endAt = this.calculateEndAt(startAt);

    const appointment = await AppointmentModel.create({
      investor: userId,
      consultant: null,
      appointmentDate,
      startAt,
      endAt,
      description,
      type,
      status: "pending",
    });

    const consultants = await this.userService.getUsersByRole("consultant");
    const consultantIds = consultants.map((user) => user._id);

    const notifications = consultantIds.map((consultant) => ({
      userId: consultant._id.toString(),
      title: "درخواست مشاوره جدید",
      message: "یک درخواست مشاوره جدید ثبت شده است. برای بررسی وارد پنل شوید.",
      type: "appointment_new" as const,
      link: `/appointments/${appointment._id}`,
      deduplicationKey: `appointment-new-${appointment._id}-${consultant._id}`,
    }));

    await this.notificationService.sendMany(notifications);

    return appointment;
  }

  async approveAppointment(
    appointmentId: string,
    consultantId: mongoose.Types.ObjectId,
  ) {
    const appointment = await AppointmentModel.findOneAndUpdate(
      {
        _id: appointmentId,
        status: "pending",
        consultant: null,
      },
      {
        $set: {
          consultant: consultantId,
          status: "approved",
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!appointment) {
      const existingAppointment =
        await AppointmentModel.findById(appointmentId);

      if (!existingAppointment) {
        throw new AppError("نوبت مشاوره پیدا نشد", 404);
      }

      throw new AppError(
        "این نوبت قبلاً توسط مشاور دیگری بررسی شده یا در وضعیت قابل تأیید نیست",
        400,
      );
    }

    await this.notificationService.send({
      userId: appointment.investor._id.toString(),
      title: "تأیید نوبت مشاوره",
      message: `نوبت مشاوره شما در تاریخ ${formatPersianDate(appointment.appointmentDate)} تأیید شد.`,
      type: "appointment_approved",
      link: `/appointments/${appointment._id}`,
    });

    return appointment;
  }

  async rejectAppointment(
    appointmentId: string,
    reason: string,
    userId: string,
  ) {
    const appointment = await AppointmentModel.findOneAndUpdate(
      {
        _id: appointmentId,
        status: "pending",
      },
      {
        $set: {
          status: "cancelled",
          cancellationReason: reason,
          cancelledBy: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!appointment) {
      const existingAppointment =
        await AppointmentModel.findById(appointmentId);

      if (!existingAppointment) {
        throw new AppError("نوبت مشاوره پیدا نشد", 404);
      }

      throw new AppError("این نوبت در وضعیت قابل رد نیست", 400);
    }

    await this.notificationService.send({
      userId: appointment.investor._id.toString(),
      title: "رد درخواست مشاوره",
      message: `درخواست مشاوره شما در تاریخ ${formatPersianDate(appointment.appointmentDate)} رد شد. دلیل: ${reason}`,
      type: "appointment_rejected",
      link: `/appointments/${appointment._id}`,
    });

    return appointment;
  }

  async completeAppointment(appointmentId: string) {
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      throw new Error("نوبت مشاوره پیدا نشد");
    }

    if (appointment.status !== "approved") {
      throw new Error("فقط نوبت‌های تأیید شده قابل تکمیل هستند");
    }

    appointment.status = "completed";

    await appointment.save();

    await this.notificationService.send({
      userId: appointment.investor._id.toString(),
      title: "تکمیل مشاوره",
      message: `مشاوره شما در تاریخ ${formatPersianDate(appointment.appointmentDate)} تکمیل شد.`,
      type: "appointment_completed",
      link: `/appointments/${appointment._id}`,
    });

    return appointment;
  }

  async rescheduleAppointment(
    appointmentId: string,
    appointmentDate: Date,
    startAt: string,
    reason: string,
    userId: string,
  ) {
    this.validateBusinessHours(startAt);

    const newDateTime = this.getAppointmentDateTime(appointmentDate, startAt);

    if (newDateTime <= new Date()) {
      throw new AppError("زمان جدید باید در آینده باشد", 400);
    }

    const appointment = await AppointmentModel.findOneAndUpdate(
      {
        _id: appointmentId,
        status: { $in: ["pending", "approved"] },
      },
      {
        $set: {
          appointmentDate,
          startAt,
          endAt: this.calculateEndAt(startAt),
          rescheduleReason: reason,
          rescheduledBy: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!appointment) {
      const existingAppointment =
        await AppointmentModel.findById(appointmentId);

      if (!existingAppointment) {
        throw new AppError("نوبت مشاوره پیدا نشد", 404);
      }

      throw new AppError("امکان تغییر زمان این نوبت وجود ندارد", 400);
    }

    await this.notificationService.send({
      userId: appointment.investor._id.toString(),
      title: "تغییر زمان مشاوره",
      message: `زمان مشاوره شما به ${formatPersianDate(appointment.appointmentDate)} ساعت ${startAt} تغییر کرد.`,
      type: "appointment_rescheduled",
      link: `/appointments/${appointment._id}`,
    });

    return appointment;
  }

  async getUserAppointments(userId: string, query: Record<string, any>) {
    const features = new ApiFeatures(
      AppointmentModel.find({ investor: userId }),
      query,
    )
      .filter()
      .search()
      .sort()
      .fields();

    const { total, limit, page, totalPages } = await features.pagination();

    const appointments = await features.query;

    return {
      appointments,
      pagination: {
        total,
        limit,
        page,
        totalPages,
      },
    };
  }

  async getTodayAppointments() {
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    return AppointmentModel.find({
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ startAt: 1 });
  }

  async investorCountApprovedAppointments(investorId: string) {
    return AppointmentModel.countDocuments({
      status: "approved",
      investor: investorId,
    });
  }
  async countPendingAppointments() {
    return AppointmentModel.countDocuments({
      status: "pending",
      consultant: null,
    });
  }
  async countTodayApprovedAppointments(
    consultantId: string,
    startDate: Date,
    endDate: Date,
  ) {
    return AppointmentModel.countDocuments({
      consultant: consultantId,
      status: "approved",
      appointmentDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });
  }
  async countMonthlyCompletedAppointments(
    consultantId: string,
    startDate: Date,
    endDate: Date,
  ) {
    return AppointmentModel.countDocuments({
      consultant: consultantId,
      status: "completed",
      appointmentDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });
  }

  async getPendingAppointments(query: Record<string, unknown>) {
    const features = new ApiFeatures(
      AppointmentModel.find({
        status: "pending",
        consultant: null,
      }),
      query,
    )
      .filter()
      .sort()
      .fields();

    const { total, limit, page, totalPages } = await features.pagination();

    const appointments = await features.query;

    return {
      appointments,
      pagination: {
        total,
        limit,
        page,
        totalPages,
      },
    };
  }
  async getConsultantAppointments(
    consultantId: string,
    startDate: Date,
    endDate: Date,
    query: Record<string, unknown>,
  ) {
    const features = new ApiFeatures(
      AppointmentModel.find({
        consultant: consultantId,
        appointmentDate: {
          $gte: startDate,
          $lt: endDate,
        },
      }),
      query,
    )
      .filter()
      .sort()
      .fields();

    const { total, limit, page, totalPages } = await features.pagination();

    const appointments = await features.query;

    return {
      appointments,
      pagination: {
        total,
        limit,
        page,
        totalPages,
      },
    };
  }
  async getConsultantPerformance(
    consultants: UserDocument[],
    startDate: Date,
    endDate: Date,
    todayStart: Date,
    tomorrowStart: Date,
  ) {
    const consultantIds = consultants.map((user) => user._id);

    const performance = await AppointmentModel.aggregate([
      {
        $match: {
          consultant: { $in: consultantIds },
        },
      },
      {
        $group: {
          _id: "$consultant",

          monthlyAppointments: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ["$appointmentDate", startDate] },
                    { $lt: ["$appointmentDate", endDate] },
                    {
                      $in: ["$status", ["approved", "completed"]],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },

          monthlyCompleted: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "completed"] },
                    { $gte: ["$appointmentDate", startDate] },
                    { $lt: ["$appointmentDate", endDate] },
                  ],
                },
                1,
                0,
              ],
            },
          },

          monthlyApproved: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "approved"] },
                    { $gte: ["$appointmentDate", startDate] },
                    { $lt: ["$appointmentDate", endDate] },
                  ],
                },
                1,
                0,
              ],
            },
          },

          todayAppointments: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "approved"] },
                    { $gte: ["$appointmentDate", todayStart] },
                    { $lt: ["$appointmentDate", tomorrowStart] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const performanceMap = new Map(
      performance.map((item) => [item._id.toString(), item]),
    );

    return consultants.map((consultant) => {
      const stats = performanceMap.get(consultant._id.toString());

      return {
        user: consultant,
        stats: {
          monthlyAppointments: stats?.monthlyAppointments ?? 0,
          monthlyCompleted: stats?.monthlyCompleted ?? 0,
          monthlyApproved: stats?.monthlyApproved ?? 0,
          todayAppointments: stats?.todayAppointments ?? 0,
        },
      };
    });
  }

  async getYearlyAppointmentStats(boundaries: Date[]) {
    const result = await AppointmentModel.aggregate<{
      _id: Date;
      count: number;
    }>([
      {
        $match: {
          appointmentDate: {
            $gte: boundaries[0],
            $lt: boundaries[12],
          },
        },
      },
      {
        $bucket: {
          groupBy: "$appointmentDate",
          boundaries,
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    return result.map((item) => ({
      month:
        boundaries.findIndex(
          (boundary) => boundary.getTime() === new Date(item._id).getTime(),
        ) + 1,
      count: item.count,
    }));
  }
}
