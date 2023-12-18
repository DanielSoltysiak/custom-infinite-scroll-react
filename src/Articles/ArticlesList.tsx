import { useInView } from "react-intersection-observer";

import { useEffect } from "react";
import { useArticlesQuery } from "./useArticlesQuery";
import { ArticleTile } from "./ArticleTile";

export const ArticlesList = () => {
  const { ref, inView } = useInView();
  const { data, status, error, hasNextPage, fetchNextPage, isSuccess } =
    useArticlesQuery();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const content =
    isSuccess &&
    data.pages.map((page) =>
      page.articles.map((article, idx) => {
        if (page.articles.length === idx + 1) {
          return <ArticleTile article={article} key={idx} ref={ref} />;
        }
        return <ArticleTile article={article} key={idx} />;
      })
    );

  if (status === "pending") {
    return <p className="text-xl font-bold sm:text-3xl">Loading...</p>;
  }

  if (status === "error") {
    console.log(error);
    return (
      <p className="text-xl font-bold sm:text-3xl">Something went wrong</p>
    );
  }

  return content;
};
