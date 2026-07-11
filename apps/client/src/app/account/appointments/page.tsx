import AppointmentsHeader from "@/features/account/appointments/components/AppointmentsHeader";
import AppointmentsTable from "@/features/account/appointments/components/AppointmentsTable";

export default function Page() {
  return (
    <div className="space-y-6 mt-4">
      <AppointmentsHeader />
      <AppointmentsTable />
    </div>
  );
}
