import type { Server } from "socket.io";
import type { SocketService } from "./socket.types.js";
import { authSocketMiddleware } from "../../middlewares/authSocketMiddleware.js";

export const setupSocketGateway = (
  io: Server,
  socketService: SocketService,
) => {
  io.use(authSocketMiddleware);
  io.on("connection", (socket) => {
    const userId = socket.userId;

    socketService.registerUser(userId, socket);

    socket.on("join-conversation", (conversationId: string) => {
      socketService.joinConversation(socket, conversationId);
    });

    socket.on("leave-conversation", (conversationId: string) => {
      socketService.leaveConversation(socket, conversationId);
    });

    socket.on("disconnect", () => {
      socketService.removeUser(userId);
    });
  });
};
