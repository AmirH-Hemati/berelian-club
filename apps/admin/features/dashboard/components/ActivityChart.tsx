"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Skeleton,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@repo/ui";

type ActivityItem = {
  month: number;
  count: number;
};

type ActivityChartProps = {
  requests?: ActivityItem[];
  appointments?: ActivityItem[];
  isLoading?: boolean;
};

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const chartConfig = {
  requests: {
    label: "درخواست‌ها",
    color: "#3B82F6",
  },
  appointments: {
    label: "مشاوره‌ها",
    color: "#10B981",
  },
} satisfies ChartConfig;

export default function ActivityChart({
  requests = [],
  appointments = [],
  isLoading = false,
}: ActivityChartProps) {
  const requestsMap = new Map(requests.map((item) => [item.month, item.count]));

  const appointmentsMap = new Map(
    appointments.map((item) => [item.month, item.count]),
  );

  const chartData = monthNames.map((month, index) => ({
    month: index + 1,
    monthName: month,
    requests: requestsMap.get(index + 1) ?? 0,
    appointments: appointmentsMap.get(index + 1) ?? 0,
  }));

  const totalRequests = requests.reduce((sum, item) => sum + item.count, 0);

  const totalAppointments = appointments.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>

        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle>روند درخواست‌ها و مشاوره‌ها</CardTitle>

        <CardDescription>
          مقایسه تعداد درخواست‌ها و مشاوره‌ها در ۱۲ ماه سال
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
            }}
          >
            <defs>
              <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-requests)"
                  stopOpacity={0.3}
                />

                <stop
                  offset="95%"
                  stopColor="var(--color-requests)"
                  stopOpacity={0.02}
                />
              </linearGradient>

              <linearGradient id="fillAppointments" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-appointments)"
                  stopOpacity={0.3}
                />

                <stop
                  offset="95%"
                  stopColor="var(--color-appointments)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="monthName"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={0}
              tick={{ fontSize: 11 }}
            />

            <YAxis
              orientation="right"
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              width={35}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.monthName ?? ""
                  }
                />
              }
            />

            <Area
              dataKey="requests"
              type="monotone"
              stroke="var(--color-requests)"
              strokeWidth={2.5}
              fill="url(#fillRequests)"
              fillOpacity={1}
              activeDot={{ r: 5 }}
            />

            <Area
              dataKey="appointments"
              type="monotone"
              stroke="var(--color-appointments)"
              strokeWidth={2.5}
              fill="url(#fillAppointments)"
              fillOpacity={1}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border p-3">
            <div className="mb-2 flex items-center gap-2 text-200 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              درخواست‌ها
            </div>

            <p className="text-500 font-bold">
              {totalRequests.toLocaleString("fa-IR")}
            </p>
          </div>

          <div className="rounded-lg border p-3">
            <div className="mb-2 flex items-center gap-2 text-200 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              مشاوره‌ها
            </div>

            <p className="text-500 font-bold">
              {totalAppointments.toLocaleString("fa-IR")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
