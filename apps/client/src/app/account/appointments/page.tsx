import Spinner from "@/components/spinner/Spinner";
import AppointmentsHeader from "@/features/account/appointments/components/AppointmentsHeader";
import AppointmentsTable from "@/features/account/appointments/components/AppointmentsTable";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="space-y-6 mt-4">
      <AppointmentsHeader />
      <Suspense fallback={<Spinner />}>
        <AppointmentsTable />
      </Suspense>
    </div>
  );
}
