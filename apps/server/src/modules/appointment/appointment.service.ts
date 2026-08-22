import AppointmentModel from "../../models/appointment.model.js";
import { AppError } from "../../utils/AppError.js";
import { formatPersianDate } from "../../utils/date.js";
import type { NotificationService } from "../notification/notification.service.js";

export class AppointmentService {
  constructor(private readonly notificationService: NotificationService) {}

  async approveAppointment(appointmentId: string) {
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      throw new AppError("جلسه مشاوره یافت نشد", 404);
    }

    if (appointment.status !== "pending") {
      throw new AppError(
        "این جلسه قبلاً بررسی شده و امکان تایید مجدد آن وجود ندارد",
        400,
      );
    }

    appointment.status = "approved";

    await appointment.save();

    await this.notificationService.send({
      userId: appointment.user._id.toString(),
      title: "مشاوره شما تأیید شد",
      message: `درخواست مشاوره شما برای تاریخ ${formatPersianDate(
        appointment.appointmentDate,
      )} تأیید شد.`,
      type: "appointment_approved",
      link: `/appointments/${appointment._id}`,
      deduplicationKey: `appointment-approved-${appointment._id}`,
    });

    return appointment;
  }

  async rejectAppointment(
    appointmentId: string,
    reason: string | undefined,
    userId: string,
  ) {
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      throw new AppError("جلسه مشاوره یافت نشد", 404);
    }

    if (appointment.status !== "pending") {
      throw new AppError(
        "این جلسه قبلاً بررسی شده و امکان لغو آن وجود ندارد",
        400,
      );
    }

    appointment.status = "cancelled";

    appointment.cancellationReason = reason || "کنسل شده توسط ادمین";

    appointment.cancelledBy = userId;

    await appointment.save();

    await this.notificationService.send({
      userId: appointment.user._id.toString(),
      title: "مشاوره شما تأیید نشد",
      message: `متأسفانه درخواست مشاوره شما برای تاریخ ${formatPersianDate(
        appointment.appointmentDate,
      )} تأیید نشد.`,
      type: "appointment_rejected",
      link: `/appointments/${appointment._id}`,
      deduplicationKey: `appointment-rejected-${appointment._id}`,
    });

    return appointment;
  }

  async completeAppointment(appointmentId: string) {
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      throw new AppError("جلسه مشاوره‌ای یافت نشد", 404);
    }

    if (appointment.status !== "approved") {
      throw new AppError("فقط جلسات تایید شده را می‌توان تکمیل کرد", 400);
    }

    appointment.status = "completed";

    await appointment.save();

    await this.notificationService.send({
      userId: appointment.user._id.toString(),
      title: "مشاوره شما برگزار شد",
      message: `جلسه مشاوره شما در تاریخ ${formatPersianDate(
        appointment.appointmentDate,
      )} با موفقیت برگزار شد.`,
      type: "appointment_completed",
      link: `/appointments/${appointment._id}`,
      deduplicationKey: `appointment-completed-${appointment._id}`,
    });

    return appointment;
  }

  async rescheduleAppointment(
    appointmentId: string,
    newDate: string,
    reason: string | undefined,
    userId: string,
  ) {
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      throw new AppError("جلسه مشاوره یافت نشد", 404);
    }

    if (appointment.status !== "approved" && appointment.status !== "pending") {
      throw new AppError("این جلسه قابل تغییر زمان نیست", 400);
    }

    const newAppointmentDate = new Date(newDate);

    if (Number.isNaN(newAppointmentDate.getTime())) {
      throw new AppError("تاریخ جدید نامعتبر است", 400);
    }

    if (newAppointmentDate <= new Date()) {
      throw new AppError("تاریخ جدید باید در آینده باشد", 400);
    }

    appointment.appointmentDate = newAppointmentDate;

    appointment.rescheduleReason =
      reason || "زمان جلسه مشاوره توسط ادمین تغییر کرد";

    appointment.rescheduledBy = userId as string;

    await appointment.save();

    await this.notificationService.send({
      userId: appointment.user._id.toString(),
      title: "زمان مشاوره تغییر کرد",
      message: `زمان جلسه مشاوره شما به ${formatPersianDate(
        appointment.appointmentDate,
      )} تغییر یافت.${reason ? ` دلیل: ${reason}` : ""}`,
      type: "appointment_rescheduled",
      link: `/appointments/${appointment._id}`,
      deduplicationKey: `appointment-rescheduled-${appointment._id}-${newAppointmentDate.getTime()}`,
    });

    return appointment;
  }

  async getUserAppointments(userId: string) {
    const appointments = await AppointmentModel.find({
      user: userId,
    }).limit(10);

    return appointments;
  }

  async getTodayAppointments() {
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();

    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await AppointmentModel.find({
      status: "approved",
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate("user", "firstName lastName phoneNumber email")
      .sort({
        appointmentDate: 1,
      });

    return appointments;
  }

  async countPendingAppointments() {
    return AppointmentModel.countDocuments({
      status: "pending",
    });
  }
  async countTodayApprovedAppointments() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    return AppointmentModel.countDocuments({
      status: "approved",
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
  }
}
