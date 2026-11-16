"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CalendarDays } from "lucide-react";

type Props = {
  label: string;
  value: [string, string] | null;
  onChange: (value: [string, string] | null) => void;
};

export default function FilterDateRange({ label, value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      <div className="flex items-center gap-2 rounded-lg border border-input px-3 py-2">
        <CalendarDays className="size-4 shrink-0 text-muted-foreground" />

        <DatePicker
          range
          calendar={persian}
          locale={persian_fa}
          value={value ?? []}
          onChange={(dates) => {
            if (!dates || !Array.isArray(dates) || dates.length === 0) {
              onChange(null);
              return;
            }

            if (dates.length === 2 && dates[0] && dates[1]) {
              const startDate = dates[0].toDate();
              startDate.setHours(0, 0, 0, 0);

              const endDate = dates[1].toDate();
              endDate.setHours(0, 0, 0, 0);
              endDate.setDate(endDate.getDate() + 1);

              onChange([startDate.toISOString(), endDate.toISOString()]);
            }
          }}
          format="YYYY/MM/DD"
          rangeHover
          calendarPosition="bottom-right"
          inputClass="w-full border-none bg-transparent text-sm outline-none"
          placeholder="انتخاب تاریخ شروع و پایان"
        />
      </div>
    </div>
  );
}
