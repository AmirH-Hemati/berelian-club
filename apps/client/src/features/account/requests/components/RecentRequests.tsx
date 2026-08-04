"use client";
import {
  FileQuestion,
  FileText,
  TrendingDown,
  TrendingUp,
  UserRound,
} from "lucide-react";

import AsyncState from "@/components/AsyncState";
import { CardSkeleton } from "@/components/CardSkeleton";
import {
  ScrollArea,
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { convertDate } from "@/utils/helper";
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
        <CardTitle>درخواست‌های اخیر شما</CardTitle>
      </CardHeader>
      <CardContent>
        <AsyncState
          data={requests}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="هیچ درخواستی ثبت نشده است"
          emptyDescription=" شما تاکنون هیچ درخواستی ثبت نکرده‌اید. برای شروع، اولین درخواست خود را
          ثبت کنید."
          emptyIcon={FileQuestion}
        >
          <ScrollArea className="h-80">
            {requests?.map((req: RequestType) => {
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
                        <AlertTitle className="text-300">{title}</AlertTitle>

                        <StatusBadge status={req.status} />
                      </div>

                      <AlertDescription className="text-200 text-muted-foreground line-clamp-1">
                        {req.description}
                      </AlertDescription>

                      <p className="text-100 text-muted-foreground/90 mt-1">
                        تاریخ ثبت درخواست :{convertDate(req.createdAt)}
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
