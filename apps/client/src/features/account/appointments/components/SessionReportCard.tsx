import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  Spinner,
} from "@repo/ui";

import { FileText, Clock, User } from "lucide-react";
import { convertDate } from "@/utils/helper";
import { useSessionReport } from "../hooks/useSessionReport";

const resultConfig = {
  completed: { label: "موفق", className: "bg-green-100 text-green-700" },
  pending: {
    label: "نیاز به پیگیری",
    className: "bg-yellow-100 text-yellow-700",
  },
  cancelled: { label: "لغو شد", className: "bg-red-100 text-red-700" },
  failed: { label: "بدون نتیجه", className: "bg-gray-100 text-gray-700" },
};

type Props = {
  appointmentId: string;
};
export default function SessionReportCard({ appointmentId }: Props) {
  const { sessionReport: report, isLoading } = useSessionReport(appointmentId);

  if (isLoading) return <Spinner />;
  if (!report) return null;

  const result =
    resultConfig[report.result as keyof typeof resultConfig] ||
    resultConfig.failed;

  return (
    <Card className="border-l-4 border-l-primary my-6">
      <CardHeader className="pb-2 flex flex-wrap items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <FileText className="size-4 text-primary" />
          گزارش جلسه مشاوره
        </CardTitle>
        <Badge className={result.className}>{result.label}</Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium">خلاصه جلسه</p>
          <p className="text-sm text-muted-foreground">{report.summary}</p>
        </div>

        <Separator />

        {report.resultDescription && (
          <div>
            <p className="text-sm font-medium">توضیحات نتیجه</p>
            <p className="text-sm text-muted-foreground">
              {report.resultDescription}
            </p>
          </div>
        )}

        {report.notes && (
          <div>
            <p className="text-sm font-medium">یادداشت‌ها</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {report.notes}
            </p>
          </div>
        )}

        <Separator />

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="size-3" />
            <span>
              ثبت توسط: {report.advisor?.firstName} {report.advisor?.lastName}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>تاریخ ثبت: {convertDate(report.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
