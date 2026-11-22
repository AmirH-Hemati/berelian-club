"use client";

import {
  FileQuestion,
  FileText,
  TrendingDown,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

import {
  ScrollArea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardSkeleton,
  StatusBadge,
} from "@repo/ui";

import AsyncState from "@/components/AsyncState";
import type { RequestType } from "@repo/schema";
import Link from "next/link";

export const typesMap = {
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

interface RequestListProps {
  requests?: RequestType[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  title?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  newRequest?: boolean;
    error?: AxiosError<{ message?: string }> | Error | null;
  
}

export default function RequestList({
  requests,
  isLoading,
  isError,
  refetch,
  error,
  title = "درخواست‌های اخیر",
  emptyTitle = "درخواستی وجود ندارد",
  emptyDescription = "در حال حاضر درخواستی برای نمایش وجود ندارد.",
  newRequest = false,
}: RequestListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileQuestion className="size-4" />
          </div>

          <div className="space-y-0.5">
            <CardTitle>{title}</CardTitle>

            <p className="text-100 text-muted-foreground">
              {requests?.length
                ? `${requests.length} درخواست`
                : "درخواستی برای نمایش وجود ندارد"}
            </p>
          </div>
        </div>

        {newRequest && requests && requests.length > 0 && (
          <span className="shrink-0 rounded-full bg-blue-500/10 px-2.5 py-1 text-100 font-semibold text-blue-600 dark:text-blue-400">
            جدید
          </span>
        )}
      </CardHeader>

      <CardContent>
        <AsyncState
          data={requests}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          emptyIcon={FileQuestion}
          error={error}
        >
          <ScrollArea className="h-80 pl-2">
            <div className="space-y-2">
              {requests?.map((req) => {
                const config = typesMap[req.type as keyof typeof typesMap];

                if (!config) return null;

                const Icon = config.icon;

                const user = req.user as unknown as {
                  firstName?: string;
                  lastName?: string;
                };

                const fullName = [user?.firstName, user?.lastName]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={req._id}
                    className={`rounded-xl border p-3 transition-colors ${
                      newRequest
                        ? "border-primary/15 bg-primary/4 hover:bg-primary/[0.07]"
                        : "border-border/60 bg-background hover:bg-muted/30"
                    }`}
                  >
                    {/* Request title */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                          <Icon className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-200 font-semibold">
                            درخواست {config.label}
                          </p>

                          <p className="mt-0.5 truncate text-100 text-muted-foreground">
                            {fullName || "کاربر"}
                          </p>
                        </div>
                      </div>

                      {newRequest ? (
                        <span className="mt-0.5 shrink-0 rounded-full bg-blue-500/10 px-2 py-0.5 text-100 font-semibold text-blue-600 dark:text-blue-400">
                          جدید
                        </span>
                      ) : (
                        <StatusBadge status={req.status} />
                      )}
                    </div>

                    {/* Request description */}
                    {req.description && (
                      <p className="mt-2 line-clamp-2 text-100 leading-5 text-muted-foreground">
                        {req.description}
                      </p>
                    )}

                    {/* Details link */}
                    <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-2">
                      <span className="text-100 text-muted-foreground">
                        مشاهده اطلاعات درخواست
                      </span>

                      <Link
                        href={`/requests/${req._id}`}
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
