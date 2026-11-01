"use client";

import { Card, CardContent, StatsSkeleton } from "@repo/ui";
import { ArrowUpLeft } from "lucide-react";
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
            className="group relative overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
          >
            <div className="pointer-events-none absolute -left-6 -top-6 size-20 rounded-full bg-primary/[0.04] transition-transform duration-500 group-hover:scale-150" />

            <CardContent className="relative flex min-h-[105px] flex-col justify-between gap-3 p-3 sm:min-h-[115px] sm:p-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-[18px]" strokeWidth={1.8} />
                </div>

                <span className="rounded-full bg-muted/70 p-1 text-muted-foreground opacity-70 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:opacity-100">
                  <ArrowUpLeft className="size-3.5" />
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                  {item.title}
                </p>

                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <span className="text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
                    {item.value ?? 0}
                  </span>

                  {item.suffix && (
                    <span className="text-[10px] text-muted-foreground sm:text-xs">
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
