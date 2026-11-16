import {
  Card,
  CardContent,
  CardHeader,
  Separator,
  Badge,
  Button,
} from "@repo/ui";

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
import { useCompleteFollowUp } from "../hooks/useCompleteFollowUp";

type FollowupStatus = "pending" | "completed" | "cancelled";

type Props = {
  followup: {
    _id: string;
    sessionReport?: {
      consultant?: {
        firstName?: string;
        lastName?: string;
      };
      summary?: string;
      result?: "completed" | "pending" | "cancelled" | "failed";
      resultDescription?: string;
      notes?: string;
      createdAt?: string;
    };
    dueDate: string;
    note?: string;
    status: FollowupStatus;
    createdAt: string;
    updatedAt: string;
  };
};

const statusConfig = {
  pending: {
    label: "در انتظار پیگیری",
    icon: Clock3,
    className: "bg-yellow-100 text-yellow-700",
  },
  completed: {
    label: "تکمیل شده",
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700",
  },
  cancelled: {
    label: "لغو شده",
    icon: AlertCircle,
    className: "bg-red-100 text-red-700",
  },
};

export default function FollowupDataBox({ followup }: Props) {
  const { completeFollowUps, isCompleting } = useCompleteFollowUp();

  const status = statusConfig[followup.status];
  const StatusIcon = status.icon;

  const sessionReport = followup.sessionReport;
  const consultant = sessionReport?.consultant;

  const consultantName = consultant
    ? `${consultant.firstName || ""} ${consultant.lastName || ""}`.trim()
    : "";

  const handleCompleteFollowUp = () => {
    completeFollowUps(followup._id);
  };

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

        {/* Session Report Info */}
        {sessionReport && Object.keys(sessionReport).length > 0 && (
          <>
            <Separator />

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-200 font-semibold">
                  <FileText className="size-4" />
                  گزارش جلسه مرتبط
                </h3>
              </div>

              <div className="space-y-4 rounded-lg bg-muted/30 p-4">
                {/* Summary */}
                <div className="space-y-2">
                  <p className="text-200 font-medium">خلاصه جلسه</p>

                  <p className="whitespace-pre-wrap text-200 text-muted-foreground leading-relaxed">
                    {sessionReport.summary ||
                      "خلاصه‌ای برای این جلسه ثبت نشده است."}
                  </p>
                </div>

                <Separator />

                {/* Result Description */}
                <div className="space-y-2">
                  <p className="text-200 font-medium">توضیحات نتیجه جلسه</p>

                  <p className="whitespace-pre-wrap text-200 text-muted-foreground leading-relaxed">
                    {sessionReport.resultDescription ||
                      "توضیحی درباره نتیجه جلسه ثبت نشده است."}
                  </p>
                </div>

                <Separator />

                {/* Notes */}
                <div className="space-y-2">
                  <p className="text-200 font-medium">یادداشت‌ها</p>

                  <p className="whitespace-pre-wrap text-200 text-muted-foreground leading-relaxed">
                    {sessionReport.notes ||
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
                      {consultantName || "مشخص نشده"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-200">
                    <CalendarCheck className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      تاریخ ثبت گزارش:
                    </span>

                    <span className="font-medium">
                      {sessionReport.createdAt
                        ? formatDate(sessionReport.createdAt)
                        : "ثبت نشده"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {followup.status === "pending" && (
          <>
            <Separator />

            <div className="flex justify-end">
              <Button
                onClick={handleCompleteFollowUp}
                disabled={isCompleting}
                className="gap-2"
              >
                <CheckCircle2 className="size-4" />
                {isCompleting ? "در حال تکمیل..." : "تکمیل پیگیری"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
