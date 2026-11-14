"use client";

import type { LucideIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <Empty className="min-h-[260px] rounded-xl border border-dashed border-border/70 bg-muted/20 px-5 py-10">
      <EmptyHeader className="max-w-sm items-center gap-3">
        <EmptyMedia
          variant="icon"
          className="mb-1 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/[0.03]"
        >
          <Icon className="size-7" strokeWidth={1.7} />
        </EmptyMedia>

        <EmptyTitle >
          {title}
        </EmptyTitle>

        <EmptyDescription className="text-center text-200
         leading-7 text-muted-foreground">
          {description}
        </EmptyDescription>
      </EmptyHeader>

      {children && (
        <EmptyContent className="mt-2 flex-row flex-wrap justify-center gap-2">
          {children}
        </EmptyContent>
      )}
    </Empty>
  );
}
