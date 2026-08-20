"use client";

import { useUser } from "@repo/auth";
import { Button, Spinner, EmptyState } from "@repo/ui";
import { ChatHeader } from "./ChatHeader";
import { ChatWindow } from "./ChatWindow";
import { useConversation } from "../hooks/useConversation";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  renderSendFileIconAction?: (props: {
    userId: string;
    userName: string;
    conversationId: string;
  }) => React.ReactNode;
};

export default function ChatPage({ renderSendFileIconAction }: Props) {
  const { user, isLoading: userLoading } = useUser();
  const { conversation, isLoading } = useConversation();

  if (isLoading || userLoading) {
    return <Spinner />;
  }
  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <EmptyState
          icon={MessageCircle}
          title="چتی وجود ندارد"
          description="هنوز هیچ گفتگویی شروع نشده است. پس از تایید درخواست، میتوانید با پشتیبانی گفتگو کنید."
        >
          <Button asChild>
            <Link href="/requests">مشاهده درخواست‌ها</Link>
          </Button>
        </EmptyState>
      </div>
    );
  }
  const otherUser = conversation?.participants?.find(
    (p: any) => p._id !== user?._id,
  );

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      <ChatHeader
        conversationId={conversation._id}
        isActive={conversation.isActive}
        otherUser={otherUser}
        onBack={() => window.history.back()}
        requestId={conversation.request}
      />

      <ChatWindow
        conversationId={conversation?._id}
        currentUser={user}
        isActive={conversation.isActive}
        sendFileIconAction={renderSendFileIconAction?.({
          userId: otherUser?._id,
          userName: otherUser?.firstName + otherUser?.lastName,
          conversationId: conversation._id,
        })}
      />
    </div>
  );
}
