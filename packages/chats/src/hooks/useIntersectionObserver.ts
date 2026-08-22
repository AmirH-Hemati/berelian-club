import { useEffect, useRef } from "react";

type Options = IntersectionObserverInit & {
  enabled?: boolean;
};

export function useIntersectionObserver(
  callback: () => void,
  options: Options = {},
) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { enabled = true, root = null, rootMargin, threshold } = options;

  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;

    if (!target) return;

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

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [callback, enabled, root, rootMargin, threshold]);

  return targetRef;
}
