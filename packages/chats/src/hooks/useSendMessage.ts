import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageApi } from "../services/chat.services";
import { toast } from "react-toastify";

function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: (content: string) => sendMessageApi(conversationId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در بستن گفتگو");
    },
  });

  return { sendMessage, isPending };
}

export default useSendMessage;
