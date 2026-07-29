import { formatDate } from "@/utils/helper";
import { UserType } from "@repo/schema";
import { Calendar, Mail, Phone, Shield } from "lucide-react";

type Props = { user: UserType };
export default function AccountInformation({ user }: Props) {
  return (
    <>
      <div className="space-y-1">
        <h3 className="text-300 font-semibold text-muted-foreground  ">
          اطلاعات تماس
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="flex items-center gap-1 text-sm bg-muted/30 rounded-lg px-3 py-2.5">
            <Mail className="size-4 text-muted-foreground " />
            <span className="text-300 text-muted-foreground">ایمیل:</span>
            <span className="text-300 font-medium truncate">
              {user.email || "—"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm bg-muted/30 rounded-lg px-3 py-2.5">
            <Phone className="size-4 text-muted-foreground " />
            <span className="text-300 text-muted-foreground">موبایل:</span>
            <span className="text-300 font-medium dir-ltr">
              {user.phoneNumber || "—"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-300 font-semibold text-muted-foreground  ">
          اطلاعات حساب
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="flex items-center gap-1 text-sm bg-muted/30 rounded-lg px-3 py-2.5">
            <Shield className="size-4 text-muted-foreground " />
            <span className="text-300 text-muted-foreground">نقش:</span>
            <span>
              {user.role === "admin" ? "ادمین" : ("سرمایه گذار" as string)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm bg-muted/30 rounded-lg px-3 py-2.5">
            <Calendar className="size-4 text-muted-foreground " />
            <span className="text-300 text-muted-foreground">تاریخ عضویت:</span>
            <span className="text-300 font-medium">
              {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-300 font-semibold text-muted-foreground">
          اطلاعات هویتی و بانکی
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {user.nationalCode && (
            <div className="flex items-center gap-1 text-sm bg-muted/30 rounded-lg px-3 py-2.5">
              <span className="text-300 text-muted-foreground">کد ملی:</span>
              <span className="text-300  font-medium">{user.nationalCode}</span>
            </div>
          )}
          {user.bankAccountNumber && (
            <div className="flex items-center gap-1 text-sm bg-muted/30 rounded-lg px-3 py-2.5">
              <span className="text-300 text-muted-foreground">
                شماره حساب:
              </span>
              <span className="text-300  font-medium">
                {user.bankAccountNumber}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
