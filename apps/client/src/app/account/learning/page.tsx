import { Suspense } from "react";
import { Spinner } from "@repo/ui";
import LearningHeader from "@/features/account/learning/components/LearningHeader";
import LearningTable from "@/features/account/learning/components/LearningTable";



export default function LearningPage() {
  return (
    <div className="mt-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <LearningHeader />

        <Suspense fallback={<Spinner />}>
          <LearningTable />
        </Suspense>
      </div>
    </div>
  );
}
