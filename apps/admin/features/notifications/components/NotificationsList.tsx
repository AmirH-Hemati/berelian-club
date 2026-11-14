"use client";

import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Spinner,
  cn,
} from "@repo/ui";

import {
  Bell,
  Check,
  CheckCheck,
  ExternalLink,
  Inbox,
  RefreshCw,
} from "lucide-react";

import type { NotificationType } from "@repo/schema";

import { formatDate } from "@/utils/helper";

import { useMarkAllNotificationsAsRead } from "../hooks/useMarkAllNotificationsAsRead";
import { useMarkNotificationAsRead } from "../hooks/useMarkNotificationAsRead";
import { useMyNotifications } from "../hooks/useMyNotifications";
import { useUnreadNotificationsCount } from "../hooks/useUnreadNotificationsCount";

import { notificationTypes } from "../data/notificationTypes";
import { PaginationControls } from "@/features/files/components/PaginationControls";

export default function NotificationsList() {
  const { notifications, pagination, isLoading, isError, refetch } =
    useMyNotifications();

  const { markAllAsRead, isMarkingAll } = useMarkAllNotificationsAsRead();

  const { markAsRead, isMarking } = useMarkNotificationAsRead();

  const { unreadCount } = useUnreadNotificationsCount();

  const hasNotifications = notifications.length > 0;

  return (
    <Card className="overflow-hidden border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b bg-muted/20 ">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Bell className="size-4" />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-base">اعلان‌های شما</CardTitle>

            <p className="text-xs text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} اعلان خوانده‌نشده`
                : "همه اعلان‌ها خوانده شده‌اند"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 rounded-lg"
            onClick={() => markAllAsRead()}
            disabled={isMarkingAll}
          >
            {isMarkingAll ? (
              <Spinner className="size-4" />
            ) : (
              <CheckCheck className="size-4" />
            )}
            <span className="hidden sm:inline">خواندن همه</span>
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner className="size-7" />
          </div>
        ) : isError ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <RefreshCw className="size-5" />
            </div>

            <p className="text-sm text-muted-foreground">
              دریافت اعلان‌ها با مشکل مواجه شد.
            </p>

            <Button variant="outline" size="sm" onClick={() => refetch()}>
              تلاش مجدد
            </Button>
          </div>
        ) : !hasNotifications ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Inbox className="size-8" />
            </div>

            <div className="space-y-1 text-center">
              <p className="font-semibold">صندوق اعلان‌ها خالی است</p>
              <p className="text-sm text-muted-foreground">
                به محض دریافت اعلان جدید، آن را در این قسمت مشاهده می‌کنید.
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-80 ">
            <div className="space-y-3">
              {notifications.map((notif: NotificationType) => {
                const config = notificationTypes[
                  notif.type as keyof typeof notificationTypes
                ] ?? {
                  icon: Bell,
                  className: "bg-muted text-muted-foreground",
                };

                const Icon = config.icon;

                return (
                  <div
                    key={notif._id}
                    className={cn(
                      "group relative rounded-xl border p-3 transition-all duration-200 sm:p-4",
                      notif.isRead
                        ? "border-border/60 bg-background hover:bg-muted/30"
                        : "border-primary/20 bg-primary/[0.035] hover:bg-primary/[0.07]",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-11",
                          config.className,
                        )}
                      >
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-6">
                            {notif.title}
                          </p>

                          {!notif.isRead && (
                            <Badge
                              variant="secondary"
                              className="shrink-0 border-0 bg-primary/10 text-[10px] text-primary"
                            >
                              جدید
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs leading-6 text-muted-foreground sm:text-sm">
                          {notif.message}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-2">
                          <span className="text-[11px] text-muted-foreground">
                            {formatDate(notif.createdAt)}
                          </span>

                          <div className="flex items-center gap-1">
                            {notif.link && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 gap-1 px-2 text-xs text-primary hover:bg-primary/10"
                                asChild
                              >
                                <Link href={notif.link}>
                                  مشاهده جزئیات
                                  <ExternalLink className="size-3.5" />
                                </Link>
                              </Button>
                            )}

                            {!notif.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 gap-1 px-2 text-xs text-muted-foreground hover:text-primary"
                                disabled={isMarking}
                                onClick={() => markAsRead(notif._id)}
                              >
                                <Check className="size-3.5" />
                                خواندم
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

        {!isLoading && !isError && (pagination?.totalPages ?? 0) > 1 && (
          <div className="mt-4 border-t pt-4">
            <PaginationControls
              page={pagination.page}
              totalPages={pagination.totalPages}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
