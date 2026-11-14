"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";

import { Banknote, CreditCard } from "lucide-react";
import type { UserType } from "@repo/schema";

type Props = {
  user: UserType;
};

export default function BankInformation({ user }: Props) {
  const items = [
    {
      label: "شماره حساب",
      value: user.bankAccountNumber,
      icon: Banknote,
    },
    {
      label: "شماره شبا",
      value: user.shabaNumber,
      icon: CreditCard,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle>اطلاعات بانکی</CardTitle>
          <p className="text-100 text-muted-foreground">
            مشخصات حساب بانکی ثبت‌شده شما
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Banknote className="size-5" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 sm:grid-cols-2">
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
                    dir="ltr"
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
            اطلاعات بانکی شما توسط واحد مدیریت ثبت و به‌روزرسانی می‌شود.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
