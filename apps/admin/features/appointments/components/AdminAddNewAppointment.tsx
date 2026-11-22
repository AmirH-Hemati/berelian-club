"use client";

import CustomDatePicker from "@/components/CustomDatePicker";
import { TextareaFiled } from "@repo/ui";
import { Button } from "@repo/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarClock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRescheduleAppointment } from "../hooks/useRescheduleAppointment";
import AppointmentTimeSlots from "./AppointmentTimeSlots";

const rescheduleSchema = z
  .object({
    appointmentDate: z.date("تاریخ جدید الزامی است"),
    reason: z.string().optional(),
    startAt: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "ساعت شروع مشاوره معتبر نیست")
      .min(1, "ساعت مشاوره را انتخاب کنید"),
  })
  .refine(
    (data) => {
      const today = new Date();

      const appointmentDate = new Date(data.appointmentDate);
      appointmentDate.setHours(0, 0, 0, 0);

      today.setHours(0, 0, 0, 0);

      return appointmentDate >= today;
    },
    {
      message: "تاریخ مشاوره نمی‌تواند در گذشته باشد",
      path: ["appointmentDate"],
    },
  )
  .refine(
    (data) => {
      const [hour, minute] = data.startAt.split(":").map(Number);

      return hour && hour >= 9 && hour < 16 && minute === 0;
    },
    {
      message: "ساعت شروع مشاوره باید بین ۹ تا ۱۵ باشد",
      path: ["startAt"],
    },
  )
  .refine(
    (data) => {
      const now = new Date();
      const appointment = new Date(data.appointmentDate);

      const [hour, minute] = data.startAt.split(":").map(Number);

      appointment.setHours(hour as number, minute, 0, 0);

      return appointment > now;
    },
    {
      message: "زمان مشاوره باید در آینده باشد",
      path: ["startAt"],
    },
  );

type RescheduleFormValues = z.infer<typeof rescheduleSchema>;

interface AdminRescheduleAppointmentProps {
  appointmentId: string;
  userName?: string;
  currentDate: Date;
  status: string;
}

export default function AdminRescheduleAppointment({
  appointmentId,
  userName,
  status,
  currentDate,
}: AdminRescheduleAppointmentProps) {
  const [open, setOpen] = useState(false);

  const { rescheduleAppointment, isRescheduling } = useRescheduleAppointment();

  const form = useForm<RescheduleFormValues>({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: {
      appointmentDate: new Date(currentDate),
      reason: "",
      startAt: "",
    },
  });

  const handleSubmit = (values: RescheduleFormValues) => {
    rescheduleAppointment(
      {
        appointmentId,
        appointmentDate: values.appointmentDate,
        startAt: values.startAt,
        reason: values.reason,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset({
            appointmentDate: new Date(currentDate),
            reason: "",
            startAt: "",
          });
        },
      },
    );
  };

  if (status == "completed" || status == "cancelled") {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarClock className="size-4" />
          تغییر زمان
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تغییر زمان جلسه مشاوره</DialogTitle>
          <DialogDescription>
            {userName
              ? `زمان جلسه مشاوره کاربر ${userName} را تغییر دهید.`
              : "زمان جدید جلسه مشاوره را انتخاب کنید."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <CustomDatePicker
            control={form.control}
            name="appointmentDate"
            label="تاریخ و زمان جدید"
          />
          <AppointmentTimeSlots control={form.control} />
          <TextareaFiled
            control={form.control}
            label="دلیل تغییر زمان (اختیاری)"
            name="reason"
            placeholder="دلیل تغییر زمان را وارد کنید..."
          />

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
            پس از تغییر زمان، به کاربر اطلاع‌رسانی ارسال خواهد شد.
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                انصراف
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isRescheduling}>
              {isRescheduling ? (
                <>
                  <Loader2 className="size-4 ml-2 animate-spin" />
                  در حال تغییر...
                </>
              ) : (
                "تغییر زمان"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
