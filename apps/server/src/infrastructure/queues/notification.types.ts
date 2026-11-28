export type NotificationJobName =
  | "request-created"
  | "request-approved"
  | "request-completed"
  | "request-rejected";

export type RequestCreatedJobData = {
  requestId: string;
};

export type RequestNotificationJobData = {
  userId: string;
  title: string;
  message: string;
  link: string;
  deduplicationKey: string;
  type: "request_approved" | "request_completed" | "request_rejected";
};

export type RequestApprovedJobData = RequestNotificationJobData & {
  type: "request_approved";
};

export type RequestCompletedJobData = RequestNotificationJobData & {
  type: "request_completed";
};

export type RequestRejectedJobData = RequestNotificationJobData & {
  type: "request_rejected";
};

export type NotificationJobData =
  | RequestCreatedJobData
  | RequestApprovedJobData
  | RequestCompletedJobData
  | RequestRejectedJobData;
