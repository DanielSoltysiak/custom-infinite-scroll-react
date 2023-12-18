import { Children, ReactElement, cloneElement, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  children?: ReactElement[] | ReactElement;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
  loadingElement: ReactElement;
  error: Error | null;
  errorElement: ReactElement;
  endElement: ReactElement;
}

const InfiniteScroll = ({
  children,
  hasNextPage,
  fetchNextPage,
  isLoading,
  loadingElement,
  error,
  errorElement,
  endElement,
}: Props) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const wrappedChildren =
    children &&
    Children.map(children, (child, idx) => {
      if (idx === Children.count(children) - 3) {
        return cloneElement(child, { ref: ref });
      }
      return child;
    });

  if (error) {
    console.log(error);
    return errorElement;
  }

  return (
    <>
      {wrappedChildren}
      {isLoading && loadingElement}
      {!hasNextPage && children && endElement}
    </>
  );
};

export default InfiniteScroll;
