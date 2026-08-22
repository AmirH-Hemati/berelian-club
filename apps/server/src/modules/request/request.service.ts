import RequestModel from "../../models/request.model.js";

import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

import type { ConversationService } from "../conversation/conversation.service.js";
import type { NotificationService } from "../notification/notification.service.js";

export const REQUEST_TYPE_LABELS = {
  renew_contract: "تمدید قرارداد",
  increase_capital: "افزایش سرمایه",
  decrease_capital: "کاهش سرمایه",
} as const;

export class RequestService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly conversationService: ConversationService,
  ) {}

  async approveRequest(requestId: string, adminId: string) {
    const request = await RequestModel.findById(requestId);

    if (!request) {
      throw new AppError("درخواستی یافت نشد", 404);
    }

    if (request.status !== "pending") {
      throw new AppError(
        "این درخواست قبلاً بررسی شده و امکان تایید مجدد آن وجود ندارد",
        400,
      );
    }

    request.status = "approved";

    await request.save();

    const conversation =
      await this.conversationService.createOrActivateForRequest(
        request._id.toString(),
        request.user._id.toString(),
        adminId,
      );

    const requestTypeLabel = REQUEST_TYPE_LABELS[request.type];

    await this.notificationService.send({
      userId: request.user._id.toString(),
      title: "درخواست شما تایید شد",
      message: `درخواست ${requestTypeLabel} شما تأیید شد. برای ادامه گفتگو وارد چت شوید.`,
      type: "request_approved",
      link: `/chat/${request._id}`,
      deduplicationKey: `request-approved-${request._id}`,
    });

    return {
      request,
      conversation,
    };
  }

  async completeRequest(requestId: string) {
    const request = await RequestModel.findById(requestId);

    if (!request) {
      throw new AppError("درخواستی یافت نشد", 404);
    }

    if (request.status !== "approved") {
      throw new AppError("فقط درخواست‌های تایید شده را می‌توان تکمیل کرد", 400);
    }

    request.status = "completed";

    await request.save();

    const conversation =
      await this.conversationService.closeByRequest(requestId);

    await this.notificationService.send({
      userId: request.user._id.toString(),
      title: "درخواست شما تکمیل شد",
      message:
        "درخواست شما با موفقیت تکمیل شد و مکالمه مربوط به این درخواست بسته شد.",
      type: "request_completed",
      link: `/requests/${request._id}`,
      deduplicationKey: `request-completed-${request._id}`,
    });

    return {
      request,
      conversation,
    };
  }
  async rejectRequest(
    requestId: string,
    reason: string | undefined,
    adminId: string,
  ) {
    const request = await RequestModel.findById(requestId);

    if (!request) {
      throw new AppError("درخواستی یافت نشد", 404);
    }

    if (request.status !== "pending") {
      throw new AppError(
        "این درخواست قبلاً بررسی شده و امکان لغو آن وجود ندارد",
        400,
      );
    }

    request.status = "cancelled";

    request.cancellationReason = reason || "کنسل شده توسط ادمین";

    request.cancelledBy = adminId;

    await request.save();

    await this.notificationService.send({
      userId: request.user._id.toString(),
      title: "درخواست شما لغو شد",
      message: `درخواست ${REQUEST_TYPE_LABELS[request.type]} شما لغو شد.`,
      type: "request_rejected",
      link: `/requests/${request._id}`,
      deduplicationKey: `request-cancelled-${request._id}`,
    });

    return request;
  }

  async getUserRequests(userId: string, query: Record<string, unknown>) {
    const features = new ApiFeatures(
      RequestModel.find({
        user: userId,
      }),
      query,
    )
      .filter()
      .search()
      .sort()
      .fields();

    const { total, limit, page, totalPages } = await features.pagination();

    const requests = await features.query;

    return {
      requests,
      pagination: {
        totalPages,
        total,
        limit,
        page,
      },
    };
  }

  async getTodayRequests() {
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();

    endOfDay.setHours(23, 59, 59, 999);

    return RequestModel.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate("user", "firstName lastName phoneNumber email")
      .sort({
        createdAt: -1,
      });
  }
  async countPendingRequests(userId?: string) {
    const filter: Record<string, unknown> = {
      status: "pending",
    };

    if (userId) {
      filter.user = userId;
    }

    return RequestModel.countDocuments(filter);
  }
  async deleteRequest(requestId: string, userId: string, isAdmin: boolean) {
    // const request = await RequestModel.findById(requestId);
    // if (!request) {
    //   throw new AppError("درخواست یافت نشد", 404);
    // }
    // if (!isAdmin && request.user.toString() !== userId) {
    //   throw new AppError("شما دسترسی به این درخواست ندارید", 403);
    // }
    // await this.conversationService.deleteByRequest(requestId);
    // await RequestModel.findByIdAndDelete(requestId);
  }
}
