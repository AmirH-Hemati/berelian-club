import { z } from "zod";
export const createUserSchema = z.object({
  firstName: z
    .string()
    .nonempty("نام کاربر نمیتواند خالی باشد")
    .min(3, "نام حداقل 3 کاراکتر است"),
  lastName: z
    .string()
    .nonempty("نام خانوادگی کاربر نمیتواند خالی باشد")
    .min(3, "نام خانوادگی حداقل 3 کاراکتر است"),
  phoneNumber: z
    .string()
    .nonempty(" شماره موبایل کاربر نمیتواند خالی باشد")
    .regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),
  nationalCode: z
    .string()
    .nonempty("کد ملی کاربر نمیتواند خالی باشد")
    .length(10, "کد ملی باید ۱۰ رقم باشد"),
  email: z.email("ایمیل معتبر نیست").nonempty("ایمیل نمی‌تواند خالی باشد"),
  birthDate: z.date("تاریخ تولد نمیتواند خالی باشد"),
  contractStartDate: z.date("تاریخ شروع قرارداد الزامی است"),
  contractEndDate: z.date("تاریخ پایان قرارداد الزامی است"),
  bankAccountNumber: z
    .string()
    .nonempty("شماره حساب کاربر نمیتواند خالی باشد")
    .min(16, "شماره حساب معتبر نیست"),
  shabaNumber: z
    .string()
    .nonempty("شماره شبا کاربر نمیتواند خالی باشد")
    .regex(/^IR[0-9]{24}$/, "شماره شبا باید با IR شروع شود و ۲۶ رقم باشد"),
  role: z
    .enum(["admin", "investor"])
    .nonoptional("نقش کاربر نمیتواند خالی باشد")
});

export const updateUserSchema = createUserSchema.partial();
export type CreateUserInputTypes = z.infer<typeof createUserSchema>;
export type updateUserInputTypes = z.infer<typeof updateUserSchema>;

export interface UserType extends CreateUserInputTypes {
  _id: string;
  role: "admin" | "investor";
  isActive: boolean;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  contractProgress?: number;
  contractDaysRemaining?: number;
  contractStatus?: "active" | "expired";
}
