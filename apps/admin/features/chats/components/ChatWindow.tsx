"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/features/authentication/hooks/useUser";
import { formatTime } from "@/utils/helper";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetConversationMessages } from "../hooks/useGetConversationMessages";
import { useJoinConversation } from "../hooks/useJoinConversation";
import useSendMessage from "../hooks/useSendMessage";
import { useNewMessages } from "../hooks/useNewMessage";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

interface ChatWindowProps {
  conversationId: string;
  otherUserId: string;
}

export function ChatWindow({ conversationId,otherUserId }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  const { user, isLoading: isLoading2 } = useUser();
  const { messages, isLoading } = useGetConversationMessages(conversationId);
  const { sendMessage, isPending } = useSendMessage(conversationId);
  const { isOnline } = useOnlineStatus(otherUserId);

  useJoinConversation(conversationId);
  useNewMessages(conversationId);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSend = () => {
    if (!newMessage.trim() || isPending) return;
    sendMessage(newMessage, {
      onSettled: () => {
        setNewMessage("");
      },
    });
  };

  if (isLoading || isLoading2) {
    return (
      <div className="text-center text-muted-foreground">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-100 border rounded-lg">
      <ScrollArea className="flex-1 p-4">
        {isOnline ?"انلاین" : "افلاین"}
        <div className="space-y-3">
          {messages?.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              پیامی وجود ندارد. اولین پیام را ارسال کنید.
            </div>
          ) : (
            messages?.map((msg: any) => {
              const isOwn = msg.sender._id === user._id;
              return (
                <div
                  key={msg._id}
                  className={`flex ${isOwn ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="size-6">
                        <AvatarFallback className="text-xs">
                          {msg.sender.firstName?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">
                        {msg.sender.firstName} {msg.sender.lastName}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm wrap-break-word">{msg.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div ref={messageEndRef} />
      </ScrollArea>

      <div className="flex items-center gap-2 p-3 border-t">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="پیام خود را بنویسید..."
          disabled={isPending}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!newMessage.trim() || isPending}
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
