import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollSnap() {
  const isScrolling = useRef(false);

  useEffect(() => {
    // 1. Initialize Lenis for general smooth scroll (if they use scrollbar)
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      // We disable native wheel handling in Lenis so we can intercept it manually
      wrapper: window,
      content: document.documentElement,
      wheelEventsTarget: window,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Intercept wheel and touch for section-by-section mandatory snap
    const handleWheel = (e) => {
      e.preventDefault(); // Stop native scrolling
      if (isScrolling.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      snapToNext(direction);
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      e.preventDefault(); // Stop native swipe scrolling
      if (isScrolling.current) return;
      
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) { // Threshold
        const direction = diff > 0 ? 1 : -1;
        snapToNext(direction);
      }
    };

    const snapToNext = (direction) => {
      const sections = Array.from(document.querySelectorAll('section, footer'));
      if (!sections.length) return;

      const currentScroll = window.scrollY;
      let currentIndex = 0;
      let minDiff = Infinity;
      
      sections.forEach((sec, idx) => {
        const diffAbs = Math.abs(sec.offsetTop - currentScroll);
        if (diffAbs < minDiff) {
          minDiff = diffAbs;
          currentIndex = idx;
        }
      });

      let nextIndex = currentIndex + direction;
      nextIndex = Math.max(0, Math.min(nextIndex, sections.length - 1));

      if (nextIndex !== currentIndex) {
        isScrolling.current = true;
        // Smooth scroll to next section using Lenis for premium easing
        lenis.scrollTo(sections[nextIndex], {
          duration: 1.2, // "smoother not faster"
          easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease out
          onComplete: () => {
            // Add a small delay before allowing scroll again to prevent rapid skipping
            setTimeout(() => {
              isScrolling.current = false;
            }, 200);
          }
        });
      }
    };

    // Add non-passive listeners to prevent default scroll
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      lenis.destroy();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
}
