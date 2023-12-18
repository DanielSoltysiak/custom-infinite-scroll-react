import { forwardRef } from "react";
import { ArticleData } from "../types";

interface Props {
  article: ArticleData;
}

export const ArticleTile = forwardRef<HTMLElement, Props>(
  ({ article }, ref) => {
    return <article ref={ref}>{article.title}</article>;
  }
);
