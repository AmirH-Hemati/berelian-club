"use client";
import { Card, CardContent, StatsSkeleton } from "@repo/ui";
import { Calendar, CalendarClock, ClipboardPlus, Clock } from "lucide-react";
import { useDashboardStats } from "../hooks/useDashboardStats";

export default function Stats() {
  const { stats, isLoading } = useDashboardStats();
  if (isLoading) return <StatsSkeleton />;

  const statsMap = [
    {
      title: "درخواست‌های جدید",
      value: stats.pendingRequests,
      suffix: "درخواست",
      icon: ClipboardPlus,
    },

    {
      title: "رزرو مشاورات جدید",
      value: stats.pendingAppointment,
      suffix: "جدید",
      icon: CalendarClock,
    },

    {
      title: "پیگیری‌های روزانه",
      value: stats.followUpsToday,
      suffix: "پیگیری",
      icon: Clock,
    },

    {
      title: "جلسات مشاوره امروز",
      value: stats.appointmentsToday,
      suffix: "جلسه",
      icon: Calendar,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3  lg:grid-cols-4">
      {statsMap.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className=" lg:p-4 flex lg:flex-row flex-col items-center  lg:items-start gap-2">
              <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-xl p-3 transition-colors">
                <Icon />
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground text-200 font-medium text-center lg:text-start ">
                  {item.title}
                </p>

                <div className="flex items-center justify-center lg:justify-start gap-1">
                  <span className="text-500 font-semibold ">{item.value}</span>

                  <span className="text-muted-foreground text-200 text-center">
                    {item.suffix}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
