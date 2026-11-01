import { Stethoscope } from "lucide-react";
import PerformanceCard from "./PerformanceCard";

import type { ConsultantPerformanceType } from "../types/adminDashboard";

interface ConsultantPerformanceProps {
  consultants?: ConsultantPerformanceType[];
  isLoading: boolean;
}

export default function ConsultantPerformance({
  consultants = [],
  isLoading,
}: ConsultantPerformanceProps) {
  return (
    <section className="rounded-xl border bg-card p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Stethoscope className="size-5 text-primary" />

        <div>
          <h2 className="font-bold">عملکرد مشاورها</h2>
          <p className="text-xs text-muted-foreground">
            آمار جلسات مشاوره در ماه جاری
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-52 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      ) : consultants.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          مشاوری برای نمایش وجود ندارد.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {consultants.map((consultant) => {
            const { stats, user } = consultant;

            const completionRate =
              stats.monthlyAppointments > 0
                ? Math.min(
                    100,
                    Math.round(
                      (stats.monthlyCompleted / stats.monthlyAppointments) *
                        100,
                    ),
                  )
                : 0;

            return (
              <PerformanceCard
                key={user._id}
                name={`${user.firstName} ${user.lastName}`}
                completionRate={completionRate}
                metrics={[
                  {
                    label: "کل جلسات ماه",
                    value: stats.monthlyAppointments,
                  },
                  {
                    label: "تکمیل‌شده",
                    value: stats.monthlyCompleted,
                  },
                  {
                    label: "تأییدشده",
                    value: stats.monthlyApproved,
                  },
                  {
                    label: "جلسات امروز",
                    value: stats.todayAppointments,
                  },
                ]}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
