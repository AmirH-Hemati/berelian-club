"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Badge } from "@/components/ui/badge";

import Spinner from "@/components/Spinner";
import { useGetCommentDetails } from "@/features/comments/hooks/useGetCommentDetails";
import CommentDataBox from "@/features/comments/components/CommentDataBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDeleteComment } from "@/features/comments/hooks/useDeleteComment";
export default function Page() {
  const { comment, isLoading } = useGetCommentDetails();
  const { deleteComment, isDeleting } = useDeleteComment();
  const router = useRouter();
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">داشبورد</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/orders">کامنت ها </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>جزیات کامنت</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {comment && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl my-5">
              کامنت {comment._id.slice(0, 6)}#
            </h1>
            <Badge>منتشر شده</Badge>
          </div>
          <CommentDataBox comment={comment} />
        </>
      )}

      <div className="mr-auto my-4 flex gap-2">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="cursor-pointer"
        >
          برگشت به صفحه قبلی
        </Button>
        <Button
          disabled={isDeleting}
          variant="destructive"
          className="cursor-pointer"
          onClick={() => deleteComment(comment?._id)}
        >
          حذف کامنت
        </Button>
      </div>
    </div>
  );
}
