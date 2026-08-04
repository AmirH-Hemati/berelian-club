import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

import { Calendar } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@repo/ui";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
};
export default function CustomDatePicker<T extends FieldValues>({
  control,
  name,
  label,
}: Props<T>) {
  return (
    <Field className="">
      <FieldLabel className="text-sm font-medium">{label}</FieldLabel>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <div className="grid ">
            <label
              htmlFor="datePicker"
              className=" h-9 gap-1 flex items-center w-full  rounded-md border border-input bg-transparent/50 py-1 px-2.5 text-base sm:text-sm shadow-xs focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Calendar />
              <DatePicker
                id="datePicker"
                calendar={persian}
                locale={persian_fa}
                inputClass="border-none flex-1  outline-none"
                value={field.value ? new Date(field.value) : new Date()}
                onChange={(date) =>
                  field.onChange(
                    date && date?.isValid
                      ? new Date(date.toDate())
                      : new Date(),
                  )
                }
                calendarPosition="top-left"
              />
            </label>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        )}
      />
    </Field>
  );
}
