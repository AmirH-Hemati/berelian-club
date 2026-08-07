"use client";
import { ScrollArea } from "@repo/ui";
import { CalendarOff, PhoneCall } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@repo/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import StatusBadge from "@/features/requests/components/StatusBadge";
import { formatDate } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useRecentAppointments } from "../hooks/useRecentAppointments";
import { CardSkeleton } from "@/components/CardSkeleton";
import { AppointmentType } from "@repo/schema";
import { cn } from "@repo/ui";
import AsyncState from "@/components/AsyncState";

export const typesMap = {
  phone: {
    label: "درخواست مشاوره تلفنی",
    icon: PhoneCall,
  },
  online: {
    label: "درخواست مشاوره آنلاین",
    icon: PhoneCall,
  },
};
export default function RecentAppoinetments() {
  const { appointments, isLoading, isError, refetch } = useRecentAppointments();
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>رزرو جلسات مشاوره اخیر</CardTitle>
      </CardHeader>
      <CardContent>
        <AsyncState
          data={appointments}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="هیچ جلسه مشاوره‌ای ثبت نشده است"
          emptyDescription="کاربران هنوز جلسه مشاوره ای ثبت نکرده‌اند."
          emptyIcon={CalendarOff}
        >
          <ScrollArea className={cn(appointments.length !== 0 && "h-80")}>
            {appointments.map((appoint: AppointmentType) => {
              const title =
                typesMap[appoint.type as keyof typeof typesMap].label;
              const Icon = typesMap[appoint.type as keyof typeof typesMap].icon;
              return (
                <Alert
                  key={appoint._id}
                  className="mb-3 cursor-pointer  hover:border-primary/40"
                  onClick={() => router.push(`/appointments/${appoint._id}`)}
                >
                  <div className="flex gap-1">
                    <Icon className="size-4 text-muted-foreground" />

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <AlertTitle className="text-300 font-medium">
                          {title}
                        </AlertTitle>

                        <StatusBadge status={appoint.status} />
                      </div>

                      <AlertDescription className="line-clamp-1 text-200 text-muted-foreground">
                        {appoint.description}
                      </AlertDescription>

                      <p className="text-100 text-muted-foreground/70 mt-1">
                        تاریخ ثبت درخواست :{formatDate(appoint.createdAt)}
                      </p>
                    </div>
                  </div>
                </Alert>
              );
            })}
          </ScrollArea>
        </AsyncState>
      </CardContent>
    </Card>
  );
}
