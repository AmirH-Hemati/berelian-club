"use client";

import { ScrollArea, DownloadButton } from "@repo/ui";
import { cn } from "@repo/ui";
import { formatFileSize, formatTimeOnly } from "@/utils/helper";
import { FileIcon, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetConversationMessages } from "../hooks/useGetConversationMessages";
import { useJoinConversation } from "../hooks/useJoinConversation";
import { useNewMessages } from "../hooks/useNewMessage";
import InputMessage from "./InputMessage";
import { UserType } from "@repo/schema";

interface ChatWindowProps {
  conversationId: string;
  currentUser: UserType;
  isActive: boolean;
  sendFileIconAction?: React.ReactNode;
}

export function ChatWindow({
  conversationId,
  currentUser,
  isActive,
  sendFileIconAction,
}: ChatWindowProps) {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading } = useGetConversationMessages(conversationId);

  useJoinConversation(conversationId);
  useNewMessages(conversationId);

  useEffect(() => {
    if (messagesEndRef.current && isAtBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  const groupMessagesByDate = (messages: any[]) => {
    if (!messages) return [];
    const groups: any[] = [];
    let currentDate = "";

    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toLocaleDateString("fa-IR");
      if (date !== currentDate) {
        currentDate = date;
        groups.push({ date, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });
    return groups;
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-linear-to-b from-background to-muted/10">
      <ScrollArea className="flex-1 p-4  overflow-auto">
        <div className="space-y-6">
          {messages?.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="size-12 text-primary/40" />
              </div>
              <h3 className="font-semibold text-xl">شروع گفتگو</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2">
                اولین پیام را ارسال کنید و گفتگو را شروع کنید.
              </p>
            </div>
          ) : (
            groupedMessages.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <div className="flex items-center justify-center">
                  <span className="text-200 text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    {group.date === new Date().toLocaleDateString("fa-IR")
                      ? "امروز"
                      : group.date ===
                          new Date(Date.now() - 86400000).toLocaleDateString(
                            "fa-IR",
                          )
                        ? "دیروز"
                        : group.date}
                  </span>
                </div>

                {group.messages.map((msg: any, index: number) => {
                  const isOwn = msg.sender._id === currentUser?._id;

                  return (
                    <div
                      key={msg._id}
                      className={cn(
                        "flex animate-in fade-in slide-in-from-bottom-2 duration-200",
                        isOwn ? "justify-start" : "justify-end",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[65%] p-3.5 rounded-2xl shadow-sm",
                          isOwn
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-secondary text-secondary-foreground  border rounded-bl-none",
                        )}
                      >
                        {msg.type === "file" && msg.file ? (
                          <DownloadButton
                            fileId={msg.file._id}
                            originalName={msg.file.originalName}
                          >
                            <FileIcon className="size-6" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {msg.file.originalName}
                              </p>
                              <p className="text-xs opacity-70">
                                {formatFileSize(msg.file.size)}
                              </p>
                            </div>
                          </DownloadButton>
                        ) : (
                          <p className="text-300 wrap-break-word whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </p>
                        )}

                        <div
                          className={cn(
                            "flex items-center gap-1.5 mt-1.5",
                            isOwn ? "justify-start" : "justify-end",
                          )}
                        >
                          <span className="text-100 opacity-60">
                            {formatTimeOnly(msg.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      <InputMessage
        isActive={isActive}
        conversationId={conversationId}
        setIsAtBottom={setIsAtBottom}
        currentUserRole={currentUser?.role}
        sendFileIconAction={sendFileIconAction}
      />
    </div>
  );
}
