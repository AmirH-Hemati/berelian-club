import type { Server, Socket } from "socket.io";

export class SocketService {
  constructor(private readonly io: Server) {}

  getUserRoom(userId: string) {
    return `user-${userId}`;
  }

  registerUser(userId: string, socket: Socket) {
    socket.join(this.getUserRoom(userId));
  }

  removeUser(userId: string, socket: Socket) {
    const userRoom = this.getUserRoom(userId);
    const remainingSockets =
      this.io.sockets.adapter.rooms.get(userRoom)?.size ?? 0;

    if (remainingSockets === 0) {
      this.io.emit("user:offline", userId);
    }
  }

  isUserOnline(userId: string) {
    const userRoom = this.getUserRoom(userId);
    return (this.io.sockets.adapter.rooms.get(userRoom)?.size ?? 0) > 0;
  }

  emitToUser(userId: string, event: string, payload: unknown) {
    this.io.to(this.getUserRoom(userId)).emit(event, payload);
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
