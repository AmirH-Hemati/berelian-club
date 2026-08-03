import mongoose from "mongoose";
import type { UserDocument } from "./src/models/user.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

declare module "socket.io" {
  interface Socket {
    userId: string;
    user: UserDocument;
  }
}

export {};
