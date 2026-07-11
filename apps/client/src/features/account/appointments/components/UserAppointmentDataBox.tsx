"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertDate } from "@/utils/helper";
import { Calendar, Clock, FileText, Phone, Video } from "lucide-react";
import StatusBadge from "../../requests/components/StatusBadge";
import { AppointmentType } from "@repo/schema";

type Props = {
  appointment: AppointmentType;
};
export default function UserAppointmentDataBox({ appointment }: Props) {
  const isOnline = appointment.type === "online";
  const isPhone = appointment.type === "phone";

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
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">تاریخ برگزاری جلسه:</span>
              <span className="font-medium">
                {convertDate(appointment.appointmentDate)}
              </span>
            </div>
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
      </CardContent>
    </Card>
  );
}
