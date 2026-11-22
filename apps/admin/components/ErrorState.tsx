"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@repo/ui";
import type { AxiosError } from "axios";

type ErrorStateProps = {
  title?: string;
  description?: string;
  error?: AxiosError<{ message?: string }> | Error | null;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "مشکلی پیش آمده!",
  description = "در دریافت اطلاعات مشکلی رخ داده است.",
  error,
  onRetry,
}: ErrorStateProps) {
  const errorMessage =
    (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
    error?.message ||
    description;

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-5 rounded-2xl border border-dashed bg-card/50 px-6 py-10 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="size-8 text-destructive" />
      </div>

      <div className="max-w-md space-y-2">
        <h2 className="text-lg font-bold">{title}</h2>

        <p className="text-sm leading-7 text-muted-foreground">
          {errorMessage}
        </p>
      </div>

      {onRetry && (
        <Button onClick={onRetry} className="gap-2">
          <RefreshCw className="size-4" />
          تلاش مجدد
        </Button>
      )}
    </div>
  );
}
