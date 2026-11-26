"use client";
import CustomDatePicker from "@/components/CustomDatePicker";
import { CreateUserInputTypes } from "@repo/schema";
import {
  Field,
  FieldError,
  FieldLabel,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { BriefcaseBusiness, Headset, IdCard, Mail, Phone, Shield, User } from "lucide-react";
import { Control, Controller, UseFormReturn } from "react-hook-form";

type Props = {
  control: Control<CreateUserInputTypes>;
  handleRoleChange: (value: CreateUserInputTypes["role"]) => void;
  form: UseFormReturn<CreateUserInputTypes>;
};

export default function UserIdentity({
  control,
  handleRoleChange,
  form,
}: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold">اطلاعات هویتی کاربر</h3>
        <p className="text-sm text-muted-foreground mt-1">
          اطلاعات شخصی و راه‌های ارتباطی کاربر را وارد کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          name="firstName"
          control={form.control}
          label="نام"
          placeholder="مثال: رضا"
          icon={User}
        />

        <FormField
          name="lastName"
          control={form.control}
          label="نام خانوادگی"
          placeholder="مثال: حسینی"
          icon={User}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          name="phoneNumber"
          control={form.control}
          label="شماره موبایل"
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          icon={Phone}
        />

        <FormField
          name="nationalCode"
          control={form.control}
          label="کد ملی"
          placeholder="۱۲۳۴۵۶۷۸۹۰"
          icon={IdCard}
        />
      </div>

      <FormField
        name="email"
        control={form.control}
        label="ایمیل"
        type="email"
        placeholder="example@gmail.com"
        icon={Mail}
      />

      <Controller
        name="role"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="role">نقش کاربر</FieldLabel>

            <Select
              value={field.value}
              onValueChange={(value) =>
                handleRoleChange(value as CreateUserInputTypes["role"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب نقش کاربر" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-red-500" />
                    <span>ادمین</span>
                  </div>
                </SelectItem>

                <SelectItem value="investor">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-blue-500" />
                    <span>سرمایه‌گذار</span>
                  </div>
                </SelectItem>

                <SelectItem value="reception">
                  <div className="flex items-center gap-2">
                    <Headset className="size-4 text-green-500" />
                    <span>پذیرش</span>
                  </div>
                </SelectItem>

                <SelectItem value="consultant">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="size-4 text-purple-500" />
                    <span>مشاور</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <CustomDatePicker
        control={form.control}
        name="birthDate"
        label="تاریخ تولد"
      />
    </div>
  );
}
