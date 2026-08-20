import { ChatPage, SocketProvider } from "@repo/chat";

export default function page() {
  return (
    <SocketProvider>
      <ChatPage />
    </SocketProvider>
  );
}
