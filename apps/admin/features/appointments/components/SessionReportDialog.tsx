"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import CustomDatePicker from "@/components/CustomDatePicker";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FilePenLine, Files } from "lucide-react";
import TextareaFiled from "@/components/TextareaFiled";
import { SessionReportFormValues, sessionReportSchema } from "@repo/schema";
import { useCreateSessionReport } from "../hooks/useCreateSessionReport";

interface SessionReportDialogProps {
  appointmentId: string;
  userId: string;
  userName?: string;
}

export default function SessionReportDialog({
  appointmentId,
  userId,
  userName,
}: SessionReportDialogProps) {
  const [open, setOpen] = useState(false);
  const { createSessionReport, isPending: isCreating } =
    useCreateSessionReport();

  const form = useForm<SessionReportFormValues>({
    resolver: zodResolver(sessionReportSchema),
    defaultValues: {
      appointment: appointmentId,
      userId: userId,
      summary: "",
      result: "pending",
      resultDescription: "",
      notes: "",
      needFollowUp: false,
      followUpDate: undefined,
      followUpAction: undefined,
    },
  });

  const needFollowUp = form.watch("needFollowUp");

  function onSubmit(values: SessionReportFormValues) {
    createSessionReport(
      { ...values, appointment: appointmentId, userId },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Files className="size-4" />
          ثبت گزارش جلسه
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ثبت گزارش جلسه مشاوره</DialogTitle>
          <DialogDescription>
            {userName
              ? `گزارش جلسه ${userName}`
              : "اطلاعات جلسه برگزار شده را ثبت کنید."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
          <FormField
            icon={FilePenLine}
            control={form.control}
            label="خلاصه جلسه"
            name="summary"
            placeholder="خلاصه‌ای از مباحث مطرح شده در جلسه..."
          />

          <Controller
            name="result"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="result">نتیجه جلسه</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid} id="result">
                    <SelectValue placeholder="انتخاب نتیجه جلسه" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed"> موفق</SelectItem>
                    <SelectItem value="pending"> نیاز به پیگیری</SelectItem>
                    <SelectItem value="cancelled"> لغو شد</SelectItem>
                    <SelectItem value="failed"> بدون نتیجه</SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FormField
            icon={FilePenLine}
            control={form.control}
            label="توضیحات نتیجه"
            name="resultDescription"
            placeholder="مثلاً: مشتری با شرایط جدید موافقت کرد..."
          />
          <TextareaFiled
            name="notes"
            control={form.control}
            label="نتیجه جلسه"
            placeholder="جزئیات کامل جلسه، نکات مهم، تصمیمات گرفته شده..."
          />

          <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/30">
            <div>
              <Label className="font-medium">نیاز به پیگیری</Label>
              <p className="text-sm text-muted-foreground">
                در صورت نیاز برای این جلسه پیگیری ثبت می‌شود.
              </p>
            </div>
            <Switch
              checked={needFollowUp}
              onCheckedChange={(checked) =>
                form.setValue("needFollowUp", checked)
              }
            />
          </div>

          {needFollowUp && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/10">
              <h4 className="text-sm font-medium">اطلاعات پیگیری</h4>

              <CustomDatePicker
                control={form.control}
                name="followUpDate"
                label="تاریخ پیگیری"
              />

              <TextareaFiled
                name="followUpAction"
                control={form.control}
                label="اقدام بعدی"
                placeholder="مثلاً: تماس مجدد با مشتری و ارسال پیش‌فاکتور..."
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "در حال ثبت..." : "ثبت گزارش"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
