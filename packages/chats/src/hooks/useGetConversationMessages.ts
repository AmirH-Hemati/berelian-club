import { useQuery } from "@tanstack/react-query";
import { getConversationMessages } from "../services/chat.services";

export function useGetConversationMessages(conversationId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getConversationMessages(conversationId),
  });

  return { messages: data, isLoading };
}
