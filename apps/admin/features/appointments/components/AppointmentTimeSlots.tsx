import { Button } from "@repo/ui";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface AppointmentTimeSlotsProps<
  T extends FieldValues & { startAt: string },
> {
  control: Control<T>;
  disabled?: boolean;
}

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];

function AppointmentTimeSlots<T extends FieldValues & { startAt: string }>({
  control,
  disabled = false,
}: AppointmentTimeSlotsProps<T>) {
  return (
    <Controller
      name={"startAt" as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-3">
          <p className="text-sm font-medium">ساعت مشاوره را انتخاب کنید</p>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {timeSlots.map((time) => {
              const isSelected = field.value === time;

              return (
                <Button
                  key={time}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  disabled={disabled}
                  onClick={() => field.onChange(time)}
                  className="w-full"
                >
                  {time}
                </Button>
              );
            })}
          </div>

          {fieldState.error && (
            <p className="text-sm text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

export default AppointmentTimeSlots;
