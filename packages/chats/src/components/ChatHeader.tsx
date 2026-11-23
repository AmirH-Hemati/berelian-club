"use client";

import { Avatar, AvatarFallback, AvatarImage, Button, Badge } from "@repo/ui";
import { ArrowRight, FileText } from "lucide-react";
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
  const imageUrl = otherUser?.photo
    ? `https://api.berelianbg.ir/images/users/${otherUser?.photo}`
    : undefined;

  return (
    <header className="relative z-10 flex shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-3 py-3 shadow-sm backdrop-blur-xl sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="size-9 shrink-0 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowRight className="size-5" />
        </Button>

        <Avatar className="size-11 shrink-0 rounded-2xl border shadow-sm">
          <AvatarImage
            src={imageUrl}
            alt={`${otherUser?.firstName ?? ""} ${otherUser?.lastName ?? ""}`}
          />
          <AvatarFallback className="rounded-2xl bg-primary/10 font-semibold text-primary">
            {otherUser?.firstName?.[0]}
            {otherUser?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground sm:text-base">
            {otherUser?.firstName} {otherUser?.lastName}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <FileText className="size-3.5" />
              درخواست #{requestId}
            </span>

            <Badge
              variant={isActive ? "default" : "secondary"}
              className="h-5 rounded-md px-1.5 text-[10px]"
            >
              {isActive ? "گفتگو فعال" : "گفتگو بسته شده"}
            </Badge>
          </div>
        </div>
      </div>

      <ChatMenu
        requestId={requestId}
        conversationId={conversationId}
        isActive={isActive}
      />
    </header>
  );
}
