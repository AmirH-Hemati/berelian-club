"use client";

import Spinner from "@/components/spinner/Spinner";
import { ChatHeader } from "@/features/account/chats/components/ChatHeader";
import { ChatWindow } from "@/features/account/chats/components/ChatWindow";
import { useConversation } from "@/features/account/chats/hooks/useConversation";
import { useUser } from "@/features/auth/hooks/useUser";

export default function ChatPage() {
  const { user, isLoading: userLoading } = useUser();
  const { conversation, isLoading } = useConversation();

  if (isLoading || userLoading) {
    return <Spinner />;
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
