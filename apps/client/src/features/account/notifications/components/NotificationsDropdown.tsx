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

import { convertDate } from "@/utils/helper";
import { NotificationType } from "@repo/schema";
import { Bell, Check, CheckCheck } from "lucide-react";
import { useMarkAllNotificationsAsRead } from "../hooks/useMarkAllNotificationsAsRead";
import { useMarkNotificationAsRead } from "../hooks/useMarkNotificationAsRead";
import { useMyNotifications } from "../hooks/useMyNotifications";
import { notificationTypes } from "../data/notificationTypes";
import Link from "next/link";

export default function NotificationsDropdown() {
  const { notifications, isLoading } = useMyNotifications();
  const { markAllAsRead, isMarkingAll } = useMarkAllNotificationsAsRead();
  const { markAsRead, isMarking } = useMarkNotificationAsRead();
  if (isLoading) return <Spinner />;
  console.log(notifications);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="size-4" />
          {notifications?.unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5  flex items-center justify-center bg-red-500  text-white! text-100">
              {notifications?.unreadCount > 99
                ? "99+"
                : notifications?.unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="md:w-96 w-full" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold text-300">اعلان‌ها</h3>

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
        </div>

        <ScrollArea
          className={cn(
            notifications?.notifications?.length === 0 ? "h-26" : "h-52",
          )}
        >
          {notifications?.notifications?.length === 0 ? (
            <div className="flex flex-col items-center mt-6 justify-center gap-2 ">
              <Bell className="size-8 text-muted-foreground/50" />
              <p className="text-200 text-muted-foreground">
                هیچ اعلانی وجود ندارد
              </p>
            </div>
          ) : (
            <div className="space-y-2 divide-y-2 divide-border p-1">
              {notifications?.notifications.map((notif: NotificationType) => {
                const Icon =
                  notificationTypes[
                    notif.type as keyof typeof notificationTypes
                  ].icon;
                const colorClass =
                  notificationTypes[
                    notif.type as keyof typeof notificationTypes
                  ].className;

                return (
                  <div
                    key={notif._id}
                    className={cn(
                      "p-3  transition-colors relative rounded-md group",
                      !notif.isRead && "bg-muted/30",
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className={cn(" rounded-full p-2", colorClass)}>
                        <Icon className="size-4" />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={cn(
                              "text-300 font-medium",
                              !notif.isRead && "text-primary",
                            )}
                          >
                            {notif.title}
                          </p>
                          <span className="text-100 text-muted-foreground ">
                            {convertDate(notif.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="space-y-1 flex-1 text-200 text-muted-foreground">
                            <p>{notif.message}</p>
                            {notif.link && (
                              <Link href={`/account${notif.link}`}>
                                <Button variant="link">مشاهده</Button>
                              </Link>
                            )}
                          </div>
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
                        </div>
                      </div>
                    </div>

                    {!notif.isRead && (
                      <div className="absolute top-3 right-3">
                        <div className="size-2 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
