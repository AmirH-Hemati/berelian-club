export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("fa-IR");
}
export function formatToman(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان ";
}
export function formatTime(time: string | Date) {
  return new Date(time).toLocaleDateString("fa-IR");
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
