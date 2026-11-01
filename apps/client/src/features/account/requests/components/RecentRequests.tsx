"use client";

import {
  FileQuestion,
  FileText,
  TrendingDown,
  TrendingUp,
  ArrowLeft,
  UserRound,
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
import { convertDate } from "@/utils/helper";
import type { RequestType } from "@repo/schema";
import Link from "next/link";

import { useRecentRequests } from "../hooks/useRecentRequests";

const typesMap = {
  consultation: {
    label: "درخواست مشاوره با مدیر سبد",
    icon: UserRound,
  },
  renew_contract: {
    label: "تمدید قرارداد",
    icon: FileText,
  },
  increase_capital: {
    label: "افزایش سرمایه",
    icon: TrendingUp,
  },
  decrease_capital: {
    label: "کاهش سرمایه",
    icon: TrendingDown,
  },
};

export default function RecentRequests() {
  const { requests, isLoading, isError, refetch } = useRecentRequests();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileQuestion className="size-4" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-300 font-semibold">درخواست‌های اخیر شما</h3>

            <p className="text-100 text-muted-foreground">
              {requests?.length
                ? `${requests.length} درخواست`
                : "درخواستی برای نمایش وجود ندارد"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <AsyncState
          data={requests}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="هیچ درخواستی ثبت نشده است"
          emptyDescription="شما تاکنون درخواستی ثبت نکرده‌اید. درخواست‌های ثبت‌شده شما در این قسمت نمایش داده می‌شوند."
          emptyIcon={FileQuestion}
        >
          <ScrollArea className="h-80 pl-2">
            <div className="space-y-2">
              {requests?.map((req: RequestType) => {
                const config = typesMap[req.type as keyof typeof typesMap];

                if (!config) return null;

                const Icon = config.icon;

                return (
                  <div
                    key={req._id}
                    className="rounded-xl border border-border/60 bg-background p-3 transition-colors hover:bg-muted/30"
                  >
                    {/* Request title */}
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
                            درخواست ثبت‌شده شما
                          </p>
                        </div>
                      </div>

                      <StatusBadge status={req.status} />
                    </div>

                    {/* Request description */}
                    {req.description && (
                      <p className="mt-2 line-clamp-2 text-100 leading-5 text-muted-foreground">
                        {req.description}
                      </p>
                    )}

                    {/* Request date and details */}
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-2">
                      <span className="text-100 text-muted-foreground">
                        تاریخ ثبت: {convertDate(req.createdAt)}
                      </span>

                      <Link
                        href={`/account/requests/${req._id}`}
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
