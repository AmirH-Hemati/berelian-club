import type { Request, Response } from "express";
import CatchError from "../utils/catchAsync.js";
import type { UserDocument } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { ConversationModel } from "../models/conversation.model.js";
import { MessageModel } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../utils/setupSocket.js";
import { FileModel } from "../models/file.model.js";

export const sendMessage = CatchError(async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const { content } = req.body;
  const senderId = (req.user as UserDocument)._id;

  const conversation = await ConversationModel.findById(conversationId);
  if (!conversation) {
    throw new AppError("مکالمه یافت نشد", 404);
  }

  const isParticipant = conversation.participants.some(
    (p: any) => p._id.toString() === senderId.toString(),
  );
  if (!isParticipant) {
    throw new AppError("شما دسترسی به این مکالمه ندارید", 403);
  }

  if (!conversation.isActive) {
    throw new AppError("این مکالمه بسته شده است", 400);
  }

  const receiverId = conversation.participants.find(
    (p) => p._id.toString() !== senderId.toString(),
  );

  if (!receiverId) {
    throw new AppError("گیرنده یافت نشد", 404);
  }

  const message = await MessageModel.create({
    conversation: conversationId?.toString(),
    sender: senderId,
    receiver: receiverId._id,
    content: content.trim(),
    type: "text",
    isRead: false,
  });

  await message.populate("sender", "firstName lastName");

  conversation.lastMessage = message._id;
  await conversation.save();

  const receiverSocketId = getReceiverSocketId(receiverId._id.toString());
  if (receiverSocketId) {
    io.to(`conv-${conversationId as string}`).emit("newMessage", message);
  }

  res.status(201).json({
    status: "success",
    data: message,
  });
});

export const getMessages = CatchError(async (req: Request, res: Response) => {
  const { conversationId } = req.params;

  const conversation = await ConversationModel.findById(conversationId);
  if (!conversation) {
    throw new AppError("مکالمه یافت نشد", 404);
  }
  const user = req.user as UserDocument;
  const isParticipant = conversation.participants.some(
    (p) => p._id.toString() === user._id.toString(),
  );
  if (!isParticipant && user.role !== "admin") {
    throw new AppError("شما دسترسی به این مکالمه ندارید", 403);
  }

  const messages = await MessageModel.find({ conversation: conversationId })
    .populate("sender", "firstName lastName")
    .populate("receiver", "firstName lastName")
    .sort({ createdAt: 1 });

  res.status(200).json({
    status: "success",
    data: messages,
  });
});

export const sendFileMessage = CatchError(
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const { receiverId, fileId } = req.body;
    const senderId = (req.user as UserDocument)._id;
    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new AppError("فایل یافت نشد", 404);
    }

    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) {
      throw new AppError("مکالمه یافت نشد", 404);
    }

    const message = await MessageModel.create({
      conversation: conversationId?.toString(),
      sender: senderId,
      receiver: receiverId,
      content: file.originalName,
      type: "file",
      file: file._id,
      isRead: false,
    });

    conversation.lastMessage = message._id;
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(`conv-${conversationId as string}`).emit("newMessage", message);
    }

    res.status(201).json({
      status: "success",
      data: message,
    });
  },
);
