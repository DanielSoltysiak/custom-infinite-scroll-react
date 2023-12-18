import { ArticlesPage } from "./types";

const ARTICLES_URL = "https://api.realworld.io/api/articles?limit=10&offset=";

export const getArticles = async ({
  pageParam = 0,
}): Promise<ArticlesPage & { prevOffset: number }> => {
  const res = await fetch(`${ARTICLES_URL}${pageParam}`);
  const data = await res.json();

  return { ...data, prevOffset: pageParam };
};
