import {
  Children,
  ReactElement,
  cloneElement,
  useCallback,
  useRef,
} from "react";

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
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElem = useCallback(
    (elem: Element) => {
      if (!elem) return;
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });
      observer.current.observe(elem);
    },
    [isLoading, fetchNextPage]
  );

  const childrenWithObserver =
    children &&
    Children.map(children, (child, idx) => {
      if (idx === Children.count(children) - 1) {
        return cloneElement(child, { ref: lastElem });
      }
      return child;
    });

  if (error) {
    console.log(error);
    return errorElement;
  }

  return (
    <>
      {childrenWithObserver}
      {isLoading && loadingElement}
      {!hasNextPage && children && endElement}
    </>
  );
};

export default InfiniteScroll;
