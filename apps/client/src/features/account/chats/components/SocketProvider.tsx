"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Socket, io } from "socket.io-client";

type SocketContextType = {
  socket: RefObject<Socket | null> | null;
  joinConversion: (conversationId: string) => void;
};
const SocketContext = createContext<SocketContextType>({
  socket: null,
  joinConversion: () => {},
});

type Props = { children: ReactNode };

function SocketProvider({ children }: Props) {
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
      {
        withCredentials: true,
      },
    );

    socketRef.current = socket;

    socket.on("newMessage", (newMessage) => {
      queryClient.setQueryData(
        ["messages", newMessage.conversation],
        (oldMessages: any[] = []) => {
          const exists = oldMessages.some((m) => m._id === newMessage._id);
          if (exists) return oldMessages;
          return [...oldMessages, newMessage];
        },
      );
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [queryClient]);

  function joinConversion(conversationId: string) {
    const socket = socketRef.current;
    if (!socket) return;
    socket?.emit("join-conversation", conversationId);
  }

  return (
    <SocketContext.Provider value={{ socket: socketRef, joinConversion }}>
      {children}
    </SocketContext.Provider>
  );
}

function useSocket() {
  const context = useContext(SocketContext);
  return context;
}

export { useSocket, SocketProvider };
