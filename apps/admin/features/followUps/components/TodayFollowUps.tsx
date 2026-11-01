"use client";

import {
  CalendarDays,
  ClipboardCheck,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  FileText,
} from "lucide-react";

import Link from "next/link";
import type { FollowUpType } from "@repo/schema";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardSkeleton,
  ScrollArea,
  Badge,
  cn,
} from "@repo/ui";

import AsyncState from "@/components/AsyncState";

const statusConfig = {
  pending: {
    label: "در انتظار",
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: Clock,
  },
  completed: {
    label: "تکمیل شده",
    className:
      "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "لغو شده",
    className: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    icon: XCircle,
  },
};

interface TodayFollowUpsProps {
  followUps?: FollowUpType[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export default function TodayFollowUps({
  followUps,
  isLoading,
  isError,
  refetch,
}: TodayFollowUpsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CalendarDays className="size-4" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-300 font-semibold">
              پیگیری‌های امروز
            </h3>

            <p className="text-100 text-muted-foreground">
              {followUps?.length
                ? `${followUps.length} پیگیری`
                : "پیگیری‌ای برای نمایش وجود ندارد"}
            </p>
          </div>
        </div>

        {!!followUps?.length && (
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-100 font-semibold text-primary">
            امروز
          </span>
        )}
      </CardHeader>

      <CardContent>
        <AsyncState
          data={followUps}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="پیگیری‌ای برای امروز وجود ندارد"
          emptyDescription="در حال حاضر پیگیری برنامه‌ریزی‌شده‌ای ندارید."
          emptyIcon={ClipboardCheck}
        >
          <ScrollArea className="h-80 pl-2">
            <div className="space-y-2">
              {followUps?.map((followUp) => {
                const status =
                  statusConfig[followUp.status as keyof typeof statusConfig] ??
                  statusConfig.pending;

                const StatusIcon = status.icon;

                return (
                  <div
                    key={followUp._id}
                    className={cn(
                      "rounded-xl border p-3 transition-colors",
                      followUp.status === "pending" &&
                        "border-amber-500/15 bg-amber-500/[0.03] hover:bg-amber-500/[0.06]",
                      followUp.status === "completed" &&
                        "border-green-500/15 bg-green-500/[0.03] hover:bg-green-500/[0.06]",
                      followUp.status === "cancelled" &&
                        "border-border/60 bg-muted/20 opacity-80",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                          <ClipboardCheck className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-200 font-semibold">
                            پیگیری گزارش جلسه
                          </p>

                          <p className="mt-0.5 text-100 text-muted-foreground">
                            پیگیری و بررسی وضعیت جلسه
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0 gap-1 font-medium",
                          status.className,
                        )}
                      >
                        <StatusIcon className="size-3" />
                        {status.label}
                      </Badge>
                    </div>

                    {followUp.note && (
                      <p className="mt-2 line-clamp-2 text-100 leading-5 text-muted-foreground">
                        {followUp.note}
                      </p>
                    )}

                    {followUp.sessionReport?.summary && (
                      <div className="mt-2 flex items-start gap-2 rounded-lg bg-background/70 p-2">
                        <FileText className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />

                        <p className="line-clamp-2 text-100 leading-5 text-muted-foreground">
                          {followUp.sessionReport.summary}
                        </p>
                      </div>
                    )}

                    <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-2">
                      <span className="text-100 text-muted-foreground">
                        جزئیات پیگیری
                      </span>

                      <Link
                        href={`/followups/${followUp._id}`}
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
