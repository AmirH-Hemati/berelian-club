"use client";

import CustomDatePicker from "@/components/CustomDatePicker";
import TextareaFiled from "@/components/TextareaFiled";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarClock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRescheduleAppointment } from "../hooks/useRescheduleAppointment";

const rescheduleSchema = z.object({
  newDate: z.date({ error: "تاریخ جدید الزامی است" }),
  reason: z.string().optional(),
});

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
      newDate: new Date(currentDate),
      reason: "",
    },
  });

  const handleSubmit = (values: RescheduleFormValues) => {
    rescheduleAppointment(
      {
        appointmentId,
        newDate: values.newDate,
        reason: values.reason,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset({
            newDate: new Date(),
            reason: "",
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
            name="newDate"
            label="تاریخ و زمان جدید"
          />

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
