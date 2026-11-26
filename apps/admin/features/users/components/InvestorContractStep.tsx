"use client";

import { Banknote, CreditCard } from "lucide-react";

import CustomDatePicker from "@/components/CustomDatePicker";

import { FormField } from "@repo/ui";
import type { Control } from "react-hook-form";
import type { CreateUserInputTypes } from "@repo/schema";

type Props = {
  control: Control<CreateUserInputTypes>;
};

export default function InvestorContractStep({ control }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold">اطلاعات قرارداد سرمایه‌گذار</h3>
        <p className="text-sm text-muted-foreground mt-1">
          اطلاعات قرارداد و حساب بانکی سرمایه‌گذار را وارد کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomDatePicker
          control={control}
          name="contract.startDate"
          label="تاریخ شروع قرارداد"
        />

        <CustomDatePicker
          control={control}
          name="contract.endDate"
          label="تاریخ پایان قرارداد"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          name="bankAccountNumber"
          control={control}
          label="شماره حساب"
          placeholder="۱۲۳۴۵۶۷۸۹۰"
          icon={CreditCard}
        />

        <FormField
          name="shabaNumber"
          control={control}
          label="شماره شبا"
          placeholder="IR123456789012345678901234"
          icon={Banknote}
        />
      </div>
    </div>
  );
}
