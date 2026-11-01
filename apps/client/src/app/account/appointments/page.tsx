import Spinner from "@/components/spinner/Spinner";
import AppointmentsHeader from "@/features/account/appointments/components/AppointmentsHeader";
import AppointmentsTable from "@/features/account/appointments/components/AppointmentsTable";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="mt-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <AppointmentsHeader />

        <Suspense fallback={<Spinner />}>
          <AppointmentsTable />
        </Suspense>
      </div>
    </div>
  );
}
