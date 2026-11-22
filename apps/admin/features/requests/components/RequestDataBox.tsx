"use client";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  Separator,
  Badge,
  SectionTitle,
  InfoItem,
} from "@repo/ui";

import {
  CheckCircle,
  CircleX,
  Clock,
  FileText,
  MessagesSquare,
  Phone,
  User,
  UserCheck,
  UserX,
  CalendarDays,
  Hash,
  ClipboardCheck,
  CalendarCheck,
} from "lucide-react";

import Link from "next/link";

import Typebadge from "@/features/requests/components/Typebadge";
import { useApproveRequest } from "@/features/requests/hooks/useApproveRequest";
import { useCompleteRequest } from "../hooks/useCompleteRequest";

import { formatDate } from "@/utils/helper";
import { RequestType } from "@repo/schema";

import { RejectRequestDialog } from "./RejectRequestDialog";

type Props = {
  request: RequestType;
};

export default function RequestDataBox({ request }: Props) {
  const { approveRequest, isPending } = useApproveRequest();
  const { completeRequest, isCompleting } = useCompleteRequest();

  const investor = request.investor;
  const assignedTo = request.assignedTo;
  const cancelledBy = request.cancelledBy;

  const isCancelled = request.status === "cancelled";
  const isCompleted = request.status === "completed";

  const canOpenConversation = request.status === "approved";

  const investorName = [investor?.firstName, investor?.lastName]
    .filter(Boolean)
    .join(" ");

  const assignedToName = [assignedTo?.firstName, assignedTo?.lastName]
    .filter(Boolean)
    .join(" ");

  const cancelledByName = [cancelledBy?.firstName, cancelledBy?.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <Card className="mt-2 overflow-hidden">
      {/* Header */}
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="size-5 text-primary" />
              جزئیات درخواست
            </CardTitle>

            <CardDescription>اطلاعات درخواست و وضعیت پیگیری آن</CardDescription>
          </div>
          {canOpenConversation && (
            <Link href={`/chat/${request._id}`}>
              <Button variant="outline" size="sm">
                <MessagesSquare className="size-4" />
                گفتگو
              </Button>
            </Link>
          )}{" "}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>تاریخ ثبت: {formatDate(request.createdAt)}</span>
          </div>

          <Typebadge type={request.type} />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 pt-6">
        {/* Investor Information */}
        <section className="space-y-4">
          <SectionTitle
            icon={<User className="size-5" />}
            title="اطلاعات سرمایه‌گذار"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem
              icon={<User className="size-4" />}
              label="نام و نام خانوادگی"
              value={investorName || "نامشخص"}
            />

            <InfoItem
              icon={<Phone className="size-4" />}
              label="شماره موبایل"
              value={investor?.phoneNumber || "ثبت نشده"}
            />

            <InfoItem
              icon={<FileText className="size-4" />}
              label="کد ملی"
              value={investor?.nationalCode || "ثبت نشده"}
            />
          </div>
        </section>

        <Separator />

        {/* Request Information */}
        <section className="space-y-4">
          <SectionTitle
            icon={<ClipboardCheck className="size-5" />}
            title="اطلاعات درخواست"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem
              icon={<Hash className="size-4" />}
              label="شناسه درخواست"
              value={<span className="font-mono text-xs">{request._id}</span>}
            />

            <InfoItem
              icon={<CalendarDays className="size-4" />}
              label="تاریخ ثبت درخواست"
              value={formatDate(request.createdAt)}
            />
          </div>

         
        </section>

{/* Request Description */}
<Separator />

<section className="space-y-4">
  <SectionTitle
    icon={<FileText className="size-5" />}
    title="توضیحات درخواست"
  />

  <div className="rounded-xl bg-muted/50 p-4">
    <p className="text-sm leading-7 whitespace-pre-wrap">
      {request.description || "توضیحاتی ثبت نشده است."}
    </p>
  </div>
</section>
        <Separator />

        {/* Assignment Information */}
        <section className="space-y-4">
          <SectionTitle
            icon={<UserCheck className="size-5" />}
            title="اطلاعات ارجاع درخواست"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem
              icon={<UserCheck className="size-4" />}
              label="مسئول پیگیری"
              value={assignedToName || "هنوز ارجاع داده نشده"}
            />

            <InfoItem
              icon={<CalendarCheck className="size-4" />}
              label="تاریخ ارجاع"
              value={
                request.assignedAt
                  ? formatDate(request.assignedAt)
                  : "ارجاع داده نشده"
              }
            />
          </div>
        </section>

        {/* Cancellation Information */}
        {isCancelled && (
          <>
            <Separator />

            <section className="space-y-4">
              <SectionTitle
                icon={<CircleX className="size-5" />}
                title="اطلاعات لغو درخواست"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={<UserX className="size-4" />}
                  label="لغو شده توسط"
                  value={cancelledByName || "نامشخص"}
                />

                <InfoItem
                  icon={<Clock className="size-4" />}
                  label="آخرین تاریخ تغییر"
                  value={formatDate(request.updatedAt)}
                />
              </div>

              <InfoItem
                icon={<FileText className="size-4" />}
                label="دلیل لغو"
                value={
                  <p className="whitespace-pre-wrap leading-7">
                    {request.cancellationReason ||
                      "دلیلی برای لغو ثبت نشده است"}
                  </p>
                }
              />
            </section>
          </>
        )}

        {/* Completion Information */}
        {isCompleted && (
          <>
            <Separator />

            <section className="space-y-4">
              <SectionTitle
                icon={<CheckCircle className="size-5" />}
                title="اطلاعات تکمیل درخواست"
              />

              <InfoItem
                icon={<CalendarCheck className="size-4" />}
                label="تاریخ تکمیل"
                value={
                  request.completedAt
                    ? formatDate(request.completedAt)
                    : "ثبت نشده"
                }
              />

              <InfoItem
                icon={<UserCheck className="size-4" />}
                label="مسئول پیگیری"
                value={assignedToName || "نامشخص"}
              />
            </section>
          </>
        )}
      </CardContent>

      {/* Actions */}
      {(request.status === "pending" || request.status === "approved") && (
        <>
          <Separator />

          <CardFooter className="flex flex-wrap justify-end gap-2 py-4">
            {request.status === "pending" && (
              <>
                <RejectRequestDialog requestId={request._id} />

                <Button
                  onClick={() => approveRequest(request._id)}
                  disabled={isPending}
                >
                  <CheckCircle className="size-4" />
                  {isPending ? "در حال تأیید..." : "تأیید درخواست"}
                </Button>
              </>
            )}

            {request.status === "approved" && (
              <Button
                onClick={() => completeRequest(request._id)}
                disabled={isCompleting}
              >
                <CheckCircle className="size-4" />
                {isCompleting ? "در حال تکمیل..." : "تکمیل درخواست"}
              </Button>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
