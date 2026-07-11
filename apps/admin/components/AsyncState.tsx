"use client";

import { ReactNode } from "react";
import ErrorState from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { Inbox, LucideIcon } from "lucide-react";

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
    return <ErrorState onRetry={refetch} />;
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
