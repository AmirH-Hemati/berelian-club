"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSocket } from "@repo/chat";
import { MessageSquareText } from "lucide-react";

interface ChatNotificationPayload {
  _id: string;
  conversationId: string;
  requestId: string;
  sender: {
    firstName: string;
    lastName: string;
  };
  content: string;
  createdAt: string;
}

export function useChatNotifications() {
  const { socket, isConnected } = useSocket();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleChatNotification = (notification: ChatNotificationPayload) => {
      const isAccountPanel = pathname.startsWith("/account");

      const chatPath = isAccountPanel
        ? `/account/chat/${notification.requestId}`
        : `/chat/${notification.requestId}`;

      if (pathname === chatPath) return;

      const senderName = `${notification.sender.firstName} ${notification.sender.lastName}`;

      toast(
        <button
          type="button"
          dir="rtl"
          className="flex w-full items-start gap-3 text-right cursor-pointer"
          onClick={() => {
            toast.dismiss(notification._id);
            router.push(chatPath);
          }}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageSquareText />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="truncate text-200 font-bold text-gray-900 dark:text-white">
                {senderName}
              </span>

              <span className="shrink-0 text-100 text-primary">پیام جدید</span>
            </div>

            <p className="line-clamp-2 wrap-break-word text-200 leading-6 text-gray-600 dark:text-gray-300">
              {notification.content}
            </p>

            <p className="mt-2 text-100 font-medium text-primary">
              برای مشاهده پیام کلیک کنید
            </p>
          </div>
        </button>,
        {
          toastId: notification._id,
          position: "bottom-right",
          autoClose: 6000,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          rtl: true,
          icon: false,
          className:
            "!cursor-pointer !rounded-xl !border !border-gray-200 !bg-white !p-3 !shadow-xl dark:!border-gray-700 dark:!bg-gray-900",
        },
      );
    };

    socket.on("chat:notification", handleChatNotification);

    return () => {
      socket.off("chat:notification", handleChatNotification);
    };
  }, [socket, isConnected, pathname, router]);
}
