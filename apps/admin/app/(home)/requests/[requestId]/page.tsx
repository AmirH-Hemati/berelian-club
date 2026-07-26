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
import ErrorState from "@/components/ErrorState";
import { useConversation } from "@/features/chats/hooks/useConversation";
import { ChatWindow } from "@/features/chats/components/ChatWindow";
import { useUser } from "@/features/authentication/hooks/useUser";
export default function Page() {
  const router = useRouter();
  const { request, isLoading, isError, refetch } = useRequest();
  const { conversation, isLoading: isLoading2 } = useConversation();
  const { user, isLoading: isLoading3 } = useUser();
  if (isLoading || isLoading2 || isLoading3) return <Spinner />;
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
  const hasActiveChat = request.status === "approved" && conversation?.isActive;
  const otherUserId = conversation?.participants?.find(
    (p: any) => p._id !== user?._id,
  )?._id;
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
      {hasActiveChat ? (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">گفتگو با پشتیبانی</h3>
          <ChatWindow
            conversationId={conversation._id}
            otherUserId={otherUserId}
          />
        </div>
      ) : request.status === "pending" ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          در انتظار تایید ادمین...
        </div>
      ) : request.status === "rejected" ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          این درخواست رد شده است
        </div>
      ) : null}
    </div>
  );
}
