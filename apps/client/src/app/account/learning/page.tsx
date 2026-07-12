import Spinner from "@/components/spinner/Spinner";
import LearningHeader from "@/features/account/learning/components/LearningHeader";
import LearningTable from "@/features/account/learning/components/LearningTable";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="space-y-6 mt-4">
      <LearningHeader />
      <Suspense fallback={<Spinner />}>
        <LearningTable />
      </Suspense>
    </div>
  );
}
