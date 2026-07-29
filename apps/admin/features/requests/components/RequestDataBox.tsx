import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Typebadge from "@/features/requests/components/Typebadge";
import { useApproveRequest } from "@/features/requests/hooks/useApproveRequest";
import { formatDate } from "@/utils/helper";
import { RequestType } from "@repo/schema";
import {
  CheckCircle,
  CircleX,
  Clock,
  FileText,
  MessagesSquare,
  Phone,
  User,
  UserX,
} from "lucide-react";
import Link from "next/link";
import { RejectRequestDialog } from "./RejectRequestDialog";

type Props = { request: RequestType };

export default function RequestDataBox({ request }: Props) {
  const { approveRequest, isPending } = useApproveRequest();

  const isCancelled = request.status === "cancelled";

  return (
    <Card className="mt-2">
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-sm">
              تاریخ ثبت درخواست : {formatDate(request.createdAt)}
            </span>
          </div>

          {request.status === "approved" && (
            <Link href={`/chat/${request._id}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <MessagesSquare /> گفتگو
              </Button>
            </Link>
          )}
        </div>

        <Typebadge type={request.type} />
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-300 font-semibold flex items-center gap-2">
            <User />
            اطلاعات کاربر
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg">
            <div className="flex items-center gap-2 text-300 bg-muted/20 rounded-lg px-3 py-2">
              <User className="text-muted-foreground" />
              <span className="text-muted-foreground">نام:</span>
              <span className="font-medium">
                {request.user?.firstName + " " + request.user?.lastName ||
                  "نامشخص"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-300 bg-muted/20 rounded-lg px-3 py-2">
              <Phone className="text-muted-foreground" />
              <span className="text-muted-foreground">موبایل:</span>
              <span className="font-medium">
                {request.user?.phoneNumber || "نامشخص"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-300 bg-muted/20 rounded-lg px-3 py-2">
              <FileText className="text-muted-foreground" />
              <span className="text-muted-foreground">کد ملی:</span>
              <span className="font-medium font-mono">
                {request.user.nationalCode}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-300 font-semibold flex items-center gap-2">
            <FileText className="size-4" />
            توضیحات درخواست
          </h3>
          <div className="relative">
            <div className="bg-muted/30 rounded-lg p-4 border-r-4 border-primary">
              <p className="text-sm leading-relaxed">
                {request.description || "توضیحاتی وارد نشده است"}
              </p>
            </div>
          </div>
        </div>

        {isCancelled && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <CircleX className="size-5" />
              <h4 className="font-semibold text-300">درخواست کنسل شده</h4>
            </div>

            {request.cancellationReason && (
              <div className="pr-7">
                <p className="text-300 text-red-700 dark:text-red-300 leading-relaxed">
                  {request.cancellationReason}
                </p>
              </div>
            )}

            {request.cancelledBy && (
              <div className="flex items-center gap-1 pr-7 text-200 text-red-500 dark:text-red-400/70">
                <UserX className="size-3.5" />
                <span>
                  کنسل شده توسط:{""}
                  <span className="font-medium">
                    {request.cancelledBy?.firstName || "کاربر"}{" "}
                    {request.cancelledBy?.lastName || ""}
                  </span>
                </span>
                <span className="w-1 h-1 rounded-full bg-red-300 dark:bg-red-600" />
                <span>{formatDate(request.updatedAt)}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <Separator />

      {!isCancelled && (
        <CardFooter className="flex gap-2 justify-end w-full">
          <RejectRequestDialog requestId={request._id} />
          <Button
            onClick={() => approveRequest(request._id)}
            disabled={isPending}
            className="w-1/2 md:w-fit"
          >
            <CheckCircle />
            تایید درخواست
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
