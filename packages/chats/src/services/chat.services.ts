import { axiosInstance } from "@repo/api";

export const getConversation = async (requestId: string) => {
  const { data } = await axiosInstance.get(
    `/conversations/request/${requestId}`,
  );
  return data.data;
};

export const getConversationMessages = async (
  conversationId: string,
  params?: {
    before?: string | null;
  },
) => {
  const { data } = await axiosInstance.get(`/messages/${conversationId}`, {
    params: {
      limit: 15,
      before: params?.before,
    },
  });
  return data.data;
};
export const sendMessage = async (conversationId: string, content: string) => {
  const { data } = await axiosInstance.post(`/messages/${conversationId}`, {
    content,
  });
  return data.data;
};
