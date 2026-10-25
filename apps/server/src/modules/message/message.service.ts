import { MessageModel } from "../../models/message.model.js";
import { FileModel } from "../../models/file.model.js";

import { AppError } from "../../utils/AppError.js";

import type { ConversationService } from "../conversation/conversation.service.js";
import type { SocketService } from "../socket/socket.service.js";

export class MessageService {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly socketService: SocketService,
  ) {}

  async sendMessage(conversationId: string, senderId: string, content: string) {
    const conversation =
      await this.conversationService.getActiveConversationForParticipant(
        conversationId,
        senderId,
      );

    const receiverId = conversation.participants.find(
      (participant) => participant._id.toString() !== senderId,
    );

    if (!receiverId) {
      throw new AppError("گیرنده یافت نشد", 404);
    }

    const message = await MessageModel.create({
      conversation: conversationId,
      sender: senderId,
      receiver: receiverId,
      content: content.trim(),
      type: "text",
      isRead: false,
    });

    await message.populate("sender", "firstName lastName");

    await this.conversationService.updateLastMessage(
      conversationId,
      message._id.toString(),
    );

    // const receiverSocketId = this.socketService.isUserOnline(
    //   receiverId.toString(),
    // );

    // if (receiverSocketId) {
    // }
    this.socketService.emitNewMessage(conversationId, message);

    return {
      message,
    };
  }

  async getMessages(
    conversationId: string,
    userId: string,
    isAdmin: boolean,
    requestedLimit?: string,
    before?: string,
  ) {
    await this.conversationService.getConversationForParticipant(
      conversationId,
      userId,
      isAdmin,
    );

    const parsedLimit = Number(requestedLimit);

    const limit =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, 50)
        : 30;

    const query: any = {
      conversation: conversationId,
    };

    if (before) {
      const [createdAt, messageId] = before.split("_");

      if (!createdAt || !messageId) {
        throw new AppError("Cursor نامعتبر است", 400);
      }

      query.$or = [
        {
          createdAt: {
            $lt: new Date(createdAt),
          },
        },
        {
          createdAt: new Date(createdAt),
          _id: {
            $lt: messageId,
          },
        },
      ];
    }

    const messages = await MessageModel.find(query)
      .populate("file")
      .populate("sender", "firstName lastName")
      .populate("receiver", "firstName lastName")
      .sort({
        createdAt: -1,
        _id: -1,
      })
      .limit(limit + 1)
      .lean();

    const hasMore = messages.length > limit;

    if (hasMore) {
      messages.pop();
    }

    messages.reverse();

    const oldestMessage = messages[0];

    const nextCursor = oldestMessage
      ? `${oldestMessage.createdAt.toISOString()}_${oldestMessage._id}`
      : null;

    return {
      messages,
      hasMore,
      nextCursor,
    };
  }

  async sendFileMessage(
    conversationId: string,
    senderId: string,
    fileId: string,
  ) {
    const file = await FileModel.findById(fileId);

    if (!file) {
      throw new AppError("فایل یافت نشد", 404);
    }

    const conversation =
      await this.conversationService.getActiveConversationForParticipant(
        conversationId,
        senderId,
      );

    const receiverId = conversation.participants.find(
      (participant) => participant._id.toString() !== senderId,
    );

    if (!receiverId) {
      throw new AppError("گیرنده یافت نشد", 404);
    }

    const message = await MessageModel.create({
      conversation: conversationId,
      sender: senderId,
      receiver: receiverId,
      content: file.originalName,
      type: "file",
      file: file._id,
      isRead: false,
    });

    await message.populate([
      {
        path: "file",
      },
      {
        path: "sender",
        select: "firstName lastName",
      },
    ]);

    await this.conversationService.updateLastMessage(
      conversationId,
      message._id.toString(),
    );

    // const receiverSocketId = this.socketService.isUserOnline(
    //   receiverId.toString(),
    // );

    // if (receiverSocketId) {
    // }
    this.socketService.emitNewMessage(conversationId, message);

    return {
      message,
      receiverId,
    };
  }

  async deleteByConversation(conversationId: string) {
    await MessageModel.deleteMany({
      conversation: conversationId,
    });
  }
}
