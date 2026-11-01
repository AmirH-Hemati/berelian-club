import { Avatar, AvatarFallback } from "@repo/ui";

export default function ReceptionInfo({
  firstName,
  lastName,
}: {
  firstName?: string;
  lastName?: string;
}) {
  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || "در انتظار تخصیص";

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}` || "?";

  return (
    <div className="flex min-w-36 items-center gap-3">
      <Avatar className="relative size-10 rounded-xl border-border/70 bg-background hover:bg-muted">
        <AvatarFallback className="rounded-xl bg-primary/10 text-xs font-bold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {fullName}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          مسئول پیگیری درخواست
        </p>
      </div>
    </div>
  );
}
