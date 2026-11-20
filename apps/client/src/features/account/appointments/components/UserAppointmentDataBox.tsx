"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Separator,
  StatusBadge,
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
} from "lucide-react";

import { AppointmentType } from "@repo/schema";
import { convertDate } from "@/utils/helper";
import SectionTitle from "@/features/components/SectionTitle";
import InfoItem from "@/features/components/InfoItem";
import { DeleteAppointmentDialog } from "./DeleteAppointmentDialog";

type Props = {
  appointment: AppointmentType;
};

const appointmentTypes: Record<string, string> = {
  online: "مشاوره آنلاین",
  phone: "مشاوره تلفنی",
};

export default function UserAppointmentDataBox({ appointment }: Props) {
  const isOnline = appointment.type === "online";

  const isCancelled = appointment.status === "cancelled";

  const isRescheduled =
    appointment.rescheduleReason || appointment.rescheduledBy;

  const consultant = appointment.consultant;

  return (
    <Card className="mt-2 overflow-hidden">
      {/* Header */}
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
                جزئیات نوبت مشاوره شما
              </CardDescription>
            </div>
          </div>

          <StatusBadge status={appointment.status} />
        </div>

        <div className="text-xs text-muted-foreground">
          شناسه نوبت: {appointment._id}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 pt-6">
        <section className="space-y-4">
          <SectionTitle
            icon={<CalendarDays className="size-5" />}
            title="اطلاعات جلسه مشاوره"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<CalendarDays className="size-5" />}
              label="تاریخ جلسه"
              value={convertDate(appointment.appointmentDate)}
            />

            <InfoItem
              icon={<Clock3 className="size-5" />}
              label="ساعت جلسه"
              value={
                appointment.startAt && appointment.endAt
                  ? `${appointment.startAt} تا ${appointment.endAt}`
                  : appointment.startAt || "—"
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
              label="مشاور"
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
              value={convertDate(appointment.createdAt)}
            />

            <InfoItem
              icon={<Clock3 className="size-5" />}
              label="آخرین بروزرسانی"
              value={convertDate(appointment.updatedAt)}
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
                <div className="rounded-xl bg-muted/50 p-4 space-y-2">
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
                    value={`${appointment.rescheduledBy.firstName || ""} ${
                      appointment.rescheduledBy.lastName || ""
                    }`}
                  />
                )}

                <InfoItem
                  icon={<Clock3 className="size-5" />}
                  label="تاریخ آخرین تغییر"
                  value={convertDate(appointment.updatedAt)}
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
                title="اطلاعات لغو جلسه"
              />

              {appointment.cancellationReason && (
                <div className="rounded-xl bg-muted/50 p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">دلیل لغو جلسه</p>

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
                    value={`${appointment.cancelledBy.firstName || ""} ${
                      appointment.cancelledBy.lastName || ""
                    }`}
                  />

                  <InfoItem
                    icon={<CalendarDays className="size-5" />}
                    label="تاریخ لغو"
                    value={convertDate(appointment.updatedAt)}
                  />
                </div>
              )}
            </section>
          </>
        )}
        {appointment.status === "pending" && (
          <>
            <Separator />

            <div className="flex items-center justify-between gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <div className="w-1/2 space-y-1">
                <p className="text-sm font-medium text-destructive">
                  حذف نوبت مشاوره
                </p>
                <p className="text-xs leading-6 text-muted-foreground">
                  امکان حذف نوبت مشاوره تا قبل از بررسی آن وجود دارد.
                </p>
              </div>

              <DeleteAppointmentDialog appointmentId={appointment._id} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
