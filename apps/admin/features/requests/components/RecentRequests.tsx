"use client";
import { ScrollArea } from "@repo/ui";
import {
  FileQuestion,
  FileText,
  TrendingDown,
  TrendingUp,
  UserRound,
} from "lucide-react";

import AsyncState from "@/components/AsyncState";
import { CardSkeleton } from "@/components/CardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { formatDate } from "@/utils/helper";
import { RequestType } from "@repo/schema";
import { useRouter } from "next/navigation";
import { useRecentRequests } from "../hooks/useRecentRequests";
import StatusBadge from "./StatusBadge";

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
  const { requests, isLoading, isError, refetch } = useRecentRequests();
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>درخواست‌های اخیر </CardTitle>
      </CardHeader>
      <CardContent>
        <AsyncState
          data={requests}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="هیچ درخواستی ثبت نشده است"
          emptyDescription="کاربران هنوز درخواستی ثبت نکرده‌اند."
          emptyIcon={FileQuestion}
        >
          <ScrollArea className="h-80">
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

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <AlertTitle className="text-300">{title}</AlertTitle>

                        <StatusBadge status={req.status} />
                      </div>

                      <AlertDescription className="text-200 text-muted-foreground line-clamp-1 ">
                        {req.description}
                      </AlertDescription>

                      <p className="text-100 text-muted-foreground/90 mt-1">
                        تاریخ ثبت درخواست :{formatDate(req.createdAt)}
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
