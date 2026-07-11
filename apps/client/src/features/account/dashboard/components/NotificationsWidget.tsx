"use client";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, BellOff, Check, CheckCheck } from "lucide-react";
import { useMarkNotificationAsRead } from "../../notifications/hooks/useMarkNotificationAsRead";
import { useMarkAllNotificationsAsRead } from "../../notifications/hooks/useMarkAllNotificationsAsRead";
import { useMyNotifications } from "../../notifications/hooks/useMyNotifications";
import { cn } from "@/lib/utils";
import { CardSkeleton } from "@/components/CardSkeleton";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";

export default function NotificationsWidget() {
  const { notifications, isLoading } = useMyNotifications();
  const { markAllAsRead, isMarkingAll } = useMarkAllNotificationsAsRead();
  const { markAsRead, isMarking } = useMarkNotificationAsRead();
  if (isLoading) return <CardSkeleton />;
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>اعلان‌های اخیر شما</CardTitle>
        {notifications.notifications.length !== 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => markAllAsRead()}
            disabled={isMarkingAll}
          >
            <CheckCheck className="size-4" />
            خواندن همه
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {(!notifications.notifications ||
          notifications.notifications.length === 0) && (
          <EmptyState
            title="هیچ اعلانی وجود ندارد."
            icon={BellOff}
            description=" همه اعلان‌ها را بررسی کرده‌اید. به محض دریافت اعلان جدید، در اینجا
          نمایش داده می‌شود."
          />
        )}
        <ScrollArea
          className={cn(notifications.notifications.length !== 0 && "h-80")}
        >
          {notifications.notifications.map((notif) => (
            <Alert key={notif._id} className="mb-3 group">
              <Bell />

              <AlertTitle className="text-sm font-medium">
                {notif.title}
              </AlertTitle>

              <AlertDescription className="text-xs text-muted-foreground">
                {notif.message}
              </AlertDescription>
              <AlertAction>
                {!notif.isRead && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className=" opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={isMarking}
                    onClick={() => markAsRead(notif._id)}
                  >
                    <Check className="size-4" />
                  </Button>
                )}
              </AlertAction>
            </Alert>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
