"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CalendarDays, FileText, Trophy } from "lucide-react";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { StatsSkeleton } from "@/components/StatsSkeleton";

export default function Stats() {
  const { stats, isLoading } = useDashboardStats();
  if (isLoading) return <StatsSkeleton />;

  const statsMap = [
    {
      title: "مدت زمان باقی مانده قرارداد",
      value: stats.activeContractDays,
      suffix: "روز",
      icon: FileText,
    },

    {
      title: "درخواست های تایید نشده",
      value: stats.pendingRequests,
      suffix: "درخواست",
      icon: CalendarDays,
    },
    {
      title: " اعلان‌ها خوانده نشده",
      value: stats.unreadNotifications,
      suffix: "جدید",
      icon: Bell,
    },
    {
      title: "امتیاز",
      value: stats.xp,
      suffix: "XP",
      icon: Trophy,
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
                <p className="text-muted-foreground text-200 font-medium text-center lg:text-start">
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
