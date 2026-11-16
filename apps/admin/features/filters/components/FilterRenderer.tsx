"use client";

import {
  FilterConfig,
  FilterOption,
  FilterValues,
} from "../types/filters.types";

import FilterDateRange from "./FilterDateRange";
import FilterMultiSelect from "./FilterMultiSelect";
import FilterCombobox from "./FilterCombobox";
import FilterAssignedToMe from "./FilterAssignedToMe";

export type FilterOptions = {
  [key: string]: {
    options: FilterOption[];
    isLoading?: boolean;
  };
};

type Props = {
  filters: FilterConfig[];
  values: FilterValues;
  options?: FilterOptions;
  onChange: (key: string, value: string | string[]) => void;
};

export default function FilterRenderer({
  filters,
  values,
  options = {},
  onChange,
}: Props) {
  return (
    <div className="space-y-6">
      {filters.map((filter) => {
        if (filter.type === "multiSelect") {
          const selectedValues = values[filter.key];

          return (
            <FilterMultiSelect
              key={filter.key}
              label={filter.label}
              options={filter.options ?? []}
              value={
                Array.isArray(selectedValues)
                  ? selectedValues
                  : typeof selectedValues === "string" && selectedValues
                    ? selectedValues.split(",")
                    : []
              }
              onChange={(value) => onChange(filter.key, value)}
            />
          );
        }

        if (filter.type === "assignedToMe") {
          return (
            <FilterAssignedToMe
              key={`${filter.key}-${filter.label}`}
              label={filter.label}
              selectedValue={
                typeof values[filter.key] === "string"
                  ? (values[filter.key] as string)
                  : ""
              }
              onChange={(value) => onChange(filter.key, value)}
            />
          );
        }

        if (filter.type === "dateRange") {
          const from = values[`${filter.key}[gte]`];
          const to = values[`${filter.key}[lt]`];

          return (
            <FilterDateRange
              key={filter.key}
              label={filter.label}
              value={
                typeof from === "string" && from && typeof to === "string" && to
                  ? [from, to]
                  : null
              }
              onChange={(value) => {
                onChange(`${filter.key}[gte]`, value?.[0] ?? "");
                onChange(`${filter.key}[lt]`, value?.[1] ?? "");
              }}
            />
          );
        }

        if (filter.type === "combobox") {
          const filterOptions = options[filter.key];
          const selectedValue = values[filter.key];

          return (
            <FilterCombobox
              key={filter.key}
              label={filter.label}
              placeholder={filter.placeholder}
              options={filterOptions?.options ?? []}
              value={typeof selectedValue === "string" ? selectedValue : ""}
              isLoading={filterOptions?.isLoading ?? false}
              onChange={(value) => onChange(filter.key, value)}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
