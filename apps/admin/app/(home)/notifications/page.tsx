import NotificationsList from "@/features/notifications/components/NotificationsList";

export default function NotificationsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 p-4 sm:p-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">اعلان‌ها</h1>
        <p className="text-sm text-muted-foreground">
          تمام پیام‌ها و رویدادهای مرتبط با حساب کاربری شما
        </p>
      </div>

      <NotificationsList />
    </div>
  );
}