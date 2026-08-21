"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  TableSkeleton,
  StatusBadge
} from "@repo/ui";

import { PaginationControls } from "@/components/PaginationControls";
import { convertDate } from "@/utils/helper";
import { AppointmentType } from "@repo/schema";
import { CircleAlert, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import Typebadge from "../../requests/components/Typebadge";
import { typesMap } from "../data/typesMap";
import { useAppointments } from "../hooks/useAppointments";
import { useDeleteAppointment } from "../hooks/useDeleteAppointment";

export default function AppointmentsTable() {
  const { appointments, pagination, isLoading, isError, refetch } =
    useAppointments();
  const { deleteAppointment, isDeleting } = useDeleteAppointment();
  if (isLoading) return <TableSkeleton />;

  return (
    <div className="border border-border py-2 rounded-lg! flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نوع مشاوره</TableHead>
            <TableHead>تاریخ مشاوره</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead className="text-center">جزئیات / عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isError && (
            <TableRow>
              <TableCell colSpan={4} className="py-10">
                <div className="flex flex-col items-center justify-center gap-3 ">
                  <CircleAlert className="size-8 text-destructive" />

                  <div className="flex flex-col items-center">
                    <p className="font-medium text-300">
                      خطا در دریافت اطلاعات
                    </p>
                    <p className="mt-1 text-200 text-muted-foreground">
                      متأسفانه اطلاعات در حال حاضر قابل دریافت نیست. لطفاً
                      دوباره تلاش کنید.
                    </p>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => refetch()}>
                    تلاش مجدد
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
          {!isError && appointments.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-muted-foreground"
              >
                <p className="text-300"> جلسه مشاوره ای یافت نشد</p>
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((appointment: AppointmentType) => (
              <TableRow key={appointment._id}>
                <TableCell className="font-medium">
                  <Typebadge type={appointment.type} types={typesMap} />
                </TableCell>
                <TableCell>
                  {convertDate(appointment.appointmentDate)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={appointment.status} />
                </TableCell>

                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">باز کردن منو</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`appointments/${appointment._id}`}>
                          مشاهده جزئیات مشاوره
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={() => deleteAppointment(appointment._id)}
                      >
                        حذف مشاوره
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <PaginationControls
        page={pagination?.page}
        totalPages={pagination?.totalPages}
      />
    </div>
  );
}
