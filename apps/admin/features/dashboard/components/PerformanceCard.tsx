import { Progress } from "@repo/ui";
import { UserRound } from "lucide-react";

interface PerformanceCardProps {
  name: string;
  completionRate: number;
  metrics: {
    label: string;
    value: number;
  }[];
}

export default function PerformanceCard({
  name,
  completionRate,
  metrics,
}: PerformanceCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UserRound className="size-5" />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold truncate">{name}</h3>
          <p className="text-xs text-muted-foreground">عملکرد ماه جاری</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">{metric.label}</p>

            <p className="mt-1 text-xl font-bold tabular-nums">
              {metric.value.toLocaleString("fa-IR")}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">نرخ تکمیل</span>

          <span className="font-semibold tabular-nums">
            {completionRate.toLocaleString("fa-IR")}٪
          </span>
        </div>

        <Progress value={completionRate} className="h-2" />
      </div>
    </div>
  );
}
