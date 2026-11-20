export function getResourceId(value: unknown): string | null {
  if (!value) return null;

  if (typeof value === "object" && "_id" in value) {
    return String(value._id);
  }

  return String(value);
}
