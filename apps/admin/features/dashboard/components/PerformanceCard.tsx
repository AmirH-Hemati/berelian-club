"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@repo/ui";

type PerformanceUser = {
  _id: string;
  firstName: string;
  lastName: string;
  role: "reception" | "consultant";
};

type ReceptionPerformance = {
  user: PerformanceUser;
  stats: {
    totalAssigned: number;
    monthlyAssigned: number;
    monthlyCompleted: number;
    inProgress: number;
  };
};

type ConsultantPerformance = {
  user: PerformanceUser;
  stats: {
    monthlyAppointments: number;
    monthlyCompleted: number;
    monthlyApproved: number;
    todayAppointments: number;
  };
};

interface PerformanceChartProps {
  receptionPerformance?: ReceptionPerformance[];
  consultantPerformance?: ConsultantPerformance[];
  isLoading?: boolean;
}

const receptionConfig = {
  assigned: {
    label: "تخصیص‌یافته",
    color: "#3B82F6",
  },
  completed: {
    label: "تکمیل‌شده",
    color: "#10B981",
  },
  inProgress: {
    label: "در حال رسیدگی",
    color: "#F59E0B",
  },
} satisfies ChartConfig;

const consultantConfig = {
  appointments: {
    label: "کل جلسات ماه",
    color: "#3B82F6",
  },
  completed: {
    label: "تکمیل‌شده",
    color: "#10B981",
  },
  approved: {
    label: "تأییدشده",
    color: "#F59E0B",
  },
} satisfies ChartConfig;

export default function PerformanceChart({
  receptionPerformance = [],
  consultantPerformance = [],
  isLoading = false,
}: PerformanceChartProps) {
  const [selectedGroup, setSelectedGroup] = useState<
    "reception" | "consultant"
  >("reception");

  const isReception = selectedGroup === "reception";

  const chartData = useMemo(() => {
    if (isReception) {
      return receptionPerformance.map(({ user, stats }) => ({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        assigned: stats.monthlyAssigned,
        completed: stats.monthlyCompleted,
        inProgress: stats.inProgress,
      }));
    }

    return consultantPerformance.map(({ user, stats }) => ({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      appointments: stats.monthlyAppointments,
      completed: stats.monthlyCompleted,
      approved: stats.monthlyApproved,
    }));
  }, [isReception, receptionPerformance, consultantPerformance]);

  const config = isReception ? receptionConfig : consultantConfig;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-56 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card dir="rtl">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>عملکرد کارکنان</CardTitle>
            <CardDescription>مقایسه عملکرد نیروها در ماه جاری</CardDescription>
          </div>

          <div className="flex rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => setSelectedGroup("reception")}
              className={`rounded-md px-4 py-2 text-200 transition-colors ${
                isReception
                  ? "bg-background font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              پذیرش‌ها
            </button>

            <button
              type="button"
              onClick={() => setSelectedGroup("consultant")}
              className={`rounded-md px-4 py-2 text-200 transition-colors ${
                !isReception
                  ? "bg-background font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              مشاورها
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-[280px] items-center justify-center text-200 text-muted-foreground">
            اطلاعاتی برای نمایش عملکرد وجود ندارد.
          </div>
        ) : (
          <ChartContainer config={config} className="min-h-[280px] w-full">
            <BarChart
              data={chartData}
              margin={{ top: 16, right: 12, left: 12, bottom: 8 }}
              barGap={5}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                interval={0}
              />

              <YAxis
                type="number"
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => Number(value).toLocaleString("fa-IR")}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />

              <ChartLegend content={<ChartLegendContent />} />

              {isReception ? (
                <>
                  <Bar
                    dataKey="assigned"
                    fill="var(--color-assigned)"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="completed"
                    fill="var(--color-completed)"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="inProgress"
                    fill="var(--color-inProgress)"
                    radius={[0, 4, 4, 0]}
                  />
                </>
              ) : (
                <>
                  <Bar
                    dataKey="appointments"
                    fill="var(--color-appointments)"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="completed"
                    fill="var(--color-completed)"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="approved"
                    fill="var(--color-approved)"
                    radius={[0, 4, 4, 0]}
                  />
                </>
              )}
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
