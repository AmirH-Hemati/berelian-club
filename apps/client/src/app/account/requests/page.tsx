import SearchFilter from "@/components/SearchFilter";
import Spinner from "@/components/spinner/Spinner";
import RequestsHeader from "@/features/account/requests/components/RequestsHeader";
import RequestsTable from "@/features/account/requests/components/RequestsTable";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="space-y-4 mt-4">
      <RequestsHeader />
      <Suspense fallback={<Spinner />}>
        <SearchFilter />
        <RequestsTable />
      </Suspense>
    </div>
  );
}
