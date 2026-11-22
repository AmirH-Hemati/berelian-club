"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
  Button,
  SectionTitle,
  InfoItem,
} from "@repo/ui";

import {
  FileText,
  Clock,
  User,
  XCircle,
  ClipboardList,
  MessageSquareText,
  CalendarDays,
  History,
} from "lucide-react";

import { formatDate } from "@/utils/helper";
import { useSessionReport } from "../hooks/useSessionReport";
import { useDeleteReportSession } from "../hooks/useDeleteReportSession";
import Spinner from "@/components/PageSpinner";

type Props = {
  appointmentId: string;
};

export default function SessionReportCard({ appointmentId }: Props) {
  const { sessionReport: report, isLoading } = useSessionReport(appointmentId);

  const { deleteSessionReport, isDeleting } =
    useDeleteReportSession(appointmentId);

  if (isLoading) return <Spinner />;

  if (!report) return null;

  const consultantName = [
    report.consultant?.firstName,
    report.consultant?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card className="my-6 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="size-5 text-primary" />
          گزارش جلسه مشاوره
        </CardTitle>

        <CardDescription>جزئیات و نتیجه جلسه برگزارشده</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 pt-6">
        {/* Session Summary */}
        <section className="space-y-4">
          <SectionTitle
            icon={<ClipboardList className="size-5" />}
            title="خلاصه جلسه"
          />

          <InfoItem
            icon={<FileText className="size-4" />}
            label="خلاصه جلسه"
            value={report.summary || "ثبت نشده است"}
          />
        </section>

        {/* Result Description */}
        {report.resultDescription && (
          <>
            <Separator />

            <section className="space-y-4">
              <SectionTitle
                icon={<MessageSquareText className="size-5" />}
                title="توضیحات نتیجه جلسه"
              />

              <InfoItem
                icon={<MessageSquareText className="size-4" />}
                label="نتیجه جلسه"
                value={report.resultDescription}
              />
            </section>
          </>
        )}

        {/* Notes */}
        {report.notes && (
          <>
            <Separator />

            <section className="space-y-4">
              <SectionTitle
                icon={<FileText className="size-5" />}
                title="یادداشت‌ها"
              />

              <InfoItem
                icon={<ClipboardList className="size-4" />}
                label="یادداشت‌های مشاور"
                value={report.notes}
              />
            </section>
          </>
        )}

        <Separator />

        {/* Report Metadata */}
        <section className="space-y-4">
          <SectionTitle
            icon={<User className="size-5" />}
            title="اطلاعات ثبت گزارش"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem
              icon={<User className="size-4" />}
              label="ثبت‌کننده گزارش"
              value={consultantName || "—"}
            />

            <InfoItem
              icon={<CalendarDays className="size-4" />}
              label="تاریخ ثبت"
              value={formatDate(report.createdAt)}
            />

            {report.updatedAt && report.updatedAt !== report.createdAt && (
              <InfoItem
                icon={<History className="size-4" />}
                label="آخرین ویرایش"
                value={formatDate(report.updatedAt)}
              />
            )}
          </div>
        </section>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-end py-4">
        <Button
          variant="destructive"
          onClick={() => deleteSessionReport(report._id)}
          disabled={isDeleting}
        >
          <XCircle className="size-4" />
          {isDeleting ? "در حال حذف..." : "حذف گزارش جلسه"}
        </Button>
      </CardFooter>
    </Card>
  );
}
