"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socketRef.current?.connected) return;

    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "https://monorepo-bashgah-moshtarian.onrender.com",
      {
        withCredentials: true,
        transports: ["websocket"],
        reconnection: true,
      },
    );

    socketRef.current = socket;

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected");
      setIsConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
