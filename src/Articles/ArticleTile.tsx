import { forwardRef } from "react";
import { ArticleData } from "../types";

interface Props {
  article: ArticleData;
}

export const ArticleTile = forwardRef<HTMLElement, Props>(
  ({ article }, ref) => {
    const { title, description, author } = article;

    return (
      <article ref={ref} className="mb-8 border-2 p-2 rounded-md">
        <h3 className="mb-1 text-xl font-bold sm:text-2xl truncate">{title}</h3>
        <p className="mb-1 text-sm sm:text-lg">Author: {author.username}</p>
        <p className="mb-1 text-sm sm:text-lg">{description}</p>
      </article>
    );
  }
);
