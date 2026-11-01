import { Users } from "lucide-react";
import PerformanceCard from "./PerformanceCard";

import type { ReceptionPerformanceType } from "../types/adminDashboard";

interface ReceptionPerformanceProps {
  receptions?: ReceptionPerformanceType[];
  isLoading: boolean;
}

export default function ReceptionPerformance({
  receptions = [],
  isLoading,
}: ReceptionPerformanceProps) {
  return (
    <section className="rounded-xl border bg-card p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Users className="size-5 text-primary" />

        <div>
          <h2 className="font-bold">عملکرد تیم پذیرش</h2>
          <p className="text-xs text-muted-foreground">
            آمار درخواست‌های هر پذیرش در ماه جاری
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
      ) : receptions.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          پذیرشی برای نمایش وجود ندارد.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {receptions.map((reception) => {
            const { stats, user } = reception;

            const completionRate =
              stats.monthlyAssigned > 0
                ? Math.min(
                    100,
                    Math.round(
                      (stats.monthlyCompleted / stats.monthlyAssigned) * 100,
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
                    label: "کل درخواست‌ها",
                    value: stats.totalAssigned,
                  },
                  {
                    label: "اختصاص‌یافته در ماه",
                    value: stats.monthlyAssigned,
                  },
                  {
                    label: "تکمیل‌شده",
                    value: stats.monthlyCompleted,
                  },
                  {
                    label: "در حال بررسی",
                    value: stats.inProgress,
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
