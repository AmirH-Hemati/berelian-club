import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type StatsSkeletonProps = {
  count?: number;
};

export function StatsSkeleton({ count = 4 }: StatsSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <CardContent className="flex flex-col items-center gap-2 p-4 lg:flex-row lg:items-start">
            <div className="rounded-xl bg-primary/10 p-3">
              <Skeleton className="size-5 rounded-md bg-primary/20" />
            </div>

            <div className="flex flex-1 flex-col  items-center gap-1 text-center lg:items-start lg:text-start">
              <Skeleton className="h-3 w-16" />
              <div className="flex items-baseline justify-center gap-1 lg:justify-start">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-2 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
