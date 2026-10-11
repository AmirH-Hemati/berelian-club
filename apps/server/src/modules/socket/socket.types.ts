import type { Server, Socket } from "socket.io";

export class SocketService {
  private io: Server;

  private users = new Map<string, Socket>();

  constructor(io: Server) {
    this.io = io;
  }

  registerUser(userId: string, socket: Socket) {
    this.users.set(userId, socket);

    this.emitOnlineUsers();
  }

  removeUser(userId: string) {
    this.users.delete(userId);

    this.emitOnlineUsers();
  }

  getUserSocket(userId: string) {
    return this.users.get(userId);
  }

  isUserOnline(userId: string) {
    return this.users.has(userId);
  }

  emitOnlineUsers() {
    this.io.emit("onlineUsers", Array.from(this.users.keys()));
  }

  joinConversation(socket: Socket, conversationId: string) {
    socket.join(`conv-${conversationId}`);
  }

  leaveConversation(socket: Socket, conversationId: string) {
    socket.leave(`conv-${conversationId}`);
  }

  emitNewMessage(conversationId: string, message: unknown) {
    this.io.to(`conv-${conversationId}`).emit("newMessage", message);
  }

  emitConversationClosed(conversationId: string) {
    this.io.to(`conv-${conversationId}`).emit("conversationClosed", {
      conversationId,
    });
  }
}
