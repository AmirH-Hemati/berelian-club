import { Button } from "@repo/ui";
import { axiosInstance } from "@repo/api";
import { DownloadIcon } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
  fileId: string;
  originalName: string;
  children: React.ReactNode;
};
export default function DownloadButton({
  fileId,
  originalName,
  children,
}: Props) {
  console.log(fileId, originalName);
  async function handleDownloadButton() {
    try {
      const { data } = await axiosInstance.get(
        `/files/downloadById/${fileId}`,
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
    <Button variant="ghost" className=" " onClick={handleDownloadButton}>
      {children}
      <DownloadIcon className="size-4 " />
    </Button>
  );
}
