"use client";

import { Button } from "@/components/ui/button";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
}

export function PaginationControls({
  page=1,
  totalPages=1,
}: PaginationControlsProps) {
  const updateQueryParams = useUpdateQueryParams();

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    updateQueryParams({ page: newPage });
  };

  return (
    <div className="w-full flex items-center px-2 justify-between flex-wrap gap-2">
      <p className="text-xs">
        صفحه {page} از {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="xs"
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
        >
          <ChevronRight className="size-3" />
          قبلی
        </Button>

        <Button
          variant="outline"
          size="xs"
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages}
        >
          بعدی
          <ChevronLeft className="size-3" />
        </Button>
      </div>
    </div>
  );
}
