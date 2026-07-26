import { useEffect } from "react";
import { useSocket } from "../components/SocketProvider";

export function useJoinConversation(conversationId: string) {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket || !isConnected || !conversationId) return;

    socket.emit("join-conversation", conversationId);

    return () => {
      socket.emit("leave-conversation", conversationId);
    };
  }, [socket, isConnected, conversationId]);
}
