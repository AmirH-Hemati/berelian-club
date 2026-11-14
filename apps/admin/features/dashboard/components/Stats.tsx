"use client";

import { Card, CardContent, StatsSkeleton } from "@repo/ui";
import type { LucideIcon } from "lucide-react";

export interface StatItem {
  title: string;
  value: number | string;
  suffix?: string;
  icon: LucideIcon;
}

interface StatsProps {
  items: StatItem[];
  isLoading?: boolean;
}

export default function Stats({ items, isLoading = false }: StatsProps) {
  if (isLoading) return <StatsSkeleton />;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
          >
            <CardContent className="flex min-h-[88px] items-center gap-3 p-3 sm:min-h-[96px] sm:p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <p className="truncate text-200 font-medium text-muted-foreground ">
                  {item.title}
                </p>

                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <span className=" font-bold tracking-tight tabular-nums text-500">
                    {item.value ?? 0}
                  </span>

                  {item.suffix && (
                    <span className="text-100 text-muted-foreground ">
                      {item.suffix}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
