import jwt, { type JwtPayload, type SignOptions, } from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";

export class TokenService {
  private readonly secretKey: string;
  private readonly expiresIn: SignOptions["expiresIn"];

  constructor() {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    this.secretKey = process.env.JWT_SECRET_KEY;
    this.expiresIn = "30d";
  }

  generateToken(userId: string): string {
    return jwt.sign({ id: userId }, this.secretKey, {
      expiresIn: this.expiresIn,
    });
  }

  verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secretKey);

      if (typeof decoded === "string" || !decoded.id) {
        throw new AppError("توکن نامعتبر است", 401);
      }

      return decoded;
    } catch {
      throw new AppError("توکن نامعتبر یا منقضی شده است", 401);
    }
  }
}
