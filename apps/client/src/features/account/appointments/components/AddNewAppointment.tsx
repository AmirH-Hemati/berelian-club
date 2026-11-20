"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Field,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextareaFiled,
} from "@repo/ui";

import { Controller, useForm } from "react-hook-form";
import CustomDatePicker from "./CustomDatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAppointmentSchema, createAppointmentTypes } from "@repo/schema";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { useState } from "react";
import AppointmentTimeSlots from "./AppointmentTimeSlots";
export default function AddNewAppointment() {
  const [open, setOpen] = useState(false);

  const { createAppointment, isCreating } = useCreateAppointment();
  const form = useForm<createAppointmentTypes>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      appointmentDate: new Date(),
      startAt: "",
      description: "",
      type: "online",
    },
  });
  const handleSubmit = (values: createAppointmentTypes) => {
    createAppointment(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset({
          appointmentDate: new Date(),
          startAt: "",
          description: "",
          type: "online",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>ثبت مشاوره جدید</Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden sm:max-w-lg ">
        <DialogHeader>
          <DialogTitle> رزرو مشاوره</DialogTitle>
          <DialogDescription>
            لطفا زمان مشاوره خود را از طریق تقویم سیستم مشخص نمایید.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex min-h-0 flex-1 flex-col gap-2"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div
            className="min-h-0 flex-1 space-y-4  overflow-y-auto overflow-hidden "
            style={{ scrollbarWidth: "thin" }}
          >
            <CustomDatePicker
              control={form.control}
              name="appointmentDate"
              label="تاریخ مشاوره"
            />
            <AppointmentTimeSlots control={form.control} />
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    نوع برگزاری جلسه مشاوره
                  </FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    name="type"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب نوع مشاوره" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="online">مشاوره آنلاین </SelectItem>

                      <SelectItem value="phone">مشاوره تلفنی</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <TextareaFiled
              label="توضیحات جهت ثبت مشاوره"
              control={form.control}
              name="description"
              placeholder="توضیحات درخواست مشاوره خود را وارد کنید"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                انصراف
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isCreating}>
              ثبت مشاوره
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
