import LearningHeader from "@/features/account/learning/components/LearningHeader";
import LearningTable from "@/features/account/learning/components/LearningTable";

export default function Page() {
  return (
    <div className="space-y-6 mt-4">
      <LearningHeader />
      <LearningTable />
    </div>
  );
}
