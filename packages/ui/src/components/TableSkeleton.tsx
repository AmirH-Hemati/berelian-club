import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  avatar?: boolean;
}

export default function TableSkeleton({
  columns = 5,
  rows = 8,
  avatar = false,
}: TableSkeletonProps) {
  const getWidth = (colIndex: number) => {
    const widths = ["w-3/4", "w-1/2", "w-2/3", "w-1/3", "w-4/5"];
    return widths[colIndex % widths.length];
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index} className="text-right">
                <Skeleton className={`h-4 ${getWidth(index)}`} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {avatar && (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-8 rounded-full shrink-0" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-2 w-16" />
                    </div>
                  </div>
                </TableCell>
              )}

              {Array.from({ length: columns - 1 }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  {colIndex === 0 ? (
                    <Skeleton className="h-4 w-24" />
                  ) : colIndex === 1 ? (
                    <Skeleton className="h-5 w-16 rounded-full" />
                  ) : colIndex === 2 ? (
                    <Skeleton className="h-5 w-20 rounded-full" />
                  ) : (
                    <div className="flex justify-end">
                      <Skeleton className="size-8 rounded-md" />
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
