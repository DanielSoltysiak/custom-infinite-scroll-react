import { useArticlesQuery } from "./useArticlesQuery";
import { ArticleTile } from "./ArticleTile";
import InfiniteScroll from "../InfiniteScroll";
import { ArticleData } from "../types";
import InfoElem from "./ArticlesListStateInfo";

export const ArticlesList = () => {
  const { data, hasNextPage, fetchNextPage, error, isFetching } =
    useArticlesQuery();

  const articles = data?.pages.reduce<ArticleData[]>((acc, page) => {
    return [...acc, ...page.articles];
  }, []);

  return (
    <InfiniteScroll
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isLoading={isFetching}
      error={error}
      loadingElement={<InfoElem info={"Loading..."} />}
      errorElement={<InfoElem info={"Something went wrong"} />}
      endElement={<InfoElem info={"No more articles"} />}
    >
      {articles?.map((article, index) => (
        <ArticleTile article={article} key={index} />
      ))}
    </InfiniteScroll>
  );
};
