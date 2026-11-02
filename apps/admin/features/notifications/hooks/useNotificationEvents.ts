"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@repo/chat";

interface NewNotificationPayload {
  _id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export function useNotificationEvents() {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification: NewNotificationPayload) => {
      if (!notification.isRead) {
        queryClient.setQueryData<number>(
          ["unreadNotificationsCount"],
          (oldCount) => (oldCount ?? 0) + 1,
        );
      }

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
        refetchType: "active",
      });
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [socket, queryClient]);
}
