import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticles } from "./getArticles";

export const useArticlesQuery = () => {
  const result = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 10 > lastPage.articlesCount) {
        return null;
      }
      return lastPage.prevOffset + 10;
    },
    staleTime: 5000,
    refetchInterval: 60000,
  });

  return result;
};
