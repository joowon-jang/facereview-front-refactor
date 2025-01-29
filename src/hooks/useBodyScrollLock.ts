import { useCallback, useLayoutEffect, useRef } from 'react';

export default function useBodyScrollLock(isOpen: boolean) {
  const scrollYRef = useRef(0); // 스크롤 위치 저장

  const lockScroll = useCallback(() => {
    scrollYRef.current = window.scrollY; // 현재 스크롤 위치 저장

    document.body.style.cssText = `
      position: fixed;
      top: -${scrollYRef.current}px;
      width: 100%;
      overflow: hidden;
    `;
  }, []);

  const openScroll = useCallback(() => {
    document.body.style.cssText = '';
    window.scrollTo(0, scrollYRef.current); // 저장된 위치로 복귀
  }, []);

  useLayoutEffect(() => {
    if (isOpen) lockScroll();
    else openScroll();
  }, [isOpen, lockScroll, openScroll]);

  return null;
}
