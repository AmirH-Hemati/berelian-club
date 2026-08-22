import type { Request, Response } from "express";

import CatchError from "../../utils/catchAsync.js";

import type { UserDocument } from "../../models/user.model.js";
import { conversationService } from "../../container/index.js";

export const getConversationByRequest = CatchError(
  async (req: Request, res: Response) => {
    const user = req.user as UserDocument;

    const conversation = await conversationService.getConversationByRequest(
      req.params.requestId as string,
      user._id.toString(),
      user.role === "admin",
    );

    return res.status(200).json({
      status: "success",
      data: conversation,
    });
  },
);

export const closeConversation = CatchError(
  async (req: Request, res: Response) => {
    const user = req.user as UserDocument;

    const conversation = await conversationService.closeConversation(
      req.params.conversationId as string,
      user._id.toString(),
      user.role === "admin",
    );

    // io.to(`conv-${conversation._id}`)
    //   .emit("chat-closed", {
    //     conversationId:
    //       conversation._id,
    //   });

    return res.status(200).json({
      status: "success",
      message: "گفتگو با موفقیت بسته شد",
      data: conversation,
    });
  },
);
