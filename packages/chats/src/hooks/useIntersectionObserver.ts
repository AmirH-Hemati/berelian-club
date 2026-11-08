import { useEffect, useRef } from "react";

type Options = IntersectionObserverInit & {
  enabled?: boolean;
  root?: Element | null;
};

export function useIntersectionObserver(
  callback: () => void,
  options: Options = {},
) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { enabled = true, root = null, rootMargin, threshold } = options;

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          callback();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, enabled, root, rootMargin, threshold]);

  return targetRef;
}
