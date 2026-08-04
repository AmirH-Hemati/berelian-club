"use client";

import { ReactNode } from "react";
import { EmptyState } from "@/components/EmptyState";
import { AlertTriangle, Inbox, LucideIcon, RefreshCw } from "lucide-react";
import { Button } from "@repo/ui";

type AsyncStateProps<T> = {
  isLoading: boolean;
  isError: boolean;
  data: T[] | undefined;
  loading: ReactNode;
  children: ReactNode;
  refetch?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: LucideIcon;
};

export default function AsyncState<T>({
  isLoading,
  isError,
  data,
  loading,
  children,
  refetch,
  emptyTitle = "اطلاعاتی وجود ندارد",
  emptyDescription = "در حال حاضر اطلاعاتی برای نمایش وجود ندارد",
  emptyIcon = Inbox,
}: AsyncStateProps<T>) {
  if (isLoading) return <>{loading}</>;

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <div className=" flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold">
            خطا در برقراری ارتباط با سرور
          </h2>

          <p className="max-w-sm text-sm text-muted-foreground">
            ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.
          </p>
        </div>

        {refetch && (
          <Button onClick={refetch}>
            <RefreshCw className="ml-2 h-4 w-4" />
            تلاش مجدد
          </Button>
        )}
      </div>
    );
  }

  if (!data?.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
      />
    );
  }

  return <>{children}</>;
}
