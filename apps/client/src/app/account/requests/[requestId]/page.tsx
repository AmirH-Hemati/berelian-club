"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  StatusBadge
} from "@repo/ui";
import { Button } from "@repo/ui";
import { Spinner } from "@repo/ui";
import UserRequestDataBox from "@/features/account/requests/components/UserRequestDataBox";
import { useRequest } from "@/features/account/requests/hooks/useRequest";
import { ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";

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
            <div className="flex items-center" onClick={() => router.back()}>
              <Button variant="ghost" size="icon-lg">
                <ArrowRight className="size-5" />
              </Button>
              <h1 className="font-bold text-2xl my-5">درخواست</h1>
            </div>
            <StatusBadge status={request.status} />
          </div>
          <UserRequestDataBox request={request} />
        </>
      )}
    </div>
  );
}
