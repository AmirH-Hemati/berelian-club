"use client";

import { Button, Textarea } from "@repo/ui";
import { Send } from "lucide-react";
import { useState } from "react";
import useSendMessage from "../hooks/useSendMessage";

type Props = {
  setIsAtBottom: (isAtBottom: boolean) => void;
  conversationId: string;
  currentUserRole: string;
  isActive: boolean;
  sendFileIconAction?: React.ReactNode;
};

export default function InputMessage({
  setIsAtBottom,
  conversationId,
  currentUserRole,
  isActive,
  sendFileIconAction,
}: Props) {
  const [newMessage, setNewMessage] = useState("");
  const { sendMessage, isPending } = useSendMessage(conversationId);

  const handleSend = () => {
    if (!newMessage.trim() || isPending || !isActive) return;

    const content = newMessage.trim();

    sendMessage(content, {
      onSuccess: () => {
        setNewMessage("");
        setIsAtBottom(true);
      },
    });
  };

  return (
    <div className="shrink-0 border-t bg-background/95 px-3 py-3 backdrop-blur-xl sm:px-5">
      {!isActive && (
        <div className="mx-auto mb-3 max-w-4xl rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 text-center text-xs text-amber-700 dark:text-amber-400">
          این گفتگو غیرفعال است و امکان ارسال پیام وجود ندارد.
        </div>
      )}

      <div className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border bg-muted/30 p-2 shadow-sm transition-colors focus-within:border-primary/40 focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/10">
        {currentUserRole === "admin" && sendFileIconAction && (
          <div className="shrink-0 pb-0.5">{sendFileIconAction}</div>
        )}

        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={
            isActive ? "پیام خود را بنویسید..." : "گفتگو غیرفعال است"
          }
          className="min-h-10 max-h-32 flex-1 resize-none border-0 bg-transparent px-2 py-2.5 text-sm leading-6 shadow-none focus-visible:ring-0"
          disabled={isPending || !isActive}
          rows={1}
        />

        <Button
          size="icon"
          onClick={handleSend}
          disabled={!newMessage.trim() || isPending || !isActive}
          className="mb-0.5 size-10 shrink-0 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          {isPending ? (
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </div>

      <p className="mx-auto mt-2 max-w-4xl px-1 text-[10px] text-muted-foreground">
        برای ارسال پیام Enter و برای رفتن به خط بعد Shift + Enter را بزنید.
      </p>
    </div>
  );
}
