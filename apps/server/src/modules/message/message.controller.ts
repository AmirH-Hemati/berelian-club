import type { Request, Response } from "express";

import CatchError from "../../utils/catchAsync.js";

import type { UserDocument } from "../../models/user.model.js";

import { messageService } from "../../container/index.js";

export const sendMessage = CatchError(async (req: Request, res: Response) => {
  const { conversationId } = req.params;

  const { content } = req.body;

  const senderId = (req.user as UserDocument)._id.toString();

  const { message } = await messageService.sendMessage(
    conversationId as string,
    senderId,
    content,
  );


  return res.status(201).json({
    status: "success",
    data: message,
  });
});

export const getMessages = CatchError(async (req: Request, res: Response) => {
  const user = req.user as UserDocument;

  const result = await messageService.getMessages(
    req.params.conversationId as string,
    user._id.toString(),
    user.role === "admin",
    req.query.limit as string,
    req.query.before as string | undefined,
  );

  return res.status(200).json({
    status: "success",
    data: result,
  });
});

export const sendFileMessage = CatchError(
  async (req: Request, res: Response) => {
    const senderId = (req.user as UserDocument)._id.toString();

    const { message } = await messageService.sendFileMessage(
      req.params.conversationId as string,
      senderId,
      req.body.fileId,
    );

    return res.status(201).json({
      status: "success",
      data: message,
    });
  },
);
