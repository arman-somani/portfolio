import { useScroll, useTransform, motion } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';

const Leaf = ({ index, scrollYProgress }) => {
  // Generate stable random values for this leaf
  const random = useMemo(() => {
    // Math.sin(index) is a simple deterministic pseudo-random generator so hydration matches
    const pseudoRandom = (seed) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    
    return {
      startX: 100 + pseudoRandom(index * 1) * 200, // Starts somewhere in the canopy (x between 100 and 300)
      startY: 50 + pseudoRandom(index * 2) * 150,  // Starts in canopy (y between 50 and 200)
      endYOffset: 600 + pseudoRandom(index * 3) * 600, // How far it falls
      endXOffset: -200 + pseudoRandom(index * 4) * 400, // Sway left or right
      rotStart: pseudoRandom(index * 5) * 360,
      rotEndOffset: 360 + pseudoRandom(index * 6) * 720,
      size: 6 + pseudoRandom(index * 7) * 6,
      color: pseudoRandom(index * 8) > 0.5 ? '#F472B6' : '#FB7185', // pink-400 or rose-400
    };
  }, [index]);

  // Transform scroll progress into animation values!
  // When you scroll down (scrollYProgress -> 1), it moves to end values.
  // When you scroll up (scrollYProgress -> 0), it perfectly interpolates back to start values!
  const y = useTransform(scrollYProgress, [0, 1], [random.startY, random.startY + random.endYOffset]);
  const x = useTransform(scrollYProgress, [0, 1], [random.startX, random.startX + random.endXOffset]);
  const rotate = useTransform(scrollYProgress, [0, 1], [random.rotStart, random.rotStart + random.rotEndOffset]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: random.size,
        height: random.size,
        backgroundColor: random.color,
        borderRadius: '0 50% 50% 50%', // Cute leaf shape
        x: x, 
        y: y,
        rotate: rotate,
        boxShadow: '0 0 5px rgba(244, 114, 182, 0.5)', // Neon pink glow
      }}
    />
  );
};

const ScrollTree = () => {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  // We need to wait for mount to prevent hydration mismatch with the random leaves
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate an array of 50 leaves
  const leaves = Array.from({ length: 50 }).map((_, i) => i);

  return (
    <div className="fixed bottom-0 right-0 w-[400px] h-[500px] pointer-events-none z-50 overflow-visible hidden md:block">
      {/* The Pixel Art Tree Image */}
      {/* mix-blend-screen ensures any white background becomes transparent against our dark theme */}
      <img 
        src="/pixel-tree.png" 
        alt="Pixel Cherry Blossom" 
        className="absolute bottom-0 right-0 w-full h-auto mix-blend-screen opacity-90 drop-shadow-[0_0_15px_rgba(244,114,182,0.3)]"
      />
      
      {/* The Particle System */}
      {leaves.map((i) => (
        <Leaf key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
};

export default ScrollTree;
