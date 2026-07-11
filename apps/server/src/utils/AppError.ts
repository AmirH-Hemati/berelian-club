export class AppError extends Error {
  public status: string;
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  }
}
