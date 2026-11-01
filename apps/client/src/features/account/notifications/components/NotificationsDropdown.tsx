"use client";

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  ScrollArea,
  Spinner,
  cn,
} from "@repo/ui";

import { NotificationType } from "@repo/schema";
import { Bell, Check, CheckCheck, ExternalLink, Inbox } from "lucide-react";

import Link from "next/link";

import { useMarkAllNotificationsAsRead } from "../hooks/useMarkAllNotificationsAsRead";
import { useMarkNotificationAsRead } from "../hooks/useMarkNotificationAsRead";
import { useMyNotifications } from "../hooks/useMyNotifications";
import { useUnreadNotificationsCount } from "../hooks/useUnreadNotificationsCount";

import { notificationTypes } from "../data/notificationTypes";
import { convertDate } from "@/utils/helper";

export default function NotificationsDropdown() {
  const { notifications, isLoading } = useMyNotifications();

  const { markAllAsRead, isMarkingAll } = useMarkAllNotificationsAsRead();

  const { markAsRead, isMarking } = useMarkNotificationAsRead();

  const { unreadCount, isLoading: isCountLoading } =
    useUnreadNotificationsCount();

  const notificationList = notifications?.notifications ?? [];

  const hasNotifications = notificationList.length > 0;
  const hasUnread = unreadCount > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative size-10 rounded-xl border-border/70 bg-background hover:bg-muted"
          aria-label="اعلان‌ها"
        >
          <Bell />

          {!isCountLoading && hasUnread && (
            <Badge className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-background bg-destructive px-1 text-100 font-bold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}

          {isCountLoading && (
            <span className="absolute -right-1 -top-1 size-2 rounded-full bg-muted-foreground animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[calc(100vw-2rem)] max-w-[400px] overflow-hidden rounded-2xl border-border/70 p-0 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bell />
            </div>

            <div>
              <h3 className="text-300 font-bold">اعلان‌ها</h3>

              <p className="text-100 text-muted-foreground">
                {isCountLoading
                  ? "در حال دریافت..."
                  : hasUnread
                    ? `${unreadCount} اعلان خوانده‌نشده`
                    : "همه اعلان‌ها خوانده شده‌اند"}
              </p>
            </div>
          </div>

          {hasUnread && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 rounded-lg text-100 text-primary hover:text-primary"
              onClick={() => markAllAsRead()}
              disabled={isMarkingAll}
            >
              {isMarkingAll ? (
                <Spinner className="size-3.5" />
              ) : (
                <CheckCheck className="size-4" />
              )}
              خواندن همه
            </Button>
          )}
        </div>

        {/* Notification List */}
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <Spinner />
          </div>
        ) : !hasNotifications ? (
          <div className="flex h-52 flex-col items-center justify-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
              <Inbox className="size-7 text-muted-foreground" />
            </div>

            <div className="text-center">
              <p className="text-200 font-semibold">صندوق اعلان‌ها خالی است</p>

              <p className="mt-1 text-100 text-muted-foreground">
                در حال حاضر اعلان جدیدی ندارید.
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[360px]">
            <div className="space-y-1 p-2">
              {notificationList.map((notif: NotificationType) => {
                const config = notificationTypes[
                  notif.type as keyof typeof notificationTypes
                ] ?? {
                  icon: Bell,
                  className: "bg-muted text-muted-foreground",
                };

                const Icon = config.icon;
                const colorClass = config.className;

                return (
                  <div
                    key={notif._id}
                    className={cn(
                      "group relative rounded-xl p-3 transition-colors",
                      notif.isRead
                        ? "hover:bg-muted/60"
                        : "bg-primary/[0.045] hover:bg-primary/[0.08]",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl",
                          colorClass,
                        )}
                      >
                        <Icon />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={cn(
                              "text-200 leading-6",
                              notif.isRead
                                ? "font-medium"
                                : "font-bold text-foreground",
                            )}
                          >
                            {notif.title}
                          </p>

                          {!notif.isRead && (
                            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                          )}
                        </div>

                        <p className="text-100 leading-6 text-muted-foreground">
                          {notif.message}
                        </p>

                        <div className="flex items-center justify-between gap-2 pt-1">
                          <span className="text-100 text-muted-foreground">
                            {convertDate(notif.createdAt)}
                          </span>

                          <div className="flex items-center gap-1">
                            {notif.link && (
                              <Link
                                href={`/account${notif.link}`}
                                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-100 font-medium text-primary transition-colors hover:bg-primary/10"
                              >
                                مشاهده
                                <ExternalLink className="size-3" />
                              </Link>
                            )}

                            {!notif.isRead && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="size-7 rounded-lg text-muted-foreground hover:text-primary"
                                title="علامت‌گذاری به‌عنوان خوانده‌شده"
                                aria-label="خوانده‌شدن اعلان"
                                disabled={isMarking}
                                onClick={() => markAsRead(notif._id)}
                              >
                                <Check className="size-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}

        {/* Footer */}
        {hasNotifications && (
          <div className="border-t bg-muted/20 p-2">
            <Link
              href="/account/notifications"
              className="flex items-center justify-center rounded-lg py-2 text-100 font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
            >
              مشاهده همه اعلان‌ها
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
