import type { Request, Response } from "express";
import { ConversationModel } from "../models/conversation.model.js";
import CatchError from "../utils/catchAsync.js";
import type { UserDocument } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const getConversationByRequest = CatchError(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;

    const conversation = await ConversationModel.findOne({
      request: requestId,
    });

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

export const closeConversation = CatchError(
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const userId = (req.user as UserDocument)._id;
    const isAdmin = (req.user as UserDocument).role === "admin";

    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) {
      throw new AppError("مکالمه یافت نشد", 404);
    }

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === userId.toString(),
    );
    if (!isParticipant && !isAdmin) {
      throw new AppError("شما دسترسی به این مکالمه ندارید", 403);
    }

    if (!conversation.isActive) {
      throw new AppError("این مکالمه قبلاً بسته شده است", 400);
    }

    conversation.isActive = false;
    conversation.closedAt = new Date();
    await conversation.save();

    // io.to(`conv-${conversationId}`).emit("chat-closed", { conversationId });

    res.status(200).json({
      status: "success",
      message: "گفتگو با موفقیت بسته شد",
      data: conversation,
    });
  },
);
