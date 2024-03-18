import { useEffect } from 'react';

const useIntersectionObserver = (observerRef, scrollContainerRef, callback) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.9 &&
            entry.boundingClientRect.bottom <= entry.rootBounds.bottom
          ) {
            callback();
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 1.0,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, scrollContainerRef, callback]);
};

export default useIntersectionObserver;
