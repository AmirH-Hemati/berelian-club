"use client";

import { EmptyState } from "@/components/EmptyState";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "@/features/account/chats/components/ChatHeader";
import { ChatWindow } from "@/features/account/chats/components/ChatWindow";
import { useConversation } from "@/features/account/chats/hooks/useConversation";
import { useUser } from "@/features/auth/hooks/useUser";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
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
            <Link href="/account/requests">مشاهده درخواست‌ها</Link>
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
      <ChatHeader otherUser={otherUser} onBack={() => window.history.back()} />

      <ChatWindow conversationId={conversation?._id} currentUser={user} />
    </div>
  );
}
