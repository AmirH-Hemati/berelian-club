import { z } from "zod";
import { UserType } from "./user.schema.js";

export const createRequestSchema = z.object({
  type: z
    .enum(
      [
        "consultation",
        "renew_contract",
        "increase_capital",
        "decrease_capital",
      ],
      "لطفا نوع درخواست خود را انتخاب کنید",
    )
    .nonoptional("نوع درخواست الزامی است"),

  description: z
    .string()
    .nonempty("توضیحات درخواست الزامی است")
    .min(5, "توضیحات باید بیشتر از 5 حرف باشد"),
});

export type CreateRequestTypes = z.infer<typeof createRequestSchema>;

export interface RequestType extends CreateRequestTypes {
  _id: string;
  user: UserType;
  type:
    | "consultation"
    | "renew_contract"
    | "increase_capital"
    | "decrease_capital";
  status: "pending" | "approved" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
