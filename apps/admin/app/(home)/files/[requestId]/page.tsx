"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useRouter } from "next/navigation";

import Spinner from "@/components/Spinner";
import { useRequest } from "@/features/requests/hooks/useRequest";
import StatusBadge from "@/features/requests/components/StatusBadge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RequestDataBox from "@/features/requests/components/RequestDataBox";
export default function Page() {
  const { request, isLoading } = useRequest();
  const router = useRouter();

  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">داشبورد</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/orders">درخواست ها</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>جزیات درخواست</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {request && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center ">
              <Button variant="ghost" size="icon-lg">
                <ArrowRight className="size-5" />
              </Button>
              <h1 className="font-bold text-2xl my-5">درخواست</h1>
            </div>
            <StatusBadge status={request.status} />
          </div>
          <RequestDataBox request={request} />
        </>
      )}
    </div>
  );
}
