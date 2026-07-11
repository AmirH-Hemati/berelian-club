import AddNewRequest from "./AddNewRequest";

export default function RequestsHeader() {
  return (
    <div className="flex md:items-center md:justify-between md:flex-row flex-col gap-2">
      <h2 className="text-2xl font-bold">درخواست‌های شما</h2>
      <AddNewRequest />
    </div>
  );
}
