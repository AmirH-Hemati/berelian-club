import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";

export default function ReceptionInfo({
  firstName,
  lastName,
  photo,
}: {
  firstName?: string;
  lastName?: string;
  photo?: string;
}) {
  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || "در انتظار تخصیص";

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}` || "?";

  const imageUrl = photo
    ? `${process.env.NEXT_PUBLIC_API_URL}/images/users/${photo}`
    : undefined;
  return (
    <div className="flex min-w-36 items-center gap-3">
      <Avatar className="relative size-10 rounded-xl border-border/70 bg-background hover:bg-muted">
        <AvatarImage src={imageUrl} />
        <AvatarFallback className="rounded-xl bg-primary/10 text-100 font-bold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="truncate text-200 font-semibold text-foreground">
          {fullName}
        </p>
        <p className="mt-1 text-100 text-muted-foreground">
          مسئول پیگیری درخواست
        </p>
      </div>
    </div>
  );
}
