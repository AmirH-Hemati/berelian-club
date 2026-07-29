"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertDate } from "@/utils/helper";
import {
  Calendar,
  CircleX,
  Clock,
  ClockArrowUp,
  FileText,
  Phone,
  UserX,
  Video,
} from "lucide-react";
import StatusBadge from "../../requests/components/StatusBadge";
import { AppointmentType } from "@repo/schema";

type Props = {
  appointment: AppointmentType;
};
export default function UserAppointmentDataBox({ appointment }: Props) {
  const isOnline = appointment.type === "online";
  const isPhone = appointment.type === "phone";

  const isCancelled = appointment.status === "cancelled";
  const isRescheduled =
    appointment.rescheduleReason || appointment.rescheduledBy;

  return (
    <Card className="mt-2">
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-sm">
              تاریخ ثبت درخواست: {convertDate(appointment.createdAt)}
            </span>
          </div>
          <StatusBadge status={appointment.status} />
        </div>

        <div className="flex items-center gap-2">
          {isOnline && <Video className="size-4 text-purple-600" />}
          {isPhone && <Phone className="size-4 text-blue-600" />}
          <span className="text-sm">
            {isOnline ? "مشاوره آنلاین" : "مشاوره تلفنی"}
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Calendar className="size-4" />
            اطلاعات جلسه مشاوره
          </h3>

          <div className="grid grid-cols-1 gap-3 bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-200">
              <Calendar className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">تاریخ و زمان:</span>
              <span className="font-medium">
                {convertDate(appointment.appointmentDate)}
              </span>
            </div>

            {isRescheduled && (
              <div>
                <div className="flex items-start gap-2 text-200 text-yellow-600 dark:text-yellow-400 border-t border-yellow-200 dark:border-yellow-800 pt-3 mt-1">
                  <ClockArrowUp className="size-4 shrink-0" />
                  <span className="text-muted-foreground">تغییر زمان:</span>
                  {appointment.rescheduleReason && (
                    <span className="text-200">
                      {appointment.rescheduleReason}
                    </span>
                  )}
                </div>
                <span className="text-muted-foreground">
                  جلسه توسط تغییر کرد :
                </span>
                {appointment.rescheduledBy && (
                  <span className="text-100 text-muted-foreground/70">
                    {appointment.rescheduledBy?.firstName || ""}{" "}
                    {appointment.rescheduledBy?.lastName || ""}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <FileText className="size-4" />
            توضیحات درخواست
          </h3>
          <div className="bg-muted/30 rounded-lg p-4 border-r-4 border-primary">
            <p className="text-sm leading-relaxed">
              {appointment.description || "توضیحاتی وارد نشده است"}
            </p>
          </div>
        </div>

        {isCancelled && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <CircleX className="size-5" />
              <h4 className="font-semibold text-200">جلسه کنسل شده</h4>
            </div>

            {appointment.cancellationReason && (
              <div className="pr-7">
                <p className="text-200 text-red-700 dark:text-red-300 leading-relaxed">
                  {appointment.cancellationReason}
                </p>
              </div>
            )}

            {appointment.cancelledBy && (
              <div className="flex items-center gap-2 pr-7 text-200 text-red-500 dark:text-red-400/70">
                <UserX className="size-3.5" />
                <span>
                  کنسل شده توسط:{" "}
                  <span className="font-medium">
                    {appointment.cancelledBy?.firstName || ""}{" "}
                    {appointment.cancelledBy?.lastName || ""}
                  </span>
                </span>
                <span className="w-1 h-1 rounded-full bg-red-300 dark:bg-red-600" />
                <span>{convertDate(appointment.updatedAt)}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
