"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  FormField,
} from "@repo/ui";

import {
  UserRound,
  Phone,
  Mail,
  CreditCard,
  Save,
  RotateCcw,
} from "lucide-react";

import { updateMeSchema, updateMeTypes, type UserType } from "@repo/schema";
import CustomDatePicker from "@/components/CustomDatePicker";
import { useUpdateMe } from "../hooks/useUpdateMe";

type Props = {
  user: UserType;
};

export default function PersonalInformation({ user }: Props) {
  const { updateMe, isUpdating } = useUpdateMe();

  const form = useForm<updateMeTypes>({
    resolver: zodResolver(updateMeSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      phoneNumber: user.phoneNumber ?? "",
      email: user.email ?? "",
      nationalCode: user.nationalCode ?? "",
      birthDate: new Date(user.birthDate) ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      phoneNumber: user.phoneNumber ?? "",
      email: user.email ?? "",
      nationalCode: user.nationalCode ?? "",
      birthDate: new Date(user.birthDate) ?? "",
    });
  }, [user, form]);

  function handleCancel() {
    form.reset();
  }

  function handleSubmit(values: updateMeTypes) {
    updateMe(values);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle>اطلاعات شخصی</CardTitle>
          <p className="text-200 text-muted-foreground">
            مشخصات هویتی و اطلاعات حساب کاربری خود را مدیریت کنید.
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserRound className="size-5" />
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              name="firstName"
              control={form.control}
              label="نام"
              placeholder="مثال: امیر"
              icon={UserRound}
            />

            <FormField
              name="lastName"
              control={form.control}
              label="نام خانوادگی"
              placeholder="مثال: حسینی"
              icon={UserRound}
            />

            <FormField
              name="phoneNumber"
              control={form.control}
              label="تلفن همراه"
              placeholder="09123456789"
              icon={Phone}
            />

            <FormField
              name="email"
              control={form.control}
              label="ایمیل"
              placeholder="example@gmail.com"
              icon={Mail}
            />

            <FormField
              name="nationalCode"
              control={form.control}
              label="کد ملی"
              placeholder="کد ملی خود را وارد کنید"
              icon={CreditCard}
            />

            <CustomDatePicker
              control={form.control}
              name="birthDate"
              label="تاریخ تولد"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isUpdating || !form.formState.isDirty}
            >
              <RotateCcw className="ml-2 size-4" />
              لغو تغییرات
            </Button>

            <Button
              type="submit"
              disabled={isUpdating || !form.formState.isDirty}
            >
              <Save className="ml-2 size-4" />
              {isUpdating ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
