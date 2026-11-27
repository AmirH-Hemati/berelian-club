import { z } from "zod";

export const createUserSchema = z
  .object({
    // Identity
    firstName: z
      .string()
      .nonempty("نام کاربر نمی‌تواند خالی باشد")
      .min(3, "نام حداقل 3 کاراکتر است"),

    lastName: z
      .string()
      .nonempty("نام خانوادگی کاربر نمی‌تواند خالی باشد")
      .min(3, "نام خانوادگی حداقل 3 کاراکتر است"),

    phoneNumber: z
      .string()
      .nonempty("شماره موبایل کاربر نمی‌تواند خالی باشد")
      .regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),

    nationalCode: z
      .string()
      .nonempty("کد ملی کاربر نمی‌تواند خالی باشد")
      .length(10, "کد ملی باید ۱۰ رقم باشد"),

    email: z.email("ایمیل معتبر نیست").nonempty("ایمیل نمی‌تواند خالی باشد"),

    birthDate: z.date("تاریخ تولد نمی‌تواند خالی باشد"),

    // Role
    role: z.enum(["admin", "investor", "reception", "consultant"]),

    // Permissions
    permissions: z.array(z.string()).optional().default([]),
    // Contract
    contract: z
      .object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role !== "investor") return;

    if (!data.contract?.startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["contract", "startDate"],
        message: "تاریخ شروع قرارداد الزامی است",
      });
    }

    if (!data.contract?.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["contract", "endDate"],
        message: "تاریخ پایان قرارداد الزامی است",
      });
    }

    if (
      data.contract?.startDate &&
      data.contract?.endDate &&
      data.contract.endDate <= data.contract.startDate
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["contract", "endDate"],
        message: "تاریخ پایان باید بعد از تاریخ شروع باشد",
      });
    }
  })
  .superRefine((data, ctx) => {
    if (
      (data.role === "reception" || data.role === "consultant") &&
      data.permissions.length === 0
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["permissions"],
        message: "حداقل یک سطح دسترسی باید انتخاب شود",
      });
    }
  });
// export const createUserSchema = z
//   .object({
//     // Identity
//     firstName: z
//       .string()
//       .nonempty("نام کاربر نمی‌تواند خالی باشد")
//       .min(3, "نام حداقل 3 کاراکتر است"),

//     lastName: z
//       .string()
//       .nonempty("نام خانوادگی کاربر نمی‌تواند خالی باشد")
//       .min(3, "نام خانوادگی حداقل 3 کاراکتر است"),

//     phoneNumber: z
//       .string()
//       .nonempty("شماره موبایل کاربر نمی‌تواند خالی باشد")
//       .regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),

//     nationalCode: z
//       .string()
//       .nonempty("کد ملی کاربر نمی‌تواند خالی باشد")
//       .length(10, "کد ملی باید ۱۰ رقم باشد"),

//     email: z.email("ایمیل معتبر نیست").nonempty("ایمیل نمی‌تواند خالی باشد"),

//     birthDate: z.date("تاریخ تولد نمی‌تواند خالی باشد"),

//     // Role
//     role: z.enum(["admin", "investor", "reception", "consultant"]),

//     // Permissions
//     permissions: z.array(z.string()).default([]),

//     // Contract
//     contractStartDate: z.date().optional(),
//     contractEndDate: z.date().optional(),

//     bankAccountNumber: z.string().optional(),

//     shabaNumber: z.string().optional(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.role !== "investor") return;

//     if (!data.contractStartDate) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["contractStartDate"],
//         message: "تاریخ شروع قرارداد الزامی است",
//       });
//     }

//     if (!data.contractEndDate) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["contractEndDate"],
//         message: "تاریخ پایان قرارداد الزامی است",
//       });
//     }

//     if (!data.bankAccountNumber) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["bankAccountNumber"],
//         message: "شماره حساب کاربر نمی‌تواند خالی باشد",
//       });
//     } else if (data.bankAccountNumber.length < 16) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["bankAccountNumber"],
//         message: "شماره حساب معتبر نیست",
//       });
//     }

//     if (!data.shabaNumber) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["shabaNumber"],
//         message: "شماره شبا نمی‌تواند خالی باشد",
//       });
//     } else if (!/^IR[0-9]{24}$/.test(data.shabaNumber)) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["shabaNumber"],
//         message: "شماره شبا باید با IR شروع شود و ۲۶ رقم باشد",
//       });
//     }
//   });

export const checkUserDuplicatesSchema = z
  .object({
    phoneNumber: z
      .string()
      .regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست")
      .optional(),

    nationalCode: z
      .string()
      .regex(/^\d{10}$/, "کد ملی معتبر نیست")
      .optional(),

    email: z.email("ایمیل معتبر نیست").optional(),

    excludeUserId: z
      .string()
      .regex(/^[a-f\d]{24}$/i, "شناسه کاربر معتبر نیست")
      .optional(),
  })
  .refine(
    (data) => Boolean(data.phoneNumber || data.nationalCode || data.email),
    {
      message: "حداقل یک فیلد برای بررسی لازم است",
    },
  );

export type CheckUserDuplicatesInput = z.infer<
  typeof checkUserDuplicatesSchema
>;

export const updateUserSchema = createUserSchema;
export type CreateUserInputTypes = z.infer<typeof createUserSchema>;
export type updateUserInputTypes = z.infer<typeof updateUserSchema>;

export interface UserType extends CreateUserInputTypes {
  _id: string;
  role: "admin" | "investor" | "reception" | "consultant";
  isActive: boolean;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}
