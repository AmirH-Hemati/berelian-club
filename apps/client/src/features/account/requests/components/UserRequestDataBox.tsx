"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertDate } from "@/utils/helper";
import { Clock, FileText, XCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import Typebadge from "./Typebadge";
import { typesMap } from "../data/typesMap";
import { RequestType } from "@repo/schema";

type Props = { request: RequestType };
export default function UserRequestDataBox({ request }: Props) {
  const hasRejectionReason = request.status === "cancelled";

  return (
    <Card className="mt-2 shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-sm">
              تاریخ ثبت درخواست: {convertDate(request.createdAt)}
            </span>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <Typebadge type={request.type} types={typesMap} />
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <FileText className="size-4" />
            توضیحات درخواست
          </h3>
          <div className="bg-muted/30 rounded-lg p-4 border-r-4 border-primary">
            <p className="text-sm leading-relaxed">
              {request.description || "توضیحاتی وارد نشده است"}
            </p>
          </div>
        </div>

        {hasRejectionReason && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-red-600">
              <XCircle className="size-4" />
              دلیل رد درخواست
            </h3>
            <div className="bg-red-50 rounded-lg p-4 border-r-4 border-red-500">
              <p className="text-sm leading-relaxed text-red-700">
                {/* {request.rejectionReason} */}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
