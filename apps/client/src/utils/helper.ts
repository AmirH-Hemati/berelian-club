export const convertDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("fa-IR");

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const formatTimeOnly = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
