import type { Request, Response } from "express";
import { ConversationModel } from "../models/conversation.model.js";
import CatchError from "../utils/catchAsync.js";
import type { UserDocument } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const getConversationByRequest = CatchError(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;

    const conversation = await ConversationModel.findOne({ request: requestId })
      .populate("participants", "firstName lastName phoneNumber")
      .populate("lastMessage");

    if (!conversation) {
      return res.status(404).json({
        status: "fail",
        message: "چتی برای این درخواست یافت نشد",
      });
    }
    const user = req.user as UserDocument;
    const hasAccess = conversation.participants.some(
      (p: any) => p._id.toString() === user._id.toString(),
    );

    if (!hasAccess && user.role !== "admin") {
      throw new AppError("شما دسترسی به این چت ندارید", 403);
    }

    res.status(200).json({
      status: "success",
      data: conversation,
    });
  },
);
