"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import CustomDatePicker from "@/components/CustomDatePicker";
import {
  Banknote,
  CreditCard,
  IdCard,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";

import { createUserSchema, CreateUserInputTypes, UserType } from "@repo/schema";
import { useCreateUser } from "../hooks/useCreateUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormField,
  Button,
} from "@repo/ui";

type Props = { user?: UserType; onCloseDialog: () => void };
export function CreateUserForm({ user, onCloseDialog }: Props) {
  const { createUser, isCreating } = useCreateUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const editId = user?._id || "";
  const isEditSession = Boolean(editId);
  const isWorking = isCreating || isUpdating;
  const form = useForm<CreateUserInputTypes>({
    resolver: zodResolver(createUserSchema),
    defaultValues: isEditSession
      ? {
          ...user,
          birthDate: new Date(user?.birthDate || ""),
          contractStartDate: new Date(user?.contractStartDate || ""),
          contractEndDate: new Date(user?.contractEndDate || ""),
          role: user?.role || "investor",
        }
      : {
          firstName: "amir",
          lastName: "hemati",
          phoneNumber: "09913199902",
          nationalCode: "1274027004",
          email: "amir@gmail.com",
          bankAccountNumber: "1236547890123654",
          shabaNumber: "IR123456789012345678901234",
          birthDate: new Date(),
          contractStartDate: new Date(),
          contractEndDate: new Date(),
          role: "investor",
          // new Date().setFullYear(new Date().getFullYear() + 1),
        },
  });

  const handleSubmit = (values: CreateUserInputTypes) => {
    if (isEditSession) {
      updateUser(
        { id: editId, data: values },
        {
          onSuccess: () => {
            onCloseDialog();
          },
        },
      );
    } else {
      createUser(values, {
        onSuccess: () => {
          onCloseDialog();
        },
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>ایجاد کاربر جدید</DialogTitle>
        <DialogDescription>
          اطلاعات کاربر جدید را وارد کنید. تمامی فیلد ها الزامی هستند.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className=" mt-4 flex flex-col gap-6"
      >
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
                onValueChange={field.onChange}
                defaultValue={field.value}
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
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomDatePicker
            control={form.control}
            name="birthDate"
            label="تاریخ تولد"
          />
          <CustomDatePicker
            control={form.control}
            name="contractStartDate"
            label="تاریخ شروع قرارداد"
          />
          <CustomDatePicker
            control={form.control}
            name="contractEndDate"
            label="تاریخ پایان قرارداد"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="bankAccountNumber"
            control={form.control}
            label="شماره حساب"
            placeholder="۱۲۳۴۵۶۷۸۹۰"
            icon={CreditCard}
          />

          <FormField
            name="shabaNumber"
            control={form.control}
            label="شماره شبا"
            placeholder="IR123456789012345678901234"
            icon={Banknote}
          />
        </div>

        <div className="flex gap-3 pt-4 mr-auto">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onCloseDialog}
          >
            انصراف
          </Button>
          <Button type="submit" size="lg" disabled={isWorking}>
            {isEditSession ? "ویرایش کاربر" : "ایجاد کاربر"}
          </Button>
        </div>
      </form>
    </>
  );
}
