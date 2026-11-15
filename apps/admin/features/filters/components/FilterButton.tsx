"use client";

import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui";

import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { FilterDefinition, FilterValues } from "../types/filters.types";
import FilterRenderer, { FilterOptions } from "./FilterRenderer";

type Props = {
  config: FilterDefinition;
  filterOptions?: FilterOptions;
};

function getFilterKeys(config: FilterDefinition) {
  return config.filters.flatMap((filter) => {
    if (filter.type === "dateRange") {
      return [`${filter.key}[gte]`, `${filter.key}[lte]`];
    }

    return [filter.key];
  });
}

function getValuesFromUrl(
  searchParams: URLSearchParams,
  config: FilterDefinition,
): FilterValues {
  const values: FilterValues = {};

  for (const key of getFilterKeys(config)) {
    const value = searchParams.get(key);

    if (value) {
      values[key] = value;
    }
  }

  return values;
}

export default function FilterButton({ config, filterOptions = {} }: Props) {
  const updateQueryParams = useUpdateQueryParams();

  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [draftValues, setDraftValues] = useState<FilterValues>({});

  const queryString = searchParams.toString();

  useEffect(() => {
    if (open) {
      setDraftValues(
        getValuesFromUrl(new URLSearchParams(queryString), config),
      );
    }
  }, [open, queryString, config]);

  const handleChange = (key: string, value: string | string[]) => {
    setDraftValues((current) => ({
      ...current,
      [key]: Array.isArray(value) ? value.join(",") : value,
    }));
  };

  const handleApply = () => {
    const params: Record<string, string | number> = {};

    for (const key of getFilterKeys(config)) {
      params[key] = "";
    }

    Object.entries(draftValues).forEach(([key, value]) => {
      const normalizedValue = Array.isArray(value) ? value.join(",") : value;

      params[key] = normalizedValue ? String(normalizedValue) : "";
    });

    params.page = 1;

    updateQueryParams(params);
    setOpen(false);
  };

  const handleClear = () => {
    const params: Record<string, string | number> = {};

    for (const key of getFilterKeys(config)) {
      params[key] = "";
    }

    params.page = 1;

    setDraftValues({});
    updateQueryParams(params);
    setOpen(false);
  };

  const activeFilterCount = getFilterKeys(config).filter((key) =>
    searchParams.get(key),
  ).length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="size-4" />
          فیلترها
          {activeFilterCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{config.title}</SheetTitle>

          {config.description && (
            <SheetDescription>{config.description}</SheetDescription>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <FilterRenderer
            filters={config.filters}
            values={draftValues}
            onChange={handleChange}
            options={filterOptions}
          />
        </div>

        <SheetFooter className="flex-row gap-2 border-t pt-4">
          <Button className="flex-1" onClick={handleApply}>
            اعمال فیلترها
          </Button>

          <Button variant="outline" className="flex-1" onClick={handleClear}>
            حذف فیلترها
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
