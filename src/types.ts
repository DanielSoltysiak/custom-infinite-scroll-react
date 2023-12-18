export type ArticlesPage = {
  articles: Array<ArticleData>;
  articlesCount: number;
};

export type ArticleData = {
  author: AuthorData;
  body: string;
  createdAt: string;
  description: string;
  slug: string;
  tagList: Array<string>;
  title: string;
};

type AuthorData = {
  bio: string | null;
  image: string;
  username: string;
};
