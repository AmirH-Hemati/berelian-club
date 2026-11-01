"use client";

import {
  CalendarDays,
  CalendarClock,
  PhoneCall,
  Video,
  ArrowLeft,
  Clock3,
  CalendarCheck,
} from "lucide-react";

import Link from "next/link";
import type { AppointmentType } from "@repo/schema";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardSkeleton,
  ScrollArea,
  StatusBadge,
} from "@repo/ui";

import AsyncState from "@/components/AsyncState";
import { formatDate } from "@/utils/helper";

export const appointmentTypesMap = {
  phone: {
    label: "مشاوره تلفنی",
    icon: PhoneCall,
  },
  online: {
    label: "مشاوره آنلاین",
    icon: Video,
  },
};

interface AppointmentListProps {
  appointments?: AppointmentType[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  title?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  mode?: "pending" | "today";
}

export default function AppointmentList({
  appointments,
  isLoading,
  isError,
  refetch,
  title = "جلسات مشاوره",
  emptyTitle = "جلسه‌ای وجود ندارد",
  emptyDescription = "در حال حاضر جلسه‌ای برای نمایش وجود ندارد.",
  mode = "pending",
}: AppointmentListProps) {
  const isPending = mode === "pending";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {isPending ? (
              <CalendarClock className="size-4" />
            ) : (
              <CalendarCheck className="size-4" />
            )}
          </div>

          <div className="space-y-0.5">
            <h3 className="text-300 font-semibold">{title}</h3>

            <p className="text-100 text-muted-foreground">
              {appointments?.length
                ? `${appointments.length} جلسه`
                : "جلسه‌ای برای نمایش وجود ندارد"}
            </p>
          </div>
        </div>

        {isPending && !!appointments?.length && (
          <span className="shrink-0 rounded-full bg-blue-500/10 px-2.5 py-1 text-100 font-semibold text-blue-600 dark:text-blue-400">
            نیازمند بررسی
          </span>
        )}
      </CardHeader>

      <CardContent>
        <AsyncState
          data={appointments}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          emptyIcon={CalendarDays}
        >
          <ScrollArea className="h-80 pl-2">
            <div className="space-y-2">
              {appointments?.map((appointment) => {
                const config =
                  appointmentTypesMap[
                    appointment.type as keyof typeof appointmentTypesMap
                  ];

                if (!config) return null;

                const Icon = config.icon;

                const user = appointment.user as unknown as {
                  firstName?: string;
                  lastName?: string;
                };

                const fullName = [user?.firstName, user?.lastName]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={appointment._id}
                    className={`rounded-xl border p-3 transition-colors ${
                      isPending
                        ? "border-primary/15 bg-primary/4 hover:bg-primary/[0.07]"
                        : "border-border/60 bg-background hover:bg-muted/30"
                    }`}
                  >
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
                            {fullName || "سرمایه‌گذار"}
                          </p>
                        </div>
                      </div>

                      <StatusBadge status={appointment.status} />
                    </div>

                    {appointment.description && (
                      <p className="mt-2 line-clamp-2 text-100 leading-5 text-muted-foreground">
                        {appointment.description}
                      </p>
                    )}

                    {!isPending && (
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-100 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="size-3.5" />
                          {formatDate(appointment.appointmentDate)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 className="size-3.5" />
                          {appointment.startAt} تا {appointment.endAt}
                        </span>
                      </div>
                    )}

                    <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-2">
                      <span className="text-100 text-muted-foreground">
                        {isPending
                          ? "درخواست نیازمند بررسی است"
                          : "اطلاعات جلسه"}
                      </span>

                      <Link
                        href={`/appointments/${appointment._id}`}
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
