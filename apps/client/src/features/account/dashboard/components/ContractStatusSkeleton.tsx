import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
  Skeleton,
} from "@repo/ui";

export function ContractStatusSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex items-start justify-between">
        <CardTitle className="flex items-center gap-1">
          <Skeleton className="size-5 rounded-md" />
          <Skeleton className="h-5 w-32" />
        </CardTitle>
        <Badge variant="outline" className="border-muted">
          <Skeleton className="h-3 w-12" />
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">شروع قرارداد</span>
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">پایان قرارداد</span>
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">سپری شده</span>
            <Skeleton className="h-4 w-12" />
          </div>
          <Progress value={0} className="bg-muted" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>پایان</span>
            <Skeleton className="h-3 w-24" />
            <span>شروع</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
