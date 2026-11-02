"use client";

import { useChatNotifications } from "../hooks/useChatNotifications";
import { useNotificationEvents } from "../hooks/useNotificationEvents";

export function ChatNotificationListener() {
  useNotificationEvents();
  useChatNotifications();

  return null;
}
