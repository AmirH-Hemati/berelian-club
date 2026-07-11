"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";

import {
  CircleCheck,
  CircleX,
  Clock,
  CheckCircle2,
  ListChecks,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const tabsMap = [
  { label: "همه", value: "all", icon: ListChecks, color: "text-gray-500" },
  {
    label: "در انتظار",
    value: "pending",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "تایید شده",
    value: "approved",
    icon: CheckCircle2,
    color: "text-blue-500",
  },
  {
    label: "برگزار شده",
    value: "completed",
    icon: CircleCheck,
    color: "text-green-500",
  },
  {
    label: "لغو شده",
    value: "cancelled",
    icon: CircleX,
    color: "text-red-500",
  },
];

export default function TabsComponents() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const updateQueryParams = useUpdateQueryParams();

  function handleChangeStatus(statusValue: string) {
    if (statusValue === "all") {
      updateQueryParams({ status: "", page: "1" });
    } else {
      updateQueryParams({ status: statusValue, page: "1" });
    }
  }

  return (
    <Tabs
      onValueChange={handleChangeStatus}
      value={status}
      className="w-full lg:w-auto"
    >
      <TabsList className="w-full lg:w-auto bg-muted/30 overflow-x-auto p-1 h-auto rounded-xl">
        {tabsMap.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-3 py-1.5 text-xs font-medium "
          >
            <tab.icon className={`size-3.5 ${tab.color}`} />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
