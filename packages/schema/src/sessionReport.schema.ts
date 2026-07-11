import { z } from "zod";
export const sessionReportSchema = z
  .object({
    summary: z.string().min(3, "خلاصه جلسه حداقل ۳ کاراکتر است"),
    result: z.enum(["completed", "pending", "cancelled", "failed"], {
      error: "نتیجه جلسه الزامی است",
    }),
    resultDescription: z
      .string()
      .nonempty("توضیحات نتیجه جلسه الزامی است")
      .min(3, "توضیحات نتیجه جلسه حداقل ۳ کاراکتر است"),
    notes: z
      .string()
      .nonempty("یادداشت های  جلسه الزامی است")
      .min(3, "یادداشت جلسه حداقل ۳ کاراکتر است"),
    needFollowUp: z.boolean().default(false),
    followUpDate: z.coerce.date().optional(),
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
  user: string;
  followUpDate?: Date;
  followUpAction?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface FollowUpType {
  sessionReport: Pick<SessionReportType, "summary" | "result">;
  dueDate: Date;
  note: string;
  status: "pending" | "completed" | "cancelled";
  isCompleted: boolean;
}
