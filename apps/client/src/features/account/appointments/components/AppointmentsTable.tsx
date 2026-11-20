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
  DropdownMenuTrigger,
  Button,
  TableSkeleton,
  StatusBadge,
  DropdownMenuSeparator,
} from "@repo/ui";

import { PaginationControls } from "@/components/PaginationControls";
import { convertDate } from "@/utils/helper";
import { AppointmentType } from "@repo/schema";
import {
  CalendarDays,
  CircleAlert,
  Clock3,
  MoreHorizontalIcon,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import Typebadge from "../../requests/components/Typebadge";
import { typesMap } from "../data/typesMap";
import { useAppointments } from "../hooks/useAppointments";
import ConsultantInfo from "@/components/ConsultantInfo";
import { DeleteAppointmentDialog } from "./DeleteAppointmentDialog";

export default function AppointmentsTable() {
  const { appointments, pagination, isLoading, isError, refetch, error } =
    useAppointments();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="overflow-x-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="h-12 px-4 text-right font-semibold">
              مشاور
            </TableHead>
            <TableHead className="h-12 px-4 text-right font-semibold">
              نوع جلسه
            </TableHead>
            <TableHead className="h-12 px-4 text-right font-semibold">
              تاریخ و ساعت
            </TableHead>
            <TableHead className="h-12 px-4 text-right font-semibold">
              وضعیت
            </TableHead>
            <TableHead className="h-12 px-4 text-center font-semibold">
              جزئیات
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isError ? (
            <TableRow>
              <TableCell colSpan={5} className="py-14">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                    <CircleAlert className="size-6 text-destructive" />
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">
                      دریافت اطلاعات با خطا مواجه شد
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {error?.response?.data?.message ||
                        "متأسفانه اطلاعات در حال حاضر قابل دریافت نیست. لطفاً دوباره تلاش کنید."}
                    </p>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => refetch()}>
                    تلاش مجدد
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ) : appointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-14">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <CalendarDays className="size-6 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">
                      هنوز مشاوره‌ای رزرو نکرده‌اید
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      پس از رزرو مشاوره، اطلاعات جلسه در این قسمت نمایش داده
                      می‌شود.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((appointment: AppointmentType) => (
              <TableRow
                key={appointment._id}
                className="transition-colors hover:bg-muted/30"
              >
                <TableCell className="px-4 py-4">
                  {appointment.consultant ? (
                    <ConsultantInfo
                      firstName={appointment.consultant.firstName}
                      lastName={appointment.consultant.lastName}
                      photo={appointment.consultant.photo}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <UserRound className="size-5" />
                      </div>
                      در انتظار تخصیص مشاور
                    </div>
                  )}
                </TableCell>

                <TableCell className="px-4 py-4">
                  <Typebadge type={appointment.type} types={typesMap} />
                </TableCell>

                <TableCell className="px-4 py-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CalendarDays className="size-4 text-muted-foreground" />
                      {convertDate(appointment.appointmentDate)}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock3 className="size-3.5" />
                      {appointment.startAt} تا {appointment.endAt}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-4">
                  <StatusBadge status={appointment.status} />
                </TableCell>

                <TableCell className="px-4 py-4 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label="عملیات مشاوره"
                      >
                        <MoreHorizontalIcon className="size-5" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="min-w-48">
                      <DropdownMenuItem asChild>
                        <Link href={`appointments/${appointment._id}`}>
                          مشاهده جزئیات مشاوره
                        </Link>
                      </DropdownMenuItem>
                      {appointment.status === "pending" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <DeleteAppointmentDialog
                              fullWidth
                              appointmentId={appointment._id}
                            />
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {!isError && pagination && pagination.totalPages > 1 && (
        <div className="border-t border-border px-4 py-3 sm:px-5">
          <PaginationControls
            page={pagination.page}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </div>
  );
}
