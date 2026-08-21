"use client";

import AsyncState from "@/components/AsyncState";
import { formatDate, formatTime } from "@/utils/helper";
import { AppointmentType } from "@repo/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardSkeleton,
  CardTitle,
  ScrollArea,
  StatusBadge
} from "@repo/ui";
import { Calendar, CalendarX } from "lucide-react";
import { useTodayAppointments } from "../hooks/useTodayAppointments";

export function TodayAppointments() {
  const { appointments, isLoading, isError, refetch } = useTodayAppointments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="size-5" />
          جلسات امروز
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AsyncState
          data={appointments}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="هیچ جلسه مشاوره‌ای برای امروز وجود ندارد"
          emptyDescription="امروز هیچ جلسه مشاوره‌ای رزرو نشده است."
          emptyIcon={CalendarX}
        >
          <ScrollArea className="h-80">
            <div>
              {appointments?.map((item: AppointmentType) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-2 bg-muted/30 rounded-lg mb-2"
                >
                  <div>
                    <p className="text-300 font-medium">
                      {item.type === "online"
                        ? "🖥️ مشاوره آنلاین"
                        : "📞 مشاوره تلفنی"}
                    </p>
                    <p className="text-100 text-muted-foreground">
                      {formatDate(item.appointmentDate)} -{" "}
                      {formatTime(item.appointmentDate)}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </AsyncState>
      </CardContent>
    </Card>
  );
}
