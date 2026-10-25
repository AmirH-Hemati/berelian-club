"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../components/SocketProvider";

export function useNewMessages(conversationId: string) {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !isConnected || !conversationId) return;

    const handleNewMessage = (newMessage: any) => {
      const messageConversationId =
        typeof newMessage.conversation === "string"
          ? newMessage.conversation
          : (newMessage.conversation?._id?.toString() ??
            newMessage.conversation?.toString());

      if (messageConversationId !== conversationId) return;

      queryClient.setQueryData(["messages", conversationId], (oldData: any) => {
        if (!oldData?.pages?.length) return oldData;

        const alreadyExists = oldData.pages.some((page: any) =>
          page.messages.some((message: any) => message._id === newMessage._id),
        );

        if (alreadyExists) return oldData;

        const lastPageIndex = oldData.pages.length - 1;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) =>
            index === lastPageIndex
              ? {
                  ...page,
                  messages: [...page.messages, newMessage],
                }
              : page,
          ),
        };
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, isConnected, conversationId, queryClient]);
}
