import { ConversationModel } from "../../models/conversation.model.js";

import { AppError } from "../../utils/AppError.js";

export class ConversationService {
  async findById(conversationId: string) {
    return ConversationModel.findById(conversationId);
  }

  async getConversationByRequest(
    requestId: string,
    userId: string,
    isAdmin: boolean,
  ) {
    const conversation = await ConversationModel.findOne({
      request: requestId,
    });

    if (!conversation) {
      throw new AppError("چتی برای این درخواست یافت نشد", 404);
    }

    this.assertAccess(conversation, userId, isAdmin);

    return conversation;
  }

  async getConversationForParticipant(
    conversationId: string,
    userId: string,
    isAdmin = false,
  ) {
    const conversation = await ConversationModel.findById(conversationId);

    if (!conversation) {
      throw new AppError("مکالمه یافت نشد", 404);
    }

    this.assertAccess(conversation, userId, isAdmin);

    return conversation;
  }

  async getActiveConversationForParticipant(
    conversationId: string,
    userId: string,
  ) {
    const conversation = await this.getConversationForParticipant(
      conversationId,
      userId,
    );

    if (!conversation.isActive) {
      throw new AppError("این مکالمه بسته شده است", 400);
    }

    return conversation;
  }

  async createOrActivateForRequest(
    requestId: string,
    userId: string,
    adminId: string,
  ) {
    let conversation = await ConversationModel.findOne({
      request: requestId,
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [userId, adminId],
        request: requestId,
        isActive: true,
      });
    } else {
      conversation.isActive = true;
      conversation.closedAt = undefined;

      await conversation.save();
    }

    return conversation;
  }

  async closeConversation(
    conversationId: string,
    userId: string,
    isAdmin: boolean,
  ) {
    const conversation = await this.getConversationForParticipant(
      conversationId,
      userId,
      isAdmin,
    );

    if (!conversation.isActive) {
      throw new AppError("این مکالمه قبلاً بسته شده است", 400);
    }

    conversation.isActive = false;
    conversation.closedAt = new Date();

    await conversation.save();

    return conversation;
  }

  async closeByRequest(requestId: string) {
    const conversation = await ConversationModel.findOne({
      request: requestId,
    });

    if (!conversation) {
      return null;
    }

    conversation.isActive = false;
    conversation.closedAt = new Date();

    await conversation.save();

    return conversation;
  }

  async updateLastMessage(conversationId: string, messageId: string) {
    return ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: messageId,
      },
      {
        new: true,
      },
    );
  }

  async findByRequest(requestId: string) {
    return ConversationModel.findOne({
      request: requestId,
    });
  }

  async deleteConversation(conversationId: string) {
    return ConversationModel.findByIdAndDelete(conversationId);
  }

  private assertAccess(conversation: any, userId: string, isAdmin: boolean) {
    if (isAdmin) {
      return;
    }

    const isParticipant = conversation.participants.some(
      (participant: any) => participant._id.toString() === userId,
    );

    if (!isParticipant) {
      throw new AppError("شما دسترسی به این مکالمه ندارید", 403);
    }
  }
}
