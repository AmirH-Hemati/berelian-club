"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui";

import { useRouter } from "next/navigation";

import ErrorState from "@/components/ErrorState";
import Spinner from "@/components/PageSpinner";
import { Button } from "@repo/ui";
import RequestDataBox from "@/features/requests/components/RequestDataBox";
import StatusBadge from "@/features/requests/components/StatusBadge";
import { useRequest } from "@/features/requests/hooks/useRequest";
import { ArrowRight } from "lucide-react";
export default function Page() {
  const router = useRouter();
  const { request, isLoading, isError, refetch } = useRequest();

  if (isLoading) return <Spinner />;
  if (isError) {
    return (
      <div className="bg-muted/30 p-4 rounded-lg ">
        <ErrorState
          title="خطا در دریافت اطلاعات درخواست"
          description="امکان دریافت اطلاعات این درخواست وجود ندارد."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">داشبورد</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/requests">درخواست ها</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>جزئیات درخواست</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {request && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center ">
              <Button
                variant="ghost"
                size="icon-lg"
                onClick={() => router.back()}
              >
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
