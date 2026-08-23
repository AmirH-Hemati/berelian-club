import { z } from "zod";
import { UserType } from "./user.schema.js";

export const createAppointmentSchema = z
  .object({
    appointmentDate: z.date("تاریخ مشاوره الزامی است"),
    type: z.enum(["online", "phone"]).nonoptional("نوع مشاوره الزامی است"),
    description: z
      .string()
      .nonempty("توضیحات الزامی است")
      .min(5, "توضیحات  باید بیشتر از 5 کارکتر باشد"),
  })
  .refine((data) => data.appointmentDate >= new Date(), {
    message: "تاریخ مشاوره باید در روزهای آینده باشد",
    path: ["appointmentDate"],
  });

export type createAppointmentTypes = z.infer<typeof createAppointmentSchema>;

export interface AppointmentType extends createAppointmentTypes {
  _id: string;
  user: Pick<
    UserType,
    "_id" | "firstName" | "lastName" | "phoneNumber" | "nationalCode" | "photo"
  >;
  status: "pending" | "approved" | "completed" | "cancelled";
  type: "online" | "phone";
  meetingLink?: string;
  cancellationReason?: string;
  rescheduleReason?: string;
  cancelledBy?: { firstName: string; lastName: string };
  rescheduledBy?: { firstName: string; lastName: string };
  createdAt: Date;
  updatedAt: Date;
}
