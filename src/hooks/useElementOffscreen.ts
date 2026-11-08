import { useEffect, useState } from "react";

/**
 * 指定 id の要素が画面外にあるかを IntersectionObserver で返す。
 * scroll イベントのポーリングを使わない。
 */
export const useElementOffscreen = (elementId: string): boolean => {
  const [isOffscreen, setIsOffscreen] = useState(false);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsOffscreen(!entry.isIntersecting);
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [elementId]);

  return isOffscreen;
};
