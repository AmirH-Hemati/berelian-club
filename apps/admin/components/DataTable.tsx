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
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/DataTablePagination";
import { TableSkeleton } from "./TableSkeleton";
import { CircleAlert } from "lucide-react";
import { Button } from "./ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  currentPage: number;
  limit: number;
  isLoading: boolean;
  isError: boolean;
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
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-right">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isError && (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-10">
                <div className="flex flex-col items-center justify-center gap-3 ">
                  <CircleAlert className="size-8 text-destructive" />

                  <div className="flex flex-col items-center">
                    <p className="font-medium">خطا در دریافت اطلاعات</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      متأسفانه اطلاعات در حال حاضر قابل دریافت نیست. لطفاً
                      دوباره تلاش کنید.
                    </p>
                  </div>

                  <Button variant="outline" size="sm" onClick={onRetry}>
                    تلاش مجدد
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
          {!isError &&
            rows?.length > 0 &&
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!isError && !rows?.length && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                نتیجه ای یافت نشد.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
}
