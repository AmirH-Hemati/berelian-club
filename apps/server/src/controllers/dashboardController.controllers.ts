import AppointmentModel from "../models/appointment.model.js";
import FollowUpModel from "../models/followUp.model.js";
import NotificationModel from "../models/notification.model.js";
import RequestModel from "../models/request.model.js";
import type { UserDocument } from "../models/user.model.js";
import userModel from "../models/user.model.js";
import CatchError from "../utils/catchAsync.js";

export const getStats = CatchError(async (req, res) => {
  const userId = (req.user as UserDocument)._id;

  const [user, pendingRequests, unreadNotifications] = await Promise.all([
    userModel.findById(userId),
    RequestModel.countDocuments({
      user: userId,
      status: "pending",
    }),
    NotificationModel.countDocuments({
      user: userId,
      isRead: false,
    }),
  ]);
  res.json({
    status: "success",
    data: {
      activeContractDays: user?.contractDaysRemaining ?? 0,
      pendingRequests,
      unreadNotifications,
      xp: 100,
    },
  });
});

export const getStatsAdminDashboard = CatchError(async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59, 999);

  const [
    pendingRequests,
    pendingAppointment,
    followUpsToday,
    appointmentsToday,
  ] = await Promise.all([
    RequestModel.countDocuments({
      status: "pending",
    }),
    AppointmentModel.countDocuments({
      status: "pending",
    }),
    FollowUpModel.countDocuments({
      isCompleted: false,
      dueDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),
    AppointmentModel.countDocuments({
      status: "approved",
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),
  ]);
  res.json({
    status: "success",
    data: {
      pendingRequests,
      pendingAppointment,
      followUpsToday,
      appointmentsToday,
    },
  });
});
