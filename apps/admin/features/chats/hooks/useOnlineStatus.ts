"use client";

import { useSocket } from "../components/SocketProvider";
import { useEffect, useState } from "react";

export function useOnlineStatus(userId: string | undefined) {
  const { socket, isConnected } = useSocket();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!userId || !socket || !isConnected) {
      setIsOnline(false);
      return;
    }

    const handleOnlineUsers = (users: string[]) => {
      setIsOnline(users.includes(userId));
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [socket, isConnected, userId]);

  return { isOnline };
}
