export const SocketEvents = {
  CONNECTION: "connection",

  ONLINE_USERS: "onlineUsers",

  JOIN_CONVERSATION: "join-conversation",

  LEAVE_CONVERSATION: "leave-conversation",

  NEW_MESSAGE: "newMessage",

  CONVERSATION_CLOSED: "conversationClosed",
} as const;
