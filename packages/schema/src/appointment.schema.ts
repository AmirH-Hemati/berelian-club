import { z } from "zod";
import { UserType } from "./user.schema.js";

export const createAppointmentSchema = z
  .object({
    appointmentDate: z.date("تاریخ مشاوره الزامی است"),

    startAt: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "ساعت شروع مشاوره معتبر نیست")
      .min(1, "ساعت مشاوره را انتخاب کنید"),

    type: z.enum(["online", "phone"], {
      message: "نوع مشاوره الزامی است",
    }),

    description: z.string().trim().min(5, "توضیحات باید حداقل ۵ کاراکتر باشد"),
  })
  .refine(
    (data) => {
      const today = new Date();

      const appointmentDate = new Date(data.appointmentDate);
      appointmentDate.setHours(0, 0, 0, 0);

      today.setHours(0, 0, 0, 0);

      return appointmentDate >= today;
    },
    {
      message: "تاریخ مشاوره نمی‌تواند در گذشته باشد",
      path: ["appointmentDate"],
    },
  )
  .refine(
    (data) => {
      const [hour, minute] = data.startAt.split(":").map(Number);

      return hour && hour >= 9 && hour < 16 && minute === 0;
    },
    {
      message: "ساعت شروع مشاوره باید بین ۹ تا ۱۵ باشد",
      path: ["startAt"],
    },
  )
  .refine(
    (data) => {
      const now = new Date();
      const appointment = new Date(data.appointmentDate);

      const [hour, minute] = data.startAt.split(":").map(Number);

      appointment.setHours(hour as number, minute, 0, 0);

      return appointment > now;
    },
    {
      message: "زمان مشاوره باید در آینده باشد",
      path: ["startAt"],
    },
  );

export type createAppointmentTypes = z.infer<typeof createAppointmentSchema>;
export interface AppointmentType extends createAppointmentTypes {
  _id: string;
  investor: UserType;
  consultant: {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
  } | null;
  appointmentDate: Date;
  startAt: string;
  endAt: string;
  type: "phone" | "online";
  status: "pending" | "approved" | "completed" | "cancelled";
  meetingLink?: string;
  cancellationReason?: string;
  rescheduleReason?: string;
  cancelledBy?: { firstName: string; lastName: string };
  rescheduledBy?: { firstName: string; lastName: string };
  createdAt: Date;
  updatedAt: Date;
}
