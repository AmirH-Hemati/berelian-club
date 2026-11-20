"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  StatusBadge,
} from "@repo/ui";
import { Button } from "@repo/ui";
import { Spinner } from "@repo/ui";
import UserRequestDataBox from "@/features/account/requests/components/UserRequestDataBox";
import { useRequest } from "@/features/account/requests/hooks/useRequest";
import { ArrowRight, MessageCircle } from "lucide-react";

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
            <BreadcrumbLink href="/account/requests">درخواست ها</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>جزئیات درخواست</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {request && (
        <>
          <div className="mb-2 sm:mb-0 flex sm:flex-row flex-col sm:justify-between sm:items-center flex-wrap">
            <div className="flex items-center" onClick={() => router.back()}>
              <Button variant="ghost" size="icon-lg">
                <ArrowRight className="size-5" />
              </Button>
              <h1 className="font-bold text-2xl my-5">درخواست</h1>
            </div>
            {request.status === "approved" && (
              <Button
                onClick={() => router.push(`/account/chat/${request._id}`)}
                className="gap-2"
              >
                <MessageCircle className="size-4" />
                گفتگو با واحد پذیرش
              </Button>
            )}
          </div>
          <UserRequestDataBox request={request} />
        </>
      )}
    </div>
  );
}
