import { useInfiniteQuery } from "@tanstack/react-query";

import { getArticles } from "./getArticles";
import { ArticleData } from "./types";

export const ArticlesList = () => {
  const { data, status, error } = useInfiniteQuery({
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

  const articles = data?.pages.reduce<ArticleData[]>((acc, page) => {
    return [...acc, ...page.articles];
  }, []);

  if (status === "pending") {
    return <p className="text-xl font-bold sm:text-3xl">Loading...</p>;
  }

  if (status === "error") {
    console.log(error);
    return (
      <p className="text-xl font-bold sm:text-3xl">Something went wrong</p>
    );
  }

  return articles?.map((article, index) => <p key={index}>{article.title}</p>);
};
