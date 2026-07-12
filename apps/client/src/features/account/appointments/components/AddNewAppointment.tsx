"use client";

import { FormField } from "@/components/FormField";
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import CustomDatePicker from "./CustomDatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAppointmentSchema, createAppointmentTypes } from "@repo/schema";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
export default function AddNewAppointment() {
  const { createAppointment, isCreating } = useCreateAppointment();
  const form = useForm<createAppointmentTypes>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      appointmentDate: new Date(),
      description: "",
      type: "online",
    },
  });
  const handleSubmit = (values: createAppointmentTypes) => {
    createAppointment(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>ثبت مشاوره جدید</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle> رزرو مشاوره</DialogTitle>
          <DialogDescription>
            لطفا زمان مشاوره خود را از طریق تقویم سیستم مشخص نمایید.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <CustomDatePicker
            control={form.control}
            name="appointmentDate"
            label="تاریخ مشاوره"
          />

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

          <FormField
            control={form.control}
            label="توضیحات جهت ثبت مشاوره"
            name="description"
          >
            <Textarea
              id="description"
              rows={6}
              className="placeholder:text-xs"
              placeholder="توضیحات درخواست خود را وارد کنید"
            />
          </FormField>

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
