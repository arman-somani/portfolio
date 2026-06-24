import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const FluidCursor = () => {
  const cursorRef = useRef(null);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20); // Center the 40px cursor
      cursorY.set(e.clientY - 20);
    };

    window.addEventListener('mousemove', moveCursor);

    // Interactive scale effect on clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'scale(2.5)';
        }
      } else {
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'scale(1)';
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      id="fluid-cursor"
      ref={cursorRef}
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="transition-transform duration-300 ease-out"
    />
  );
};

export default FluidCursor;
