"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";

import { CreditCard, Mail, Phone, UserRound, CalendarDays } from "lucide-react";

import type { UserType } from "@repo/schema";
import { convertDate } from "@/utils/helper";

type Props = {
  user: UserType;
};

export default function PersonalInformation({ user }: Props) {
  const items = [
    {
      label: "نام",
      value: user.firstName,
      icon: UserRound,
    },
    {
      label: "نام خانوادگی",
      value: user.lastName,
      icon: UserRound,
    },
    {
      label: "تلفن همراه",
      value: user.phoneNumber,
      icon: Phone,
    },
    {
      label: "ایمیل",
      value: user.email,
      icon: Mail,
    },
    {
      label: "کد ملی",
      value: user.nationalCode,
      icon: CreditCard,
    },
    {
      label: "تاریخ تولد",
      value: user.birthDate ? convertDate(user.birthDate) : null,
      icon: CalendarDays,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle >
            اطلاعات شخصی
          </CardTitle>
          <p className="text-200 text-muted-foreground">
            اطلاعات هویتی و مشخصات ثبت‌شده شما
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserRound className="size-5" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex min-w-0 items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Icon className="size-4" strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-200 text-muted-foreground">{item.label}</p>

                  <p
                    className="truncate text-300 text-right font-medium"
                    dir={
                      item.label === "تلفن همراه" || item.label === "کد ملی"
                        ? "ltr"
                        : "auto"
                    }
                  >
                    {item.value || "ثبت نشده"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 border-t pt-3">
          <p className="text-100 leading-6 text-muted-foreground">
            برای اصلاح اطلاعات شخصی خود، لطفاً با پشتیبانی برلیان تماس بگیرید.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
