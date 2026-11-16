"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
} from "@repo/ui";

import { ArrowRight } from "lucide-react";

import Spinner from "@/components/PageSpinner";
import ErrorState from "@/components/ErrorState";

import { useFollowup } from "@/features/followUps/hooks/useFollowup";
import FollowupDataBox from "@/features/followUps/components/FollowupDataBox";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const { followup, isLoading, isError, refetch } = useFollowup();

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <div className="rounded-lg bg-muted/30 p-4">
        <ErrorState
          title="خطا در دریافت اطلاعات پیگیری"
          description="امکان دریافت اطلاعات این پیگیری وجود ندارد."
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
            <BreadcrumbLink href="/followUps">پیگیری‌ها</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>جزئیات پیگیری</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {followup && (
        <>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={() => router.back()}
            >
              <ArrowRight className="size-5" />
            </Button>

            <h1 className="my-5 text-2xl font-bold">پیگیری</h1>
          </div>

          <FollowupDataBox followup={followup} />
        </>
      )}
    </div>
  );
}
