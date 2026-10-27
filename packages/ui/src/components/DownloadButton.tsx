import { Button } from "@repo/ui";
import { axiosInstance } from "@repo/auth";
import { DownloadIcon } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
  fileId: string;
  originalName: string;
  source?: "files" | "userFiles";
  children?: React.ReactNode;
};

export default function DownloadButton({
  fileId,
  originalName,
  source = "files",
  children,
}: Props) {
  async function handleDownloadButton() {
    let blobUrl: string | undefined;

    try {
      const endpoint =
        source === "userFiles"
          ? `/userFiles/downloadById/${fileId}`
          : `/files/downloadById/${fileId}`;

      const { data } = await axiosInstance.get(endpoint, {
        responseType: "blob",
      });

      blobUrl = URL.createObjectURL(data);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = originalName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("دانلود فایل با موفقیت انجام شد");
    } catch (err: any) {
      toast.error("دانلود فایل ناموفق بود");
    } finally {
      if (blobUrl) {
        setTimeout(() => URL.revokeObjectURL(blobUrl!), 1000);
      }
    }
  }

  return (
    <Button
      variant="ghost"
      className="w-full flex justify-start"
      onClick={handleDownloadButton}
    >
      <DownloadIcon className="size-4" />
      {children}
    </Button>
  );
}
