"use client";

import { Card, CardContent, CardHeader, Separator, Button } from "@repo/ui";
import { convertDate } from "@/utils/helper";
import { RequestType } from "@repo/schema";
import { CircleX, Clock, FileText, MessagesSquare, UserX } from "lucide-react";
import { typesMap } from "../data/typesMap";
import Typebadge from "./Typebadge";
import Link from "next/link";

type Props = { request: RequestType };
export default function UserRequestDataBox({ request }: Props) {
  const isCancelled = request.status === "cancelled";

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-200">
              تاریخ ثبت درخواست: {convertDate(request.createdAt)}
            </span>
          </div>
          {request.status === "approved" && (
            <Link href={`/account/chat/${request._id}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <MessagesSquare /> گفتگو
              </Button>
            </Link>
          )}
        </div>

        <Typebadge type={request.type} types={typesMap} />
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-300 font-semibold flex items-center gap-2">
            <FileText className="size-4" />
            توضیحات درخواست
          </h3>
          <div className="bg-muted/30 rounded-lg p-4 border-r-4 border-primary">
            <p className="text-300 leading-relaxed">
              {request.description || "توضیحاتی وارد نشده است"}
            </p>
          </div>
        </div>

        {isCancelled && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <CircleX className="size-5" />
              <h4 className="font-semibold text-300">درخواست کنسل شده</h4>
            </div>

            {request.cancellationReason && (
              <div className="pr-7">
                <p className="text-300 text-red-700 dark:text-red-300 leading-relaxed">
                  {request.cancellationReason}
                </p>
              </div>
            )}

            {request.cancelledBy && (
              <div className="flex items-center gap-1 pr-7 text-200 text-red-500 dark:text-red-400/70">
                <UserX className="size-3.5" />
                <span>
                  کنسل شده توسط:{""}
                  <span className="font-medium">
                    {request.cancelledBy?.firstName || "کاربر"}{" "}
                    {request.cancelledBy?.lastName || ""}
                  </span>
                </span>
                <span className="w-1 h-1 rounded-full bg-red-300 dark:bg-red-600" />
                <span>{convertDate(request.updatedAt)}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
