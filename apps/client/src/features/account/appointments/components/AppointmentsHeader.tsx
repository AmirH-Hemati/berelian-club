import { CalendarDays } from "lucide-react";
import AddNewAppointment from "./AddNewAppointment";

export default function AppointmentsHeader() {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CalendarDays className="size-5" />
        </div>

        <div>
          <h2 className="text-base font-bold text-foreground">مشاوره‌های من</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            مدیریت و مشاهده وضعیت جلسات مشاوره
          </p>
        </div>
      </div>

      <AddNewAppointment />
    </div>
  );
}
