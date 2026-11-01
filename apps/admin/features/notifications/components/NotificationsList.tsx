"use client";

import Link from "next/link";

import AsyncState from "@/components/AsyncState";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  CardSkeleton,
} from "@repo/ui";

import type { NotificationType } from "@repo/schema";

import { Bell, Check, CheckCheck, FileQuestion, ArrowLeft } from "lucide-react";

import { useMarkAllNotificationsAsRead } from "../hooks/useMarkAllNotificationsAsRead";
import { useMarkNotificationAsRead } from "../hooks/useMarkNotificationAsRead";
import { useMyNotifications } from "../hooks/useMyNotifications";
import { useUnreadNotificationsCount } from "../hooks/useUnreadNotificationsCount";

export default function NotificationsList() {
  const { notifications, isLoading, isError, refetch } = useMyNotifications();
  const { markAllAsRead, isMarkingAll } = useMarkAllNotificationsAsRead();
  const { markAsRead, isMarking } = useMarkNotificationAsRead();
  const { unreadCount, isLoading: isReading } = useUnreadNotificationsCount();

  const notificationList = notifications?.notifications ?? [];

  if (isLoading || isReading) return <CardSkeleton />;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Bell className="size-4" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-300 font-semibold">اعلان‌های اخیر</h3>

            <p className="text-xs text-muted-foreground">
              {unreadCount && unreadCount > 0
                ? `${unreadCount} اعلان خوانده‌نشده`
                : "همه اعلان‌ها خوانده شده‌اند"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 shrink-0 gap-1.5 px-2 text-xs text-muted-foreground hover:text-primary"
            onClick={() => markAllAsRead()}
            disabled={isMarkingAll}
          >
            <CheckCheck className="size-4" />
            خواندن همه
          </Button>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <AsyncState
          data={notificationList}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="اعلانی وجود ندارد"
          emptyDescription="به محض دریافت اعلان جدید، آن را در این قسمت مشاهده می‌کنید."
          emptyIcon={FileQuestion}
        >
          <ScrollArea className="h-80 pl-2">
            <div className="space-y-2">
              {notificationList.map((notif: NotificationType) => (
                <div
                  key={notif._id}
                  className={`group relative flex gap-3 rounded-xl border p-3 transition-colors ${
                    notif.isRead
                      ? "border-border/60 bg-background hover:bg-muted/30"
                      : "border-primary/15 bg-primary/4 hover:bg-primary/[0.07]"
                  }`}
                >
                  {/* Notification icon */}
                  <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                    <Bell className="size-4" />

                    {!notif.isRead && (
                      <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-background bg-primary" />
                    )}
                  </div>

                  {/* Notification content */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm leading-6 ${
                          notif.isRead
                            ? "font-medium text-foreground"
                            : "font-semibold text-foreground"
                        }`}
                      >
                        {notif.title}
                      </p>

                      {!notif.isRead && (
                        <span className="mt-1 shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          جدید
                        </span>
                      )}
                    </div>

                    <p className="text-xs leading-5 text-muted-foreground">
                      {notif.message}
                    </p>

                    {/* Notification link */}
                    {notif.link && (
                      <div className="pt-1">
                        <Link
                          href={notif.link}
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                        >
                          مشاهده جزئیات
                          <ArrowLeft className="size-3.5" />
                        </Link>
                      </div>
                    )}

                    {/* Actions */}
                    {!notif.isRead && (
                      <div className="flex justify-end pt-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 gap-1.5 px-2 text-xs text-primary hover:bg-primary/10"
                          disabled={isMarking}
                          onClick={() => markAsRead(notif._id)}
                        >
                          <Check className="size-3.5" />
                          خواندم
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </AsyncState>
      </CardContent>
    </Card>
  );
}
