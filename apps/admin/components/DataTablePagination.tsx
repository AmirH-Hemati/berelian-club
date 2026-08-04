"use client";

import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@repo/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const updateQueryParams = useUpdateQueryParams();

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const currentLimit = table.getState().pagination.pageSize;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    table.setPageIndex(page - 1);
    updateQueryParams({ page: page.toString() });
  };

  const handleLimitChange = (limit: string) => {
    table.setPageSize(Number(limit));
    updateQueryParams({ limit, page: "1" });
  };

  return (
    <div className="flex items-center lg:justify-end w-full  px-2 my-4">
      <div className="flex items-center flex-wrap  space-x-6 lg:space-x-8 gap-2">
        <div className="flex items-center space-x-2">
          <p className="text-200 font-medium">تعداد ردیف ها در صفحه</p>
          <Select value={`${currentLimit}`} onValueChange={handleLimitChange}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder={currentLimit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex  items-center justify-center text-200 font-medium">
          صفحه {currentPage} از {totalPages || 1}
        </div>

        <div className="flex items-center space-x-2 ">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => goToPage(1)}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">رفتن به اولین صفحه</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">رفتن به صفحه قبلی</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">رفتن به صفحه بعدی</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">رفتن به صفحه آخر</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
