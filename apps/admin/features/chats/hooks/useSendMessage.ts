import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageApi } from "../services/chat.services";

function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: (content: string) => sendMessageApi(conversationId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });

  return { sendMessage, isPending };
}

export default useSendMessage;
