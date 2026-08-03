"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import useSendMessage from "../hooks/useSendMessage";

type Props = {
  setIsAtBottom: (isAtBottom: boolean) => void;
  conversationId: string;
  isActive: boolean;
};
export default function InputMessage({
  setIsAtBottom,
  conversationId,
  isActive,
}: Props) {
  const [newMessage, setNewMessage] = useState("");
  const { sendMessage, isPending } = useSendMessage(conversationId);

  const handleSend = () => {
    if (!newMessage.trim() || isPending || !isActive) return;
    sendMessage(newMessage, {
      onSettled: () => {
        setNewMessage("");
        setIsAtBottom(true);
      },
    });
  };
  return (
    <div className="p-3 border-t bg-background/95 backdrop-blur ">
      <div className="flex items-end gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="پیام خود را بنویسید..."
          className="min-h-10 max-h-30 resize-none overflow-y-auto wrap-break-word whitespace-pre-wrap flex-1 overflow-x-hidden py-2.5"
          disabled={isPending}
          rows={1}
        />

        <Button
          size="icon"
          onClick={handleSend}
          disabled={!newMessage.trim() || isPending || !isActive}
          className="shrink-0 size-9 mb-1 bg-primary hover:bg-primary/90"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
