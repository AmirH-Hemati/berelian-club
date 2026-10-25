import type { Server as HttpServer } from "http";
import { Server } from "socket.io";

export const createSocketServer = (server: HttpServer) => {
  return new Server(server, {
    cors: {
      origin: [
        "http://localhost:4001",
        "http://localhost:4002",
        "https://berelianclub.onrender.com",
        "https://berelianclub-admin.onrender.com",
      ],
      credentials: true,
    },
  });
};
