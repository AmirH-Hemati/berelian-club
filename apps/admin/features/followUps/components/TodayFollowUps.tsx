"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  Clock,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTodayFollowUps } from "../hooks/useTodayFollowUps";
import { CardSkeleton } from "@/components/CardSkeleton";
import { FollowUpType } from "@repo/schema";
import AsyncState from "@/components/AsyncState";

const statusConfig = {
  pending: {
    label: "در انتظار",
    className: "bg-gray-100 text-gray-700",
    icon: Clock,
  },
  completed: {
    label: "تکمیل شد",
    className: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  cancelled: {
    label: "لغو شد",
    className: "bg-red-100 text-red-700",
    icon: AlertCircle,
  },
};

export default function TodayFollowUps() {
  const { followUps, isLoading, isError, refetch } = useTodayFollowUps();
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="size-5" />
          پیگیری‌های روزانه
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AsyncState
          data={followUps}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="هیچ پیگیری روزانه‌ای وجود ندارد"
          emptyDescription="پیگیری روزانه جدیدی ثبت نشده است"
          emptyIcon={ClipboardCheck}
        >
          <ScrollArea className="h-80">
            {followUps?.map((followUp: FollowUpType) => {
              const status =
                statusConfig[followUp.status as keyof typeof statusConfig] ||
                statusConfig.pending;

              const StatusIcon = status.icon;
              return (
                <Alert
                  key={followUp._id}
                  className={cn(
                    "mb-3 cursor-pointer hover:border-primary/40 transition-all",
                    followUp.isCompleted && "border-red-300 bg-red-50/50",
                    followUp.status === "completed" && "opacity-70",
                  )}
                  onClick={() => router.push(`/followups/${followUp._id}`)}
                >
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <AlertTitle className="text-sm font-medium flex items-center gap-2">
                          پیگیری گزارش
                        </AlertTitle>

                        <div className="flex items-center gap-2">
                          <Badge className={status.className}>
                            <StatusIcon className="size-3 " />
                            {status.label}
                          </Badge>
                        </div>
                      </div>

                      {followUp.note && (
                        <AlertDescription className="line-clamp-1 text-xs text-muted-foreground">
                          {followUp.note}
                        </AlertDescription>
                      )}

                      <div className="flex flex-col  gap-1 text-xs text-muted-foreground/70 mt-1">
                        {followUp.sessionReport && (
                          <span className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            گزارش جلسه: {followUp.sessionReport?.summary || "-"}
                          </span>
                        )}
                      </div>
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
