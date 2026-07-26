import { Server, Socket } from "socket.io";
import { authSocketMiddleware } from "../middlewares/authSocketMiddleware.js";
import http from "http";
import app from "../app.js";

const server = http.createServer(app);
const usersSocket: Record<string, Socket> = {};

export function getReceiverSocketId(userId: string) {
  return usersSocket[userId];
}

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4001", "http://localhost:4002"],
    credentials: true,
  },
});

io.use(authSocketMiddleware);

io.on("connection", (socket) => {
  const userId = socket.userId;
  usersSocket[userId] = socket;

  console.log("users online", Object.keys(usersSocket).length);

  io.emit("onlineUsers", Object.keys(usersSocket));

  socket.on("join-conversation", (conversationId) => {
    socket.join(`conv-${conversationId}`);
  });

  socket.on("leave-conversation", (conversationId) => {
    socket.leave(`conv-${conversationId}`);
    console.log(`❌ User ${socket.userId} left conv-${conversationId}`);
  });

  socket.on("disconnect", () => {
    delete usersSocket[userId];
    console.log(`❌ User disconnected: ${userId}`);

    io.emit("onlineUsers", Object.keys(usersSocket));
  });
});

export { io, server };
