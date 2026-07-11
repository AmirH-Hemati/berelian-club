import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { DownloadIcon } from "lucide-react";
import { toast } from "react-toastify";

type Props = { fileId: string; originalName: string };
export default function DownloadButton({ fileId, originalName }: Props) {
  async function handleDownloadButton() {
    try {
      const { data } = await axiosInstance.get(
        `/userFiles/download/${fileId}`,
        { responseType: "blob" },
      );

      const blobUrl = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
      toast.success("دانلود فایل با موفقیت انجام شد");
    } catch (err: any) {
      toast.error(err.response.data.message || "خطا در دانلود فایل");
    }
  }
  return (
    <Button variant="ghost" onClick={handleDownloadButton}>
      <DownloadIcon className="size-4 " />
      دانلود فایل
    </Button>
  );
}
