"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  FileQuestion,
  FileText,
  TrendingDown,
  TrendingUp,
  UserRound,
} from "lucide-react";

import Spinner from "@/components/PageSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/helper";
import { useUserRequests } from "../hooks/useUserRequests";
import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";
import { RequestType } from "@repo/schema";
import AsyncState from "@/components/AsyncState";
import { CardSkeleton } from "@/components/CardSkeleton";

export const typesMap = {
  consultation: {
    label: "مشاوره با مدیر سبد",
    icon: UserRound,
  },
  renew_contract: {
    label: "تمدید قرار داد",
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

type Props = { userId: string };
export default function UserRequestsList({ userId }: Props) {
  const { requests, isLoading, isError, refetch } = useUserRequests(userId);
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>درخواست‌های اخیر کاربر</CardTitle>
      </CardHeader>
      <CardContent>
        <AsyncState
          data={requests}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="هیچ درخواستی ثبت نشده است"
          emptyDescription="کاربر هنوز درخواستی ثبت نکرده است."
          emptyIcon={FileQuestion}
        >
          <ScrollArea className="h-80">
            {requests.map((req: RequestType) => {
              const title = typesMap[req.type as keyof typeof typesMap].label;
              const Icon = typesMap[req.type as keyof typeof typesMap].icon;
              return (
                <Alert
                  key={req._id}
                  className="mb-3 cursor-pointer group hover:border-primary/40"
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

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          تاریخ ثبت درخواست :{formatDate(req.createdAt)}
                        </p>
                        <div className="hidden group-hover:flex gap-1 text-xs group-hover: items-center">
                          مشاهده جزعیات
                          <ArrowLeft className="size-4" />
                        </div>
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
