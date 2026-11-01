export interface AdminDashboardStats {
  investors: number;
  pendingRequests: number;
  pendingAppointments: number;
  monthlyCompletedRequests: number;
  unreadNotifications: number;
}

export interface ReceptionPerformanceType {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  stats: {
    totalAssigned: number;
    monthlyAssigned: number;
    monthlyCompleted: number;
    inProgress: number;
  };
}

export interface ConsultantPerformanceType {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  stats: {
    monthlyAppointments: number;
    monthlyCompleted: number;
    monthlyApproved: number;
    todayAppointments: number;
  };
}

export interface AdminDashboardType {
  stats: AdminDashboardStats;
  receptionPerformance: ReceptionPerformanceType[];
  consultantPerformance: ConsultantPerformanceType[];
}
