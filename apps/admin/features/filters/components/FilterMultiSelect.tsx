"use client";

import { Checkbox, Label } from "@repo/ui";
import { FilterOption } from "../types/filters.types";


type Props = {
  label: string;
  options: FilterOption[];
  value: string[];
  onChange: (value: string[]) => void;
};

export default function FilterMultiSelect({
  label,
  options,
  value,
  onChange,
}: Props) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
      return;
    }

    onChange(value.filter((item) => item !== optionValue));
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <Checkbox
              id={`${label}-${option.value}`}
              checked={value.includes(option.value)}
              onCheckedChange={(checked) =>
                handleChange(option.value, checked === true)
              }
            />

            <Label
              htmlFor={`${label}-${option.value}`}
              className="cursor-pointer text-sm font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
