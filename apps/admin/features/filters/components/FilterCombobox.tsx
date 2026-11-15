"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  Label,
} from "@repo/ui";

export type FilterOption = {
  label: string;
  value: string;
  description?: string;
};

type Props = {
  label: string;
  placeholder?: string;
  options: FilterOption[];
  value: string;
  isLoading?: boolean;
  onChange: (value: string) => void;
};

export default function FilterCombobox({
  label,
  placeholder = "جستجو...",
  options,
  value,
  isLoading = false,
  onChange,
}: Props) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>

      <Combobox
        items={options}
        value={selectedOption?.value ?? ""}
        onValueChange={(newValue) => {
          onChange(String(newValue ?? ""));
        }}
      >
        <ComboboxInput placeholder={placeholder}>
          <ComboboxValue />
        </ComboboxInput>

        <ComboboxContent className="pointer-events-auto">
          {isLoading ? (
            <ComboboxEmpty>در حال دریافت اطلاعات...</ComboboxEmpty>
          ) : (
            <>
              <ComboboxEmpty>موردی پیدا نشد.</ComboboxEmpty>

              <ComboboxList>
                {(option) => (
                  <ComboboxItem key={option.value} value={option.value}>
                    <div className="flex flex-1 flex-col">
                      <span>{option.label}</span>

                      {option.description && (
                        <span className="text-100 text-muted-foreground">
                          {option.description}
                        </span>
                      )}
                    </div>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </>
          )}
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
