"use client";
export default function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center text-muted-foreground">
        {icon}
      </div>

      <div className="min-w-0 space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <div className="text-sm font-medium wrap-break-word">{value || "—"}</div>
      </div>
    </div>
  );
}
