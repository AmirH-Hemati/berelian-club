import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../services/chat.services";
import { useParams } from "next/navigation";

export const useConversation = () => {
  const { requestId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["conversation", requestId],
    queryFn: () => getConversation(requestId as string),
    enabled: !!requestId,
    retry: false,
  });

  return {
    conversation: data,
    isLoading,
  };
};
