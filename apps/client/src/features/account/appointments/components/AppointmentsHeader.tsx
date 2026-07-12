import AddNewAppointment from "./AddNewAppointment";

export default function AppointmentsHeader() {
  return (
    <div className="flex md:items-center md:justify-between md:flex-row flex-col gap-2">
      <h2 className="text-2xl font-bold">رزرو مشاورات شما</h2>
      <AddNewAppointment />
    </div>
  );
}
