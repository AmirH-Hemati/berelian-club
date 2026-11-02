import Spinner from "@/components/spinner/Spinner";
import RequestsHeader from "@/features/account/requests/components/RequestsHeader";
import RequestsTable from "@/features/account/requests/components/RequestsTable";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="mt-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <RequestsHeader />

        <Suspense fallback={<Spinner />}>
          <RequestsTable />
        </Suspense>
      </div>
    </div>
  );
}
