"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useUpdateQueryParams() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQueryParams = useCallback(
    (params: Record<string, string | number>) => {
      const urlParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          urlParams.set(key, String(value));
        } else {
          urlParams.delete(key);
        }
      });

      router.push(`${pathName}?${urlParams.toString()}`, { scroll: false });
    },
    [pathName, searchParams, router],
  );

  return updateQueryParams;
}
