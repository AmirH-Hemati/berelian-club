"use client";
import { SendFileModal } from "@/features/files/components/SendFileModal";
import { ChatPage, SocketProvider } from "@repo/chat";

export default function page() {
  return (
    <SocketProvider>
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
    </SocketProvider>
  );
}
