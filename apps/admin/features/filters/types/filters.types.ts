export type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig =
  | {
      key: string;
      label: string;
      type: "multiSelect";
      options: FilterOption[];
      placeholder?: string;
    }
  | {
      key: string;
      label: string;
      type: "select";
      options: FilterOption[];
      placeholder?: string;
    }
  | {
      key: string;
      label: string;
      type: "dateRange";
      placeholder?: string;
    }
  | {
      key: string;
      label: string;
      type: "combobox";
      options?: FilterOption[];
      placeholder?: string;
      searchPlaceholder?: string;
    };

export type FilterValues = Record<
  string,
  string | string[] | Date | null | undefined
>;

export type FilterDefinition = {
  title: string;
  description?: string;
  filters: FilterConfig[];
};
