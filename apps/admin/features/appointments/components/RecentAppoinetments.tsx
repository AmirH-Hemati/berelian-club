"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarOff, PhoneCall } from "lucide-react";

import Spinner from "@/components/Spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/features/requests/components/StatusBadge";
import { formatDate } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useRecentAppointments } from "../hooks/useRecentAppointments";
import { CardSkeleton } from "@/components/CardSkeleton";
import { AppointmentType } from "@repo/schema";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";
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
                        <AlertTitle className="text-sm font-medium">
                          {title}
                        </AlertTitle>

                        <StatusBadge status={appoint.status} />
                      </div>

                      <AlertDescription className="line-clamp-1 text-xs text-muted-foreground">
                        {appoint.description}
                      </AlertDescription>

                      <p className="text-xs text-muted-foreground/70 mt-1">
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
