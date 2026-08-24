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
    origin: [
      "http://localhost:4001",
      "http://localhost:4002",
      "https://berelianclub.onrender.com",
      "https://berelianclub-admin.onrender.com",
    ],
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
    // console.log(
    //   new Date().toLocaleString("fa-IR"),
    //   `✅ User ${socket.user.firstName} join conv-${conversationId}`,
    // );
  });

  socket.on("leave-conversation", (conversationId) => {
    socket.leave(`conv-${conversationId}`);
    // console.log(
    //   new Date().toLocaleString("fa-IR"),
    //   `❌ User ${socket.user.firstName} left conv-${conversationId}`,
    // );
  });

  socket.on("disconnect", () => {
    delete usersSocket[userId];
    // console.log(
    //   new Date().toLocaleString("fa-IR"),
    //   `❌ User disconnected: ${userId}`,
    // );

    io.emit("onlineUsers", Object.keys(usersSocket));
  });
});

export { io, server };
