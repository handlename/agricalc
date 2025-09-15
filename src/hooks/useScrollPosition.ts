import { useState, useEffect } from "react";

interface ScrollPosition {
  scrollY: number;
  isAtTop: boolean;
  isScrolling: boolean;
}

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    isAtTop: true,
    isScrolling: false,
  });

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY < 10; // 10px以下を「最上部」とみなす

      setScrollPosition(() => ({
        scrollY: currentScrollY,
        isAtTop,
        isScrolling: true,
      }));

      // スクロール停止の判定（300ms後にisScrollingをfalseに）
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollPosition((prev) => ({
          ...prev,
          isScrolling: false,
        }));
      }, 300);
    };

    // 初期状態を設定
    setScrollPosition({
      scrollY: window.scrollY,
      isAtTop: window.scrollY < 10,
      isScrolling: false,
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return scrollPosition;
};
