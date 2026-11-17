"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Separator,
  StatusBadge,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui";

import {
  CalendarDays,
  Clock3,
  FileText,
  UserRound,
  Phone,
  CreditCard,
  UserCheck,
  Trash2,
  CalendarCheck,
  CircleCheck,
  AlertCircle,
} from "lucide-react";
import { formatDate } from "@/utils/helper";
import SectionTitle from "@/features/components/SectionTitle";
import InfoItem from "@/features/components/InfoItem";
import { RequestType } from "@repo/schema";

type Props = {
  request: RequestType;
};

const requestTypes: Record<string, string> = {
  renew_contract: "تمدید قرارداد",
  increase_investment: "افزایش سرمایه‌گذاری",
  decrease_investment: "کاهش سرمایه‌گذاری",
};

const contractStatuses: Record<string, string> = {
  active: "فعال",
  expired: "منقضی شده",
  pending: "در انتظار",
};

export default function UserRequestDataBox({ request }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const investor = request.investor;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="size-5" />
            </div>

            <div>
              <CardTitle className="text-lg">
                {requestTypes[request.type] || "درخواست"}
              </CardTitle>

              <CardDescription className="mt-1">
                جزئیات درخواست شما
              </CardDescription>
            </div>
          </div>

          <StatusBadge status={request.status} />
        </div>

        <div className="text-xs text-muted-foreground">
          شناسه درخواست: {request._id}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 pt-6">
        <section className="space-y-4">
          <SectionTitle
            icon={<FileText className="size-5" />}
            title="اطلاعات درخواست"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<CalendarDays className="size-5" />}
              label="تاریخ ثبت درخواست"
              value={formatDate(request.createdAt)}
            />

            <InfoItem
              icon={<Clock3 className="size-5" />}
              label="آخرین بروزرسانی"
              value={formatDate(request.updatedAt)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">توضیحات درخواست</p>

            <div className="rounded-xl bg-muted/50 p-4 text-sm leading-7">
              {request.description || "توضیحاتی ثبت نشده است."}
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <SectionTitle
            icon={<UserRound className="size-5" />}
            title="اطلاعات حساب کاربری"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<UserRound className="size-5" />}
              label="نام و نام خانوادگی"
              value={`${investor?.firstName || ""} ${investor?.lastName || ""}`}
            />

            <InfoItem
              icon={<Phone className="size-5" />}
              label="شماره تماس"
              value={investor?.phoneNumber}
            />

            <InfoItem
              icon={<CreditCard className="size-5" />}
              label="کد ملی"
              value={investor?.nationalCode}
            />

            <InfoItem
              icon={<CalendarCheck className="size-5" />}
              label="وضعیت قرارداد"
              value={contractStatuses[investor?.contractStatus] || "نامشخص"}
            />

            <InfoItem
              icon={<Clock3 className="size-5" />}
              label="روزهای باقی‌مانده قرارداد"
              value={
                investor?.contractDaysRemaining != null
                  ? `${investor.contractDaysRemaining} روز`
                  : "—"
              }
            />
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <SectionTitle
            icon={<UserCheck className="size-5" />}
            title="اطلاعات پیگیری"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<UserCheck className="size-5" />}
              label="مسئول رسیدگی"
              value={
                request.assignedTo
                  ? `${request.assignedTo.firstName} ${request.assignedTo.lastName}`
                  : "هنوز مسئول رسیدگی مشخص نشده است"
              }
            />

            <InfoItem
              icon={<CalendarDays className="size-5" />}
              label="تاریخ ارجاع"
              value={request.assignedAt ? formatDate(request.assignedAt) : "—"}
            />

            <InfoItem
              icon={<CircleCheck className="size-5" />}
              label="تاریخ تکمیل"
              value={
                request.completedAt ? formatDate(request.completedAt) : "—"
              }
            />
          </div>
        </section>

        {(request.cancellationReason || request.cancelledBy) && (
          <>
            <Separator />

            <section className="space-y-4">
              <SectionTitle
                icon={<AlertCircle className="size-5" />}
                title="اطلاعات لغو درخواست"
              />

              {request.cancellationReason && (
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="mb-2 text-sm text-muted-foreground">دلیل لغو</p>

                  <p className="text-sm leading-7">
                    {request.cancellationReason}
                  </p>
                </div>
              )}

              {request.cancelledBy && (
                <InfoItem
                  icon={<UserRound className="size-5" />}
                  label="لغو شده توسط"
                  value={`${request.cancelledBy.firstName || ""} ${
                    request.cancelledBy.lastName || ""
                  }`}
                />
              )}
            </section>
          </>
        )}

        {request.status === "pending" && (
          <>
            <Separator />

            <div className="flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">حذف درخواست</p>

                <p className="text-xs leading-6 text-muted-foreground">
                  در صورت حذف، درخواست شما از سیستم حذف خواهد شد.
                </p>
              </div>

              <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="shrink-0"
                >
                  <Trash2 className="ml-2 size-4" />
                  حذف درخواست
                </Button>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      آیا از حذف درخواست مطمئن هستید؟
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      این عملیات قابل بازگشت نیست. آیا می‌خواهید درخواست خود را
                      حذف کنید؟
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>انصراف</AlertDialogCancel>

                    <AlertDialogAction
                    // disabled={isDeleting}
                    // onClick={(event) => {
                    //   event.preventDefault();
                    //   onDelete();
                    // }}
                    >
                      {/* {isDeleting ? "در حال حذف..." : "بله، حذف شود"} */}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
