import { Card, CardContent, CardHeader, Separator, Badge } from "@repo/ui";

import {
  CalendarDays,
  Clock,
  ClipboardList,
  FileText,
  UserRound,
  CalendarCheck,
  AlertCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { formatDate } from "@/utils/helper";

type Props = {
  followup: any;
};

const resultConfig = {
  completed: {
    label: "موفق",
    className: "bg-green-100 text-green-700",
  },
  pending: {
    label: "نیاز به پیگیری",
    className: "bg-yellow-100 text-yellow-700",
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-red-100 text-red-700",
  },
  failed: {
    label: "بدون نتیجه",
    className: "bg-gray-100 text-gray-700",
  },
};

export default function FollowupDataBox({ followup }: Props) {
  const isCompleted = followup.isCompleted;

  const isOverdue =
    !isCompleted && new Date(followup.dueDate).getTime() < Date.now();

  const status = isCompleted
    ? {
        label: "تکمیل شده",
        icon: CheckCircle2,
        className: "bg-green-100 text-green-700",
      }
    : isOverdue
      ? {
          label: "سررسید گذشته",
          icon: AlertCircle,
          className: "bg-red-100 text-red-700",
        }
      : {
          label: "در انتظار پیگیری",
          icon: Clock3,
          className: "bg-yellow-100 text-yellow-700",
        };

  const StatusIcon = status.icon;

  const reportResult =
    resultConfig[followup.sessionReport?.result as keyof typeof resultConfig] ||
    resultConfig.failed;

  const consultant = followup.sessionReport?.consultant;

  return (
    <Card className="mt-2">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-200">
              تاریخ ثبت پیگیری: {formatDate(followup.createdAt)}
            </span>
          </div>

          <Badge className={status.className}>
            <StatusIcon className="ml-1 size-3.5" />
            {status.label}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-200">
          <CalendarDays className="size-4 text-primary" />
          <span className="font-medium">تاریخ سررسید:</span>
          <span className="text-muted-foreground">
            {formatDate(followup.dueDate)}
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4">
        {/* Followup Note */}
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-200 font-semibold">
            <ClipboardList className="size-4" />
            یادداشت پیگیری
          </h3>

          <div className="rounded-lg border-r-4 border-primary bg-muted/30 p-4">
            <p className="whitespace-pre-wrap text-200 leading-relaxed">
              {followup.note || "یادداشتی برای این پیگیری ثبت نشده است."}
            </p>
          </div>
        </div>

        <Separator />

        {/* Session Report Info */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-200 font-semibold">
              <FileText className="size-4" />
              گزارش جلسه مرتبط
            </h3>

            <Badge className={reportResult.className}>
              {reportResult.label}
            </Badge>
          </div>

          <div className="space-y-4 rounded-lg bg-muted/30 p-4">
            {/* Summary */}
            <div className="space-y-2">
              <p className="text-200 font-medium">خلاصه جلسه</p>

              <p className="whitespace-pre-wrap text-200 text-muted-foreground leading-relaxed">
                {followup.sessionReport?.summary ||
                  "خلاصه‌ای برای این جلسه ثبت نشده است."}
              </p>
            </div>

            <Separator />

            {/* Result Description */}
            <div className="space-y-2">
              <p className="text-200 font-medium">توضیحات نتیجه جلسه</p>

              <p className="whitespace-pre-wrap text-200 text-muted-foreground leading-relaxed">
                {followup.sessionReport?.resultDescription ||
                  "توضیحی درباره نتیجه جلسه ثبت نشده است."}
              </p>
            </div>

            <Separator />

            {/* Notes */}
            <div className="space-y-2">
              <p className="text-200 font-medium">یادداشت‌ها</p>

              <p className="whitespace-pre-wrap text-200 text-muted-foreground leading-relaxed">
                {followup.sessionReport?.notes ||
                  "یادداشتی برای این گزارش ثبت نشده است."}
              </p>
            </div>

            <Separator />

            {/* Consultant & Report Date */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="flex items-center gap-2 text-200">
                <UserRound className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">مشاور:</span>

                <span className="font-medium">
                  {consultant
                    ? `${consultant.firstName || ""} ${consultant.lastName || ""}`.trim()
                    : "مشخص نشده"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-200">
                <CalendarCheck className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">تاریخ ثبت گزارش:</span>

                <span className="font-medium">
                  {followup.sessionReport?.createdAt
                    ? formatDate(followup.sessionReport.createdAt)
                    : "ثبت نشده"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
