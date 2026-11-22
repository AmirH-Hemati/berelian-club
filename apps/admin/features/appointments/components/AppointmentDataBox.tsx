"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
  StatusBadge,
  Button,
  SectionTitle,
  InfoItem,
} from "@repo/ui";

import {
  CalendarDays,
  Clock3,
  FileText,
  Phone,
  Video,
  UserRound,
  UserCheck,
  ClockArrowUp,
  CircleX,
  CalendarCheck,
  Link2,
  UserX,
  CalendarPlus,
  Check,
  CheckCircle,
  ShieldCheck,
  IdCard,
} from "lucide-react";

import { AppointmentType } from "@repo/schema";
import { formatDate } from "@/utils/helper";

import { useApproveAppointment } from "../hooks/useApproveAppointment";
import { useCompleteAppointment } from "../hooks/useCompleteAppointment";

import AdminRescheduleAppointment from "./AdminAddNewAppointment";
import { RejectAppointmentDialog } from "./RejectAppointmentDialog";
import SessionReportDialog from "./SessionReportDialog";

type Props = {
  appointment: AppointmentType;
};

const appointmentTypes: Record<string, string> = {
  online: "مشاوره آنلاین",
  phone: "مشاوره تلفنی",
};

const contractStatuses: Record<string, string> = {
  active: "فعال",
  expired: "منقضی شده",
};

export default function AppointmentDataBox({ appointment }: Props) {
  const isOnline = appointment.type === "online";
  const isCancelled = appointment.status === "cancelled";

  const isRescheduled =
    appointment.rescheduleReason || appointment.rescheduledBy;

  const { approveAppointment, isPending } = useApproveAppointment();

  const { completeAppointment, isPending: isPendingComplete } =
    useCompleteAppointment();

  const investor = appointment.investor;
  const consultant = appointment.consultant;

  return (
    <Card className="mt-2 overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {isOnline ? (
                <Video className="size-5" />
              ) : (
                <Phone className="size-5" />
              )}
            </div>

            <div>
              <CardTitle className="text-lg">
                {appointmentTypes[appointment.type] || "نوبت مشاوره"}
              </CardTitle>

              <CardDescription className="mt-1">
                جزئیات مدیریتی نوبت مشاوره
              </CardDescription>
            </div>
          </div>

          {["pending", "approved"].includes(appointment.status) && (
            <AdminRescheduleAppointment
              appointmentId={appointment._id}
              userName={`${investor.firstName} ${investor.lastName}`}
              currentDate={appointment.appointmentDate}
              status={appointment.status}
            />
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            شناسه نوبت: {appointment._id.slice(0, 6)}
          </p>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 pt-6">
        <section className="space-y-4">
          <SectionTitle
            icon={<UserRound className="size-5" />}
            title="اطلاعات سرمایه‌گذار"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<UserRound className="size-5" />}
              label="نام و نام خانوادگی"
              value={`${investor?.firstName || ""} ${investor?.lastName || ""}`}
            />

            <InfoItem
              icon={<Phone className="size-5" />}
              label="شماره موبایل"
              value={investor?.phoneNumber || "ثبت نشده"}
            />

            <InfoItem
              icon={<IdCard className="size-5" />}
              label="کد ملی"
              value={investor?.nationalCode || "ثبت نشده"}
            />
            <InfoItem
              icon={<CalendarCheck className="size-5" />}
              label="وضعیت قرارداد"
              value={
                contractStatuses[investor?.contractStatus ?? ""] || "نامشخص"
              }
            />
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <SectionTitle
            icon={<CalendarDays className="size-5" />}
            title="اطلاعات جلسه مشاوره"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<CalendarDays className="size-5" />}
              label="تاریخ جلسه"
              value={formatDate(appointment.appointmentDate)}
            />

            <InfoItem
              icon={<Clock3 className="size-5" />}
              label="ساعت جلسه"
              value={
                appointment.startAt && appointment.endAt
                  ? `${appointment.startAt} تا ${appointment.endAt}`
                  : appointment.startAt || "ثبت نشده"
              }
            />

            <InfoItem
              icon={
                isOnline ? (
                  <Video className="size-5" />
                ) : (
                  <Phone className="size-5" />
                )
              }
              label="نوع مشاوره"
              value={appointmentTypes[appointment.type] || "نامشخص"}
            />

            <InfoItem
              icon={<UserCheck className="size-5" />}
              label="مشاور اختصاص‌یافته"
              value={
                consultant
                  ? `${consultant.firstName} ${consultant.lastName}`
                  : "هنوز مشاوری تعیین نشده است"
              }
            />

            {appointment.meetingLink && (
              <InfoItem
                icon={<Link2 className="size-5" />}
                label="لینک جلسه"
                value={
                  <a
                    href={appointment.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    ورود به جلسه
                  </a>
                }
              />
            )}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <SectionTitle
            icon={<FileText className="size-5" />}
            title="توضیحات درخواست"
          />

          <div className="rounded-xl bg-muted/50 p-4">
            <p className="text-sm leading-7">
              {appointment.description || "توضیحاتی ثبت نشده است."}
            </p>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <SectionTitle
            icon={<CalendarCheck className="size-5" />}
            title="اطلاعات ثبت نوبت"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<CalendarPlus className="size-5" />}
              label="تاریخ ثبت درخواست"
              value={formatDate(appointment.createdAt)}
            />

            <InfoItem
              icon={<Clock3 className="size-5" />}
              label="آخرین بروزرسانی"
              value={formatDate(appointment.updatedAt)}
            />
          </div>
        </section>

        {isRescheduled && (
          <>
            <Separator />

            <section className="space-y-4">
              <SectionTitle
                icon={<ClockArrowUp className="size-5" />}
                title="اطلاعات تغییر زمان"
              />

              {appointment.rescheduleReason && (
                <div className="space-y-2 rounded-xl bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    دلیل تغییر زمان
                  </p>

                  <p className="text-sm leading-7">
                    {appointment.rescheduleReason}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {appointment.rescheduledBy && (
                  <InfoItem
                    icon={<UserRound className="size-5" />}
                    label="تغییر داده شده توسط"
                    value={`${appointment.rescheduledBy.firstName || ""} ${appointment.rescheduledBy.lastName || ""}`}
                  />
                )}

                <InfoItem
                  icon={<Clock3 className="size-5" />}
                  label="تاریخ آخرین تغییر"
                  value={formatDate(appointment.updatedAt)}
                />
              </div>
            </section>
          </>
        )}

        {isCancelled && (
          <>
            <Separator />

            <section className="space-y-4">
              <SectionTitle
                icon={<CircleX className="size-5" />}
                title="اطلاعات لغو نوبت"
              />

              {appointment.cancellationReason && (
                <div className="space-y-2 rounded-xl bg-destructive/5 p-4">
                  <p className="text-sm text-muted-foreground">دلیل لغو نوبت</p>

                  <p className="text-sm leading-7">
                    {appointment.cancellationReason}
                  </p>
                </div>
              )}

              {appointment.cancelledBy && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InfoItem
                    icon={<UserX className="size-5" />}
                    label="لغو شده توسط"
                    value={`${appointment.cancelledBy.firstName || ""} ${appointment.cancelledBy.lastName || ""}`}
                  />

                  <InfoItem
                    icon={<CalendarDays className="size-5" />}
                    label="تاریخ لغو"
                    value={formatDate(appointment.updatedAt)}
                  />
                </div>
              )}
            </section>
          </>
        )}

        {appointment.status === "completed" && (
          <>
            <Separator />

            <section className="space-y-4">
              <SectionTitle
                icon={<ShieldCheck className="size-5" />}
                title="وضعیت جلسه"
              />

              <div className="rounded-xl bg-primary/5 p-4">
                <p className="text-sm leading-7 text-muted-foreground">
                  این جلسه با موفقیت تکمیل شده است. در صورت ثبت گزارش جلسه،
                  می‌توانید آن را مشاهده کنید.
                </p>
              </div>
            </section>
          </>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-wrap justify-end gap-2">
        {appointment.status === "pending" && (
          <>
            <RejectAppointmentDialog appointmentId={appointment._id} />

            <Button
              onClick={() => approveAppointment(appointment._id)}
              disabled={isPending}
            >
              <CheckCircle className="size-4" />
              تایید جلسه
            </Button>
          </>
        )}

        {appointment.status === "approved" && (
          <Button
            onClick={() => completeAppointment(appointment._id)}
            disabled={isPendingComplete}
          >
            <Check className="size-4" />
            جلسه انجام شد
          </Button>
        )}

        {appointment.status === "completed" && (
          <SessionReportDialog
            appointmentId={appointment._id}
            userName={`${investor.firstName} ${investor.lastName}`}
            userId={investor._id}
          />
        )}
      </CardFooter>
    </Card>
  );
}
