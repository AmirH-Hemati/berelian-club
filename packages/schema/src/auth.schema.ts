import { z } from "zod";

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .nonempty("شماره موبایل الزامی است")
    .regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .nonempty("کد تایید الزامی است")
    .length(6, "کد تایید باید ۶ رقم باشد"),
});
export const updateMeSchema = z
  .object({
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
    birthDate: z.date({ error: "تاریخ تولد الزامی می باشد" }),
    photo: z.file(),
  })
  .partial();
export const verifyOtpSchema = phoneSchema.and(otpSchema);

export type phoneSchemaTypes = z.infer<typeof phoneSchema>;
export type otpSchemaTypes = z.infer<typeof otpSchema>;
export type verifyOtpTypes = z.infer<typeof verifyOtpSchema>;
export type updateMeTypes = z.infer<typeof updateMeSchema>;
