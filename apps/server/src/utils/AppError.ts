export class AppError extends Error {
  public status: string;
  public code?: number;
  public errmsg?: string;
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  }
}
