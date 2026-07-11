"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "خطا در دریافت اطلاعات",
  description = "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>

      <div className=" flex flex-col items-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>

      {onRetry && (
        <Button onClick={onRetry}>
          <RefreshCw className="ml-2 h-4 w-4" />
          تلاش مجدد
        </Button>
      )}
    </div>
  );
}
