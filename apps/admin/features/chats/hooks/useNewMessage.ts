"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../components/SocketProvider";

export function useNewMessages(conversationId: string) {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNewMessage = (newMessage: any) => {
      if (newMessage.conversation !== conversationId) return;

      queryClient.setQueryData(
        ["messages", conversationId],
        (oldMessages: any[] = []) => {
          const exists = oldMessages.some((m) => m._id === newMessage._id);
          if (exists) return oldMessages;
          return [...oldMessages, newMessage];
        },
      );
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, isConnected, conversationId, queryClient]);
}
