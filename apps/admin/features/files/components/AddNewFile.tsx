"use client";
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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFileSchema, uploadFileTypes } from "@repo/schema";
import { Upload } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUploadFile } from "../hooks/useUploadFile";

export default function AddNewFile() {
  const [open, setOpen] = useState(false);
  const { uploadFile, isUploading } = useUploadFile();
  const form = useForm<uploadFileTypes>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      file: File,
    },
  });
  function handleSendFile(values: uploadFileTypes) {
    const formData = new FormData();
    formData.append("file", values.file);
    uploadFile(formData, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="size-4 ml-2" />
          آپلود فایل جدید
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSendFile)}>
          <DialogHeader>
            <DialogTitle>آپلود فایل جدید</DialogTitle>
            <DialogDescription>
              فایل خود را انتخاب کنید. حداکثر حجم مجاز 10 مگابایت است.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Controller
                name="file"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>انتخاب فایل </FieldLabel>
                    <Input
                      id="file"
                      type="file"
                      name="file"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] || "")
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={isUploading}>
              آپلود فایل
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
