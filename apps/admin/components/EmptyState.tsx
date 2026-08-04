"use client";

import { LucideIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon className="size-10 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle className="text-center text-300">{title}</EmptyTitle>
        <EmptyDescription className="text-center text-200 text-muted-foreground">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      {children && (
        <EmptyContent className="flex-row justify-center gap-2">
          {children}
        </EmptyContent>
      )}
    </Empty>
  );
}
