import { axiosInstance } from "@repo/api";

export const getConversation = async (requestId: string) => {
  const { data } = await axiosInstance.get(
    `/conversations/request/${requestId}`,
  );
  return data.data;
};

export const getConversationMessages = async (conversationId: string) => {
  const { data } = await axiosInstance.get(`/messages/${conversationId}`);
  return data.data;
};

export const sendMessage = async (conversationId: string, content: string) => {
  const { data } = await axiosInstance.post(`/messages/${conversationId}`, {
    content,
  });
  return data.data;
};
