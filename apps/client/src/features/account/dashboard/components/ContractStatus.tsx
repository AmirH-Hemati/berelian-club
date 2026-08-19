"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
} from "@repo/ui";
import { useUser } from "@repo/auth";
import { convertDate } from "@/utils/helper";
import { FileCheck } from "lucide-react";
import { ContractStatusSkeleton } from "./ContractStatusSkeleton";

export default function ContractStatus() {
  const { user, isLoading, isError } = useUser();
  if (isLoading) return <ContractStatusSkeleton />;
  if (isError) return null;
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex items-start justify-between">
        <CardTitle className="flex items-center gap-1 text-300">
          <FileCheck />
          <span>وضعیت قرارداد</span>
        </CardTitle>

        <Badge
          variant={
            user?.contractStatus === "active" ? "outline" : "destructive"
          }
        >
          {user?.contractStatus === "active" ? "فعال" : "غیر فعال"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 text-200">
        <div className="flex justify-between ">
          <span className="text-muted-foreground">شروع قرارداد</span>
          <span>{convertDate(user?.contractStartDate)}</span>
        </div>

        <div className="flex justify-between ">
          <span className="text-muted-foreground">پایان قرارداد</span>
          <span>{convertDate(user?.contractEndDate)}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className=" text-muted-foreground">سپری شده</span>
            <span>{user?.contractProgress}%</span>
          </div>

          <Progress value={user?.contractProgress} />

          <div className="flex justify-between text-200 text-muted-foreground">
            <span>پایان</span>
            <span>{user?.contractDaysRemaining} روز باقی‌مانده</span>
            <span>شروع</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
