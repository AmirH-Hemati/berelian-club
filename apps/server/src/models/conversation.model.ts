import mongoose, { Query } from "mongoose";

export interface ConversationDocument extends mongoose.Document {
  participants: mongoose.Types.ObjectId[];
  request: mongoose.Types.ObjectId;
  isActive: boolean;
  lastMessage?: mongoose.Types.ObjectId;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new mongoose.Schema<ConversationDocument>(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    closedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

conversationSchema.pre<Query<ConversationDocument, ConversationDocument>>(
  /^find/,
  function () {
    this.populate("participants", "firstName lastName phoneNumber").populate(
      "lastMessage",
    );
  },
);

export const ConversationModel = mongoose.model<ConversationDocument>(
  "Conversation",
  conversationSchema,
);
