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
import { zodResolver } from "@hookform/resolvers/zod";
import { createRequestSchema, CreateRequestTypes } from "@repo/schema";
import { Controller, useForm } from "react-hook-form";
import { useCreateRequest } from "../hooks/useCreateRequest";

export default function AddNewRequest() {
  const { createRequest, isCreating } = useCreateRequest();
  const form = useForm<CreateRequestTypes>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      type: "consultation",
      description: "",
    },
  });

  function handleSubmit(values: CreateRequestTypes) {
    createRequest(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>ثبت درخواست جدید</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ثبت درخواست</DialogTitle>
          <DialogDescription>
            لطفاً نوع درخواست و جزئیات آن را وارد کنید.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" mt-4 flex flex-col gap-4"
        >
          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>نوع درخواست</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  name="type"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب نوع درخواست" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="consultation">
                      مشاوره با مدیر سبد
                    </SelectItem>
                    <SelectItem value="renew_contract">
                      تمدید قرارداد
                    </SelectItem>
                    <SelectItem value="increase_capital">
                      افزایش سرمایه
                    </SelectItem>
                    <SelectItem value="decrease_capital">
                      کاهش سرمایه
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FormField control={form.control} label="توضیحات" name="description">
            <Textarea
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
              ثبت درخواست
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
