"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileQuestion,
  FileText,
  TrendingDown,
  TrendingUp,
  UserRound,
} from "lucide-react";

import { CardSkeleton } from "@/components/CardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertDate } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useRecentRequests } from "../hooks/useRecentRequests";
import StatusBadge from "./StatusBadge";
import { RequestType } from "@repo/schema";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const typesMap = {
  consultation: {
    label: "درخواست مشاوره با مدیر سبد",
    icon: UserRound,
  },
  renew_contract: {
    label: "درخواست تمدید قرارداد",
    icon: FileText,
  },
  increase_capital: {
    label: "درخواست افزایش سرمایه",
    icon: TrendingUp,
  },
  decrease_capital: {
    label: "درخواست کاهش سرمایه",
    icon: TrendingDown,
  },
};

export default function RecentRequests() {
  const { requests, isLoading } = useRecentRequests();
  const router = useRouter();
  if (isLoading) return <CardSkeleton />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>درخواست‌های اخیر شما</CardTitle>
      </CardHeader>
      <CardContent>
        {(!requests || requests.length === 0) && (
          <EmptyState
            title="هیچ درخواستی ثبت نشده"
            icon={FileQuestion}
            description=" شما تاکنون هیچ درخواستی ثبت نکرده‌اید. برای شروع، اولین درخواست خود را
          ثبت کنید."
          >
            <Button asChild>
              <Link href="/dashboard/requests/new">ثبت درخواست جدید</Link>
            </Button>
          </EmptyState>
        )}
        <ScrollArea className={cn(requests.length !== 0 && "h-80")}>
          {requests.map((req: RequestType) => {
            const title = typesMap[req.type as keyof typeof typesMap].label;
            const Icon = typesMap[req.type as keyof typeof typesMap].icon;
            return (
              <Alert
                key={req._id}
                className="mb-3 cursor-pointer  hover:border-primary/40"
                onClick={() => router.push(`/requests/${req._id}`)}
              >
                <div className="flex gap-1">
                  <Icon className="size-4 text-muted-foreground" />

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <AlertTitle className="text-sm font-medium">
                        {title}
                      </AlertTitle>

                      <StatusBadge status={req.status} />
                    </div>

                    <AlertDescription className="text-xs text-muted-foreground">
                      {req.description}
                    </AlertDescription>

                    <p className="text-xs text-muted-foreground/70 mt-1">
                      تاریخ ثبت درخواست :{convertDate(req.createdAt)}
                    </p>
                  </div>
                </div>
              </Alert>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
