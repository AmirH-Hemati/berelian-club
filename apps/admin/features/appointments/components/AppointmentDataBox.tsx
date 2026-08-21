import { Button } from "@repo/ui";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui";
import { Separator } from "@repo/ui";
import { formatDate } from "@/utils/helper";
import { AppointmentType } from "@repo/schema";
import {
  Calendar,
  Check,
  CheckCircle,
  Clock,
  FileText,
  Phone,
  User,
  Video,
  CircleX,
  UserX,
  ClockArrowUp,
} from "lucide-react";
import { useApproveAppointment } from "../hooks/useApproveAppointment";
import { useCompleteAppointment } from "../hooks/useCompleteAppointment";
import AdminRescheduleAppointment from "./AdminAddNewAppointment";
import { RejectAppointmentDialog } from "./RejectAppointmentDialog";
import SessionReportDialog from "./SessionReportDialog";

type Props = { appointment: AppointmentType };
export default function AppointmentDataBox({ appointment }: Props) {
  const isOnline = appointment.type === "online";
  const isPhone = appointment.type === "phone";
  const { approveAppointment, isPending } = useApproveAppointment();
  const { completeAppointment, isPending: isPending3 } =
    useCompleteAppointment();

  const isCancelled = appointment.status === "cancelled";
  const isRescheduled =
    appointment.rescheduleReason || appointment.rescheduledBy;

  return (
    <Card className="mt-2">
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-200">
              تاریخ ثبت درخواست مشاوره: {formatDate(appointment.createdAt)}
            </span>
          </div>
          <AdminRescheduleAppointment
            appointmentId={appointment._id}
            userName={`${appointment.user.firstName} ${appointment.user.lastName}`}
            currentDate={appointment.appointmentDate}
            status={appointment.status}
          />
        </div>

        <div className="flex items-center gap-2">
          {isOnline && <Video className="size-4 text-purple-600" />}
          {isPhone && <Phone className="size-4 text-blue-600" />}
          <span className="text-200">
            {isOnline ? "مشاوره آنلاین" : "مشاوره تلفنی"}
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-200 font-semibold flex items-center gap-2">
            <User className="size-4" />
            اطلاعات کاربر
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg">
            <div className="flex items-center gap-2 text-200 bg-muted/20 rounded-lg px-3 py-2">
              <User className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">نام:</span>
              <span className="font-medium">
                {appointment.user?.firstName}{" "}
                {appointment.user?.lastName || "نامشخص"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-200 bg-muted/20 rounded-lg px-3 py-2">
              <Phone className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">موبایل:</span>
              <span className="font-medium dir-ltr">
                {appointment.user?.phoneNumber || "نامشخص"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-200 bg-muted/20 rounded-lg px-3 py-2">
              <FileText className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">کد ملی:</span>
              <span className="font-medium font-mono">
                {appointment.user?.nationalCode || "نامشخص"}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-200 font-semibold flex items-center gap-2">
            <Calendar className="size-4" />
            اطلاعات جلسه مشاوره
          </h3>

          <div className="grid grid-cols-1 gap-3 bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-200">
              <Calendar className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">تاریخ و زمان:</span>
              <span className="font-medium">
                {formatDate(appointment.appointmentDate)}
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
          <h3 className="text-200 font-semibold flex items-center gap-2">
            <FileText className="size-4" />
            توضیحات درخواست
          </h3>
          <div className="bg-muted/30 rounded-lg p-4 border-r-4 border-primary">
            <p className="text-200 leading-relaxed">
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
                <span>{formatDate(appointment.updatedAt)}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <Separator />
      <CardFooter className="flex gap-2 w-full justify-end">
        {appointment.status === "pending" && (
          <>
            <RejectAppointmentDialog appointmentId={appointment._id} />
            <Button
              onClick={() => approveAppointment(appointment._id)}
              disabled={isPending}
              className="w-1/2 md:w-fit"
            >
              <CheckCircle className="size-4" />
              تایید جلسه
            </Button>
          </>
        )}
        {appointment.status === "approved" && (
          <Button
            onClick={() => completeAppointment(appointment._id)}
            disabled={isPending3}
            className="w-1/2 md:w-fit"
          >
            <Check className="size-4" />
            جلسه انجام شد
          </Button>
        )}
        {appointment.status === "completed" && (
          <SessionReportDialog
            appointmentId={appointment._id}
            userName={`${appointment.user.firstName} ${appointment.user.lastName}`}
            userId={appointment.user._id}
          />
        )}
      </CardFooter>
    </Card>
  );
}
