"use client";

import {
  ScrollArea,
  DownloadButton,
  Spinner,
  Button,
  SidebarFooter,
} from "@repo/ui";
import { cn } from "@repo/ui";
import { formatFileSize, formatTimeOnly } from "@/utils/helper";
import { FileIcon, MessageCircle, Paperclip, ArrowDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useJoinConversation } from "../hooks/useJoinConversation";
import { useNewMessages } from "../hooks/useNewMessage";
import InputMessage from "./InputMessage";
import { UserType } from "@repo/schema";
import { useGetConversationMessages } from "../hooks/useGetConversationMessages";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { groupMessagesByDate } from "../helper/groupMessagesByDate";

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
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  // ScrollArea wrapper
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Actual Radix viewport
  const [scrollRoot, setScrollRoot] = useState<Element | null>(null);

  const isAtBottomRef = useRef(true);

  const previousLastMessageIdRef = useRef<string | null>(null);

  // Save scroll position before fetching older messages
  const pendingScrollAdjustmentRef = useRef<{
    scrollHeight: number;
    scrollTop: number;
  } | null>(null);

  const {
    messages,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetConversationMessages(conversationId);

  useJoinConversation(conversationId);
  useNewMessages(conversationId);

  // Find actual ScrollArea viewport
  useEffect(() => {
    if (isLoading) return;

    const viewport = scrollContainerRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]',
    );
    console.log(viewport);
    setScrollRoot(viewport ?? null);
  }, [isLoading]);

  // Reset local scroll state when conversation changes
  useEffect(() => {
    setIsAtBottom(true);
    isAtBottomRef.current = true;
    setInitialScrollDone(false);
    setNewMessagesCount(0);
    previousLastMessageIdRef.current = null;
    pendingScrollAdjustmentRef.current = null;
  }, [conversationId]);

  // Scroll to bottom
  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const viewport = scrollRoot as HTMLElement | null;

      if (!viewport) return;

      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior,
      });

      isAtBottomRef.current = true;
      setIsAtBottom(true);
      setNewMessagesCount(0);
    },
    [scrollRoot],
  );

  // Detect actual scroll position
  const handleScroll = useCallback(() => {
    const viewport = scrollRoot as HTMLElement | null;

    if (!viewport) return;

    const distanceFromBottom =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;

    const atBottom = distanceFromBottom <= 80;

    isAtBottomRef.current = atBottom;
    setIsAtBottom(atBottom);

    if (atBottom) {
      setNewMessagesCount(0);
    }
  }, [scrollRoot]);

  // Attach scroll listener to actual viewport
  useEffect(() => {
    if (!scrollRoot) return;

    scrollRoot.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      scrollRoot.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRoot, handleScroll]);

  // Fetch older messages and preserve current scroll position
  const loadOlderMessages = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage || !scrollRoot) {
      return;
    }

    const viewport = scrollRoot as HTMLElement;

    pendingScrollAdjustmentRef.current = {
      scrollHeight: viewport.scrollHeight,
      scrollTop: viewport.scrollTop,
    };

    try {
      await fetchNextPage();
    } catch (error) {
      pendingScrollAdjustmentRef.current = null;
      console.error("Failed to fetch older messages:", error);
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, scrollRoot]);

  // IntersectionObserver uses ScrollArea viewport as root
  const topSentinelRef = useIntersectionObserver(loadOlderMessages, {
    enabled:
      hasNextPage && !isFetchingNextPage && !!scrollRoot && initialScrollDone,
    root: scrollRoot,
    threshold: 0,
  });

  // Restore scroll position after older messages are rendered
  useLayoutEffect(() => {
    const pending = pendingScrollAdjustmentRef.current;

    if (!pending || isFetchingNextPage || !scrollRoot) {
      return;
    }

    const viewport = scrollRoot as HTMLElement;

    const heightDifference = viewport.scrollHeight - pending.scrollHeight;

    viewport.scrollTop = pending.scrollTop + heightDifference;

    pendingScrollAdjustmentRef.current = null;
  }, [messages?.length, isFetchingNextPage, scrollRoot]);

  // Initial scroll to latest message
  useLayoutEffect(() => {
    if (isLoading || initialScrollDone || !scrollRoot) {
      return;
    }

    scrollToBottom("auto");
    setInitialScrollDone(true);
  }, [isLoading, initialScrollDone, scrollRoot, scrollToBottom]);

  // Detect incoming messages
  useEffect(() => {
    if (isLoading || !messages?.length) return;

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) return;

    const lastMessageId = lastMessage._id;

    // First loaded message is not a new message
    if (!previousLastMessageIdRef.current) {
      previousLastMessageIdRef.current = lastMessageId;
      return;
    }

    // No new message
    if (previousLastMessageIdRef.current === lastMessageId) {
      return;
    }

    previousLastMessageIdRef.current = lastMessageId;

    const isOwnMessage =
      lastMessage.sender?._id?.toString() === currentUser?._id?.toString();

    // Ignore messages sent by current user
    if (isOwnMessage) return;

    if (isAtBottomRef.current) {
      scrollToBottom();
    } else {
      setNewMessagesCount((count) => count + 1);
    }
  }, [messages, isLoading, currentUser?._id, scrollToBottom]);

  const groupedMessages = groupMessagesByDate(messages ?? []);

  const today = new Date().toLocaleDateString("fa-IR");

  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("fa-IR");

  if (isLoading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Spinner />
          <p className="text-sm text-muted-foreground">
            در حال دریافت پیام‌ها...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-muted/10">
      {/* Messages and floating button */}
      <div ref={scrollContainerRef} className="relative min-h-0 flex-1">
        <ScrollArea className="h-full min-h-0">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-7 px-3 py-6 sm:px-6 sm:py-8">
            {/* Pagination sentinel */}
            <div ref={topSentinelRef} className="h-1 shrink-0" />

            {/* Loading older messages */}
            {isFetchingNextPage && (
              <div className="flex items-center justify-center gap-2 py-2">
                <Spinner />
                <span className="text-xs text-muted-foreground">
                  در حال دریافت پیام‌های قبلی...
                </span>
              </div>
            )}

            {/* Empty conversation */}
            {messages?.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center px-4 text-center">
                <div className="mb-5 flex size-20 items-center justify-center rounded-3xl border bg-background shadow-sm">
                  <MessageCircle className="size-9 text-primary/60" />
                </div>

                <h3 className="text-base font-bold text-foreground sm:text-lg">
                  شروع گفت‌وگو
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">
                  هنوز پیامی برای این درخواست ثبت نشده است. می‌توانید از طریق
                  کادر پایین، پیام خود را ارسال کنید.
                </p>
              </div>
            ) : (
              groupedMessages.map((group) => (
                <div key={group.date} className="space-y-5">
                  {/* Date separator */}
                  <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-x-0 top-1/2 border-t border-border/60" />

                    <span className="relative rounded-full border border-border/70 bg-background px-4 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm">
                      {group.date === today
                        ? "امروز"
                        : group.date === yesterday
                          ? "دیروز"
                          : group.date}
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="space-y-4">
                    {group.messages.map((msg: any) => {
                      const isOwn =
                        msg.sender?._id?.toString() ===
                        currentUser?._id?.toString();

                      const senderName = isOwn
                        ? "شما"
                        : `${msg.sender?.firstName ?? ""} ${
                            msg.sender?.lastName ?? ""
                          }`.trim();

                      return (
                        <div
                          key={msg._id}
                          className={cn(
                            "flex w-full animate-in fade-in slide-in-from-bottom-1 duration-200",
                            isOwn ? "justify-start" : "justify-end",
                          )}
                        >
                          <div
                            className={cn(
                              "flex max-w-[90%] flex-col gap-1.5 sm:max-w-[75%] lg:max-w-[65%]",
                              isOwn ? "items-start" : "items-end",
                            )}
                          >
                            {/* Sender name */}
                            <span className="px-1 text-[11px] font-medium text-muted-foreground">
                              {senderName || "کاربر"}
                            </span>

                            {/* Message bubble */}
                            <div
                              className={cn(
                                "min-w-[100px] rounded-2xl px-4 py-3 shadow-sm",
                                isOwn
                                  ? "rounded-br-md bg-primary text-primary-foreground"
                                  : "rounded-bl-md border border-border/70 bg-background text-foreground",
                              )}
                            >
                              {/* File message */}
                              {msg.type === "file" && msg.file ? (
                                <DownloadButton
                                  fileId={msg.file._id}
                                  originalName={msg.file.originalName}
                                >
                                  <div
                                    className={cn(
                                      "flex min-w-0 items-center gap-3 rounded-xl p-2 transition-colors",
                                      isOwn
                                        ? "bg-white/10 hover:bg-white/15"
                                        : "bg-muted/60 hover:bg-muted",
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "flex size-11 shrink-0 items-center justify-center rounded-xl",
                                        isOwn
                                          ? "bg-white/15"
                                          : "bg-primary/10 text-primary",
                                      )}
                                    >
                                      <FileIcon className="size-5" />
                                    </div>

                                    <div className="min-w-0 flex-1 text-right">
                                      <p className="max-w-[200px] truncate text-sm font-medium">
                                        {msg.file.originalName}
                                      </p>

                                      <p className="mt-1 text-[11px] opacity-70">
                                        {formatFileSize(msg.file.size)}
                                      </p>
                                    </div>

                                    <Paperclip className="size-4 shrink-0 opacity-60" />
                                  </div>
                                </DownloadButton>
                              ) : (
                                <p className="break-words whitespace-pre-wrap text-sm leading-7">
                                  {msg.content}
                                </p>
                              )}

                              {/* Message time */}
                              <div
                                className={cn(
                                  "mt-2 flex items-center gap-1.5",
                                  isOwn ? "justify-start" : "justify-end",
                                )}
                              >
                                <span className="text-[10px] opacity-60">
                                  {formatTimeOnly(msg.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Scroll to bottom button */}
        {!isAtBottom && initialScrollDone && (
          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center">
            <Button
              type="button"
              onClick={() => scrollToBottom()}
              className="pointer-events-auto size-11 rounded-full shadow-lg"
              aria-label="رفتن به آخرین پیام"
            >
              <ArrowDown className="size-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Message composer */}
      <InputMessage
        isActive={isActive}
        conversationId={conversationId}
        setIsAtBottom={() => scrollToBottom()}
        currentUserRole={currentUser?.role}
        sendFileIconAction={sendFileIconAction}
      />
    </div>
  );
}
