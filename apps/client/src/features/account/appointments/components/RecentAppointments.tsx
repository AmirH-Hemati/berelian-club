"use client";

import {
  CalendarDays,
  PhoneCall,
  Video,
  ArrowLeft,
  Clock3,
} from "lucide-react";

import {
  ScrollArea,
  Card,
  CardContent,
  CardHeader,
  StatusBadge,
  CardSkeleton,
} from "@repo/ui";

import AsyncState from "@/components/AsyncState";
import type { AppointmentType } from "@repo/schema";
import Link from "next/link";
import { convertDate } from "@/utils/helper";
import { useRecentAppointments } from "../hooks/useRecentAppointments";

const appointmentTypesMap = {
  phone: {
    label: "مشاوره تلفنی",
    icon: PhoneCall,
  },
  online: {
    label: "مشاوره آنلاین",
    icon: Video,
  },
};

export default function RecentAppointments() {
  const { appointments, isLoading, isError, refetch } = useRecentAppointments();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CalendarDays className="size-4" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-300 font-semibold">
              نوبت های مشاوره در جریان شما
            </h3>

            <p className="text-100 text-muted-foreground">
              {appointments?.length
                ? `${appointments?.length} جلسه مشاوره`
                : "جلسه‌ای برای نمایش وجود ندارد"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <AsyncState
          data={appointments}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="هنوز جلسه‌ای رزرو نکرده‌اید"
          emptyDescription="جلسات مشاوره رزرو‌شده شما در این قسمت نمایش داده می‌شوند."
          emptyIcon={CalendarDays}
        >
          <ScrollArea className="h-80 pl-2">
            <div className="space-y-2">
              {appointments?.map((appointment: AppointmentType) => {
                const config =
                  appointmentTypesMap[
                    appointment.type as keyof typeof appointmentTypesMap
                  ];

                if (!config) return null;

                const Icon = config.icon;

                return (
                  <div
                    key={appointment._id}
                    className="rounded-xl border border-border/60 bg-background p-3 transition-colors hover:bg-muted/30"
                  >
                    {/* Appointment title */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                          <Icon className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-200 font-semibold">
                            {config.label}
                          </p>

                          <p className="mt-0.5 truncate text-100 text-muted-foreground">
                            جلسه مشاوره شما
                          </p>
                        </div>
                      </div>

                      <StatusBadge status={appointment.status} />
                    </div>

                    {/* Appointment description */}
                    {appointment.description && (
                      <p className="mt-2 line-clamp-2 text-100 leading-5 text-muted-foreground">
                        {appointment.description}
                      </p>
                    )}

                    {/* Appointment date and time */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-100 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5" />
                        {convertDate(appointment.appointmentDate)}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock3 className="size-3.5" />
                        {appointment.startAt} تا {appointment.endAt}
                      </span>
                    </div>

                    {/* Details link */}
                    <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-2">
                      <span className="text-100 text-muted-foreground">
                        اطلاعات جلسه مشاوره
                      </span>

                      <Link
                        href={`/account/appointments/${appointment._id}`}
                        className="inline-flex items-center gap-1 text-100 font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        مشاهده جزئیات
                        <ArrowLeft className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </AsyncState>
      </CardContent>
    </Card>
  );
}
