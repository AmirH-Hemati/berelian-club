"use client";
import AsyncState from "@/components/AsyncState";
import { CardSkeleton } from "@/components/CardSkeleton";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationType } from "@repo/schema";
import { Bell, Check, CheckCheck, FileQuestion } from "lucide-react";
import { useMarkAllNotificationsAsRead } from "../../notifications/hooks/useMarkAllNotificationsAsRead";
import { useMarkNotificationAsRead } from "../../notifications/hooks/useMarkNotificationAsRead";
import { useMyNotifications } from "../../notifications/hooks/useMyNotifications";

export default function NotificationsWidget() {
  const { notifications, isLoading, isError, refetch } = useMyNotifications();
  const { markAllAsRead, isMarkingAll } = useMarkAllNotificationsAsRead();
  const { markAsRead, isMarking } = useMarkNotificationAsRead();
  if (isLoading) return <CardSkeleton />;
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>اعلان‌های اخیر شما</CardTitle>
        {notifications?.notifications?.length !== 0 && (
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
        <AsyncState
          data={notifications?.notifications}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          loading={<CardSkeleton />}
          emptyTitle="هیچ اعلانی وجود ندارد."
          emptyDescription=" همه اعلان‌ها را بررسی کرده‌اید. به محض دریافت اعلان جدید، در اینجا
          نمایش داده می‌شود."
          emptyIcon={FileQuestion}
        >
          <ScrollArea className="h-80">
            {notifications?.notifications?.map((notif: NotificationType) => (
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
        </AsyncState>
      </CardContent>
    </Card>
  );
}
