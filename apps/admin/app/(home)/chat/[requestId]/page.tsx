"use client";

import Spinner from "@/components/PageSpinner";
import { useUser } from "@/features/authentication/hooks/useUser";
import { ChatHeader } from "@/features/chats/components/ChatHeader";
import { ChatWindow } from "@/features/chats/components/ChatWindow";
import { useConversation } from "@/features/chats/hooks/useConversation";

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
      {/* هدر چت */}
      <ChatHeader otherUser={otherUser} onBack={() => window.history.back()} />

      {/* پنجره چت */}
      <ChatWindow
        conversationId={conversation?._id}
        otherUserId={otherUser?._id}
        currentUserId={user?._id}
        otherUserName={otherUser?.firstName + otherUser?.lastName}
      />
    </div>
  );
}
