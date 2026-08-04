import { Skeleton, Alert } from "@repo/ui";

export function CardSkeleton({ skeletonLength = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: skeletonLength }).map((_, index) => (
        <Alert key={index}>
          <div className="flex items-center justify-between w-full">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <div className="mt-2 space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/4" />
          </div>
        </Alert>
      ))}
    </div>
  );
}
