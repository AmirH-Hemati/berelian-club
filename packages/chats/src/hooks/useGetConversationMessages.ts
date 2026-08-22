import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversationMessages } from "../services/chat.services";

export function useGetConversationMessages(conversationId: string) {
  const query = useInfiniteQuery({
    queryKey: ["messages", conversationId],

    queryFn: ({ pageParam }) =>
      getConversationMessages(conversationId, {
        before: pageParam,
      }),

    initialPageParam: null as string | null,

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }
      return lastPage.nextCursor;
    },

    enabled: Boolean(conversationId),
  });

  const messages =
    query.data?.pages
      .slice()
      .reverse()
      .flatMap((page) => page.messages) ?? [];

  return {
    messages,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
  };
}
