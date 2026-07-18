import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/features/requests/components/StatusBadge";
import Typebadge from "@/features/requests/components/Typebadge";
import { useApproveRequest } from "@/features/requests/hooks/useApproveRequest";
import { useRejectRequest } from "@/features/requests/hooks/useRejectRequest";
import { formatDate } from "@/utils/helper";
import { RequestType } from "@repo/schema";
import {
  CheckCircle,
  Clock,
  FileText,
  Phone,
  User,
  XCircle,
} from "lucide-react";
type Props = { request: RequestType };
export default function RequestDataBox({ request }: Props) {
  const { approveRequest, isPending } = useApproveRequest();
  const { rejectRequest, isPending: isPending2 } = useRejectRequest();
  return (
    <Card className="mt-2 ">
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-sm">
              تاریخ ثبت درخواست : {formatDate(request.createdAt)}
            </span>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <Typebadge type={request.type} />
      </CardHeader>
      <Separator />

      <CardContent className=" space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <User />
            اطلاعات کاربر
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg ">
            <div className="flex items-center gap-2 text-sm bg-muted/20 rounded-lg px-3 py-2">
              <User className=" text-muted-foreground" />
              <span className="text-muted-foreground">نام:</span>
              <span className="font-medium">
                {request.user?.firstName + request.user?.lastName || "نامشخص"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm bg-muted/20 rounded-lg px-3 py-2">
              <Phone className="text-muted-foreground" />
              <span className="text-muted-foreground">موبایل:</span>
              <span className="font-medium ">
                {request.user?.phoneNumber || "نامشخص"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm bg-muted/20 rounded-lg px-3 py-2">
              <FileText className=" text-muted-foreground" />
              <span className="text-muted-foreground">کد ملی:</span>
              <span className="font-medium font-mono">
                {request.user.nationalCode}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
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
      </CardContent>
      <Separator />
      <CardFooter className="flex gap-2 justify-end w-full">
        <Button
          onClick={() => rejectRequest(request._id)}
          disabled={isPending2}
          variant="destructive"
          className="w-1/2 md:w-fit  "
        >
          <XCircle />
          رد درخواست
        </Button>
        <Button
          onClick={() => approveRequest(request._id)}
          disabled={isPending}
          className="w-1/2 md:w-fit "
        >
          <CheckCircle />
          تایید درخواست
        </Button>
      </CardFooter>
    </Card>
  );
}
