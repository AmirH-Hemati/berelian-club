"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  TableSkeleton,
} from "@repo/ui";

import { DataTablePagination } from "@/components/DataTablePagination";
import { CircleAlert, SearchX } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  currentPage: number;
  limit: number;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  onRetry: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPages = 1,
  currentPage = 1,
  limit = 10,
  isLoading,
  isError,
  errorMessage,
  onRetry,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    initialState: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: limit,
      },
    },
  });

  if (isLoading) return <TableSkeleton />;

  const rows = table.getRowModel().rows;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-border bg-muted/50 hover:bg-muted/50"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-12 whitespace-nowrap px-4 text-right text-xs font-semibold text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 px-4">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <CircleAlert className="size-6" />
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">
                        خطا در دریافت اطلاعات
                      </p>

                      <p className="mt-1 max-w-sm text-xs leading-6 text-muted-foreground">
                        {errorMessage ||
                          "متأسفانه اطلاعات در حال حاضر قابل دریافت نیست. لطفاً دوباره تلاش کنید."}
                      </p>
                    </div>

                    <Button variant="outline" size="sm" onClick={onRetry}>
                      تلاش مجدد
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-border/60 transition-colors hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap px-4 py-3.5 align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <SearchX className="size-6" />
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">
                        نتیجه‌ای یافت نشد
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        اطلاعاتی مطابق با فیلترهای انتخاب‌شده وجود ندارد.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!isError && (
        <div className="border-t border-border bg-card px-4 py-3">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}
