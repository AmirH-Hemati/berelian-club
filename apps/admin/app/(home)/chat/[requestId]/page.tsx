"use client";
import { SendFileModal } from "@/features/files/components/SendFileModal";
import { ChatPage } from "@repo/chat";

export default function page() {
  return (
    <ChatPage
      renderSendFileIconAction={({ userId, userName, conversationId }) => (
        <SendFileModal
          userId={userId}
          userName={userName}
          conversationId={conversationId}
          iconChat
        />
      )}
    />
  );
}
