"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ChatWindow } from "@/features/account/chats/components/ChatWindow";
import { useConversation } from "@/features/account/chats/hooks/useConversation";
import StatusBadge from "@/features/account/requests/components/StatusBadge";
import UserRequestDataBox from "@/features/account/requests/components/UserRequestDataBox";
import { useRequest } from "@/features/account/requests/hooks/useRequest";
import { ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";

export default function Page() {
  const { request, isLoading } = useRequest();
  const router = useRouter();
  const { conversation, isLoading: isLoading2 } = useConversation();

  if (isLoading || isLoading2) return <Spinner />;
  const hasActiveChat = request.status === "approved" && conversation?.isActive;
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

      {hasActiveChat ? (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">گفتگو با پشتیبانی</h3>
          <ChatWindow conversationId={conversation._id} />
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
