import RequestModel, {
  type RequestDocument,
} from "../../models/request.model.js";

import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

import type { ConversationService } from "../conversation/conversation.service.js";
import type { NotificationService } from "../notification/notification.service.js";
import type { Types } from "mongoose";
import type { UserService } from "../user/user.service.js";
import type { UserDocument } from "../../models/user.model.js";

export const REQUEST_TYPE_LABELS = {
  renew_contract: "تمدید قرارداد",
  increase_capital: "افزایش سرمایه",
  decrease_capital: "کاهش سرمایه",
} as const;

export class RequestService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
  ) {}
  async createRequest(
    userId: string,
    data: Pick<RequestDocument, "type" | "description">,
  ) {
    const request = await RequestModel.create({
      user: userId,
      type: data.type,
      description: data.description,
      status: "pending",
      assignedTo: null,
    });

    const receptions = await this.userService.getUsersByRole("reception");
    const receptionsIds = receptions.map((user) => user._id);

    const notifications = receptionsIds.map((reception) => ({
      userId: reception._id.toString(),
      title: "درخواست جدید",
      message: "یک درخواست جدید ثبت شده است. برای بررسی وارد پنل شوید.",
      type: "request_new" as const,
      link: `/requests/${request._id}`,
      deduplicationKey: `request-new-${request._id}-${reception._id}`,
    }));

    await this.notificationService.sendMany(notifications);

    return request;
  }
  async approveRequest(requestId: string, receptionId: string) {
    const request = await RequestModel.findOneAndUpdate(
      {
        _id: requestId,
        status: "pending",
        assignedTo: null,
      },

      {
        $set: {
          status: "approved",
          assignedTo: receptionId,
          assignedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!request) {
      const existingRequest = await RequestModel.findById(requestId);

      if (!existingRequest) {
        throw new AppError("درخواستی یافت نشد", 404);
      }

      throw new AppError(
        "این درخواست قبلاً توسط پذیرش دیگری بررسی شده است",
        400,
      );
    }

    const conversation =
      await this.conversationService.createOrActivateForRequest(
        request._id.toString(),
        request.user._id.toString(),
        receptionId,
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
    request.completedAt = new Date();
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
    adminId: Types.ObjectId,
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
  async getUnassignedPendingRequests(query: Record<string, unknown>) {
    const features = new ApiFeatures(
      RequestModel.find({
        status: "pending",
        assignedTo: null,
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
        total,
        limit,
        page,
        totalPages,
      },
    };
  }

  async getRequestsAssignedToUser(
    userId: string,
    query: Record<string, unknown>,
  ) {
    const features = new ApiFeatures(
      RequestModel.find({
        assignedTo: userId,
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
        total,
        limit,
        page,
        totalPages,
      },
    };
  }
  async countNewRequests() {
    return RequestModel.countDocuments({
      status: "pending",
      assignedTo: null,
    });
  }

  async countAssignedRequests(userId: string) {
    return RequestModel.countDocuments({
      assignedTo: userId,
    });
  }

  async countMonthlyCompletedRequests(
    userId: string,
    startDate: Date,
    endDate: Date,
  ) {
    return RequestModel.countDocuments({
      assignedTo: userId,
      status: "completed",
      completedAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });
  }
  async getReceptionPerformance(
    receptions: UserDocument[],
    startDate: Date,
    endDate: Date,
  ) {
    const receptionIds = receptions.map((user) => user._id);

    const performance = await RequestModel.aggregate([
      {
        $match: {
          assignedTo: { $in: receptionIds },
        },
      },
      {
        $group: {
          _id: "$assignedTo",

          totalAssigned: {
            $sum: 1,
          },

          monthlyAssigned: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ["$assignedAt", startDate] },
                    { $lt: ["$assignedAt", endDate] },
                  ],
                },
                1,
                0,
              ],
            },
          },

          monthlyCompleted: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "completed"] },
                    { $gte: ["$completedAt", startDate] },
                    { $lt: ["$completedAt", endDate] },
                  ],
                },
                1,
                0,
              ],
            },
          },

          inProgress: {
            $sum: {
              $cond: [{ $eq: ["$status", "approved"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const performanceMap = new Map(
      performance.map((item) => [item._id.toString(), item]),
    );

    return receptions.map((reception) => {
      const stats = performanceMap.get(reception._id.toString());

      return {
        user: reception,
        stats: {
          totalAssigned: stats?.totalAssigned ?? 0,
          monthlyAssigned: stats?.monthlyAssigned ?? 0,
          monthlyCompleted: stats?.monthlyCompleted ?? 0,
          inProgress: stats?.inProgress ?? 0,
        },
      };
    });
  }

  async getYearlyRequestStats(boundaries: Date[]) {
    const result = await RequestModel.aggregate<{
      _id: Date;
      count: number;
    }>([
      {
        $match: {
          createdAt: {
            $gte: boundaries[0],
            $lt: boundaries[12],
          },
        },
      },
      {
        $bucket: {
          groupBy: "$createdAt",
          boundaries,
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    return result.map((item) => ({
      month:
        boundaries.findIndex(
          (boundary) => boundary.getTime() === new Date(item._id).getTime(),
        ) + 1,
      count: item.count,
    }));
  }

  async deleteRequest(requestId: string, userId: string, isAdmin: boolean) {
    const request = await RequestModel.findById(requestId);
    if (!request) {
      throw new AppError("درخواست یافت نشد", 404);
    }
    if (!isAdmin && request.user.toString() !== userId) {
      throw new AppError("شما دسترسی به این درخواست ندارید", 403);
    }
    const conversation =
      await this.conversationService.findByRequest(requestId);
    if (conversation) {
      await this.conversationService.deleteConversation(
        conversation._id.toString(),
      );
    }
    await RequestModel.findByIdAndDelete(requestId);
  }
}
