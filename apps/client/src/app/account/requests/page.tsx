import SearchFilter from "@/components/SearchFilter";
import RequestsHeader from "@/features/account/requests/components/RequestsHeader";
import RequestsTable from "@/features/account/requests/components/RequestsTable";

export default function Page() {
  return (
    <div className="space-y-4 mt-4">
      <RequestsHeader />
      <SearchFilter />
      <RequestsTable />
    </div>
  );
}
