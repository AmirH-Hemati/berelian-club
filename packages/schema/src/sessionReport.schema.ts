import { z } from "zod";
export const sessionReportSchema = z
  .object({
    appointment: z.string().min(1, "شناسه جلسه الزامی است"),
    userId: z.string().min(1, "شناسه کاربر الزامی است"),
    summary: z.string().min(3, "خلاصه جلسه حداقل ۳ کاراکتر است"),
    resultDescription: z
      .string()
      .nonempty(" نتیجه جلسه الزامی است")
      .min(3, " نتیجه جلسه حداقل ۳ کاراکتر است"),
    notes: z
      .string()
      .nonempty("توضیحات کامل جلسه الزامی است")
      .min(3, "توضیحات کامل جلسه حداقل ۳ کاراکتر است"),
    needFollowUp: z.boolean(),
    followUpDate: z.date().optional(),
    followUpAction: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.needFollowUp) return;

    if (!data.followUpDate) {
      ctx.addIssue({
        path: ["followUpDate"],
        message: "تاریخ پیگیری الزامی است",
        code: "custom",
      });
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const followUpDate = new Date(data.followUpDate);
      followUpDate.setHours(0, 0, 0, 0);

      if (followUpDate < today) {
        ctx.addIssue({
          path: ["followUpDate"],
          message: "تاریخ پیگیری نمی‌تواند در گذشته باشد",
          code: "custom",
        });
      }
    }

    if (!data.followUpAction?.trim()) {
      ctx.addIssue({
        path: ["followUpAction"],
        message: "اقدام بعدی الزامی است",
        code: "custom",
      });
    }
  });

export type SessionReportFormValues = z.infer<typeof sessionReportSchema>;

export interface SessionReportType extends SessionReportFormValues {
  _id: string;
  appointment: string;
  userId: string;
  followUpDate?: Date;
  followUpAction?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface FollowUpType {
  _id: string;
  sessionReport: {
    _id: string;
    appointment: string;
    consultant: {
      _id: string;
      firstName: string;
      lastName: string;
    } | null;
    summary: string;
  } | null;
  dueDate: string;
  note: string;
  status: "pending" | "completed" | "cancelled";
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
