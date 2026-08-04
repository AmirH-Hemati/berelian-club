"use client";

import { Avatar, AvatarFallback, AvatarImage,Button } from "@repo/ui";
import { ArrowRight } from "lucide-react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { ChatMenu } from "./ChatMenu";

interface ChatHeaderProps {
  otherUser: any;
  onBack: () => void;
  conversationId: string;
  requestId: string;
  isActive: boolean;
}

export function ChatHeader({
  otherUser,
  onBack,
  conversationId,
  requestId,
  isActive,
}: ChatHeaderProps) {
  const { isOnline } = useOnlineStatus(otherUser?._id);

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex items-center gap-3 ">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowRight className="size-5" />
        </Button>

        <Avatar className="size-9">
          <AvatarImage src={otherUser?.photo || ""} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {otherUser?.firstName?.[0] + otherUser?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold text-200">
            {otherUser?.firstName} {otherUser?.lastName}
          </p>
          <div className="flex items-center gap-1">
            <span
              className={`size-1.5 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
            />
            <span className="text-100 text-muted-foreground">
              {isOnline ? "آنلاین" : "آفلاین"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <ChatMenu
          requestId={requestId}
          conversationId={conversationId}
          isActive={isActive}
        />
      </div>
    </div>
  );
}
