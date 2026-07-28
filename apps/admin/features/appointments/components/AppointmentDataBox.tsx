import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  Video
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

  return (
    <Card className="mt-2">
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-sm">
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
          <span className="text-sm">
            {isOnline ? "مشاوره آنلاین" : "مشاوره تلفنی"}
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <User className="size-4" />
            اطلاعات کاربر
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm bg-muted/20 rounded-lg px-3 py-2">
              <User className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">نام:</span>
              <span className="font-medium">
                {appointment.user?.firstName}
                {appointment.user?.lastName || "نامشخص"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm bg-muted/20 rounded-lg px-3 py-2">
              <Phone className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">موبایل:</span>
              <span className="font-medium dir-ltr">
                {appointment.user?.phoneNumber || "نامشخص"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm bg-muted/20 rounded-lg px-3 py-2">
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
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Calendar className="size-4" />
            اطلاعات جلسه مشاوره
          </h3>

          <div className="grid grid-cols-1 gap-3 bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">تاریخ و زمان:</span>
              <span className="font-medium">
                {formatDate(appointment.appointmentDate)}
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

      <Separator />
      <CardFooter className="flex gap-2 w-full justify-end">
        <RejectAppointmentDialog appointmentId={appointment._id}/>
        {(appointment.status === "pending" ||
          appointment.status === "cancelled") && (
          <Button
            onClick={() => approveAppointment(appointment._id)}
            disabled={isPending}
            className="w-1/2 md:w-fit"
          >
            <CheckCircle className="size-4" />
            تایید جلسه
          </Button>
        )}
        {appointment.status === "approved" && (
          <Button
            onClick={() => completeAppointment(appointment._id)}
            disabled={isPending}
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
