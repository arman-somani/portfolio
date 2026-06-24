import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Creeper = ({ onBlast }) => {
  const [visible, setVisible] = useState(false);
  const [ignited, setIgnited] = useState(false);
  const [side, setSide] = useState('left');

  useEffect(() => {
    // Appear after 30 seconds
    const appearTimer = setTimeout(() => {
      setSide(Math.random() > 0.5 ? 'left' : 'right');
      setVisible(true);
      
      // Auto-ignite after walking in
      setTimeout(() => {
        setIgnited(true);
        
        // Explode after hiss (1.5s)
        setTimeout(() => {
          setVisible(false);
          setIgnited(false);
          if (onBlast) onBlast();
        }, 1500);
        
      }, 2000);
    }, 30000);

    return () => clearTimeout(appearTimer);
  }, [onBlast]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: side === 'left' ? -200 : 200 }}
          animate={{ x: side === 'left' ? 40 : -40 }}
          exit={{ scale: 2, opacity: 0 }}
          transition={{ type: 'tween', duration: 2, ease: 'linear' }}
          className={`fixed bottom-32 z-[150] ${side === 'left' ? 'left-0' : 'right-0'}`}
        >
          {/* Creeper Container */}
          <motion.div 
            className="relative flex flex-col items-center"
            animate={ignited ? { scale: [1, 1.2, 1.1, 1.3, 1.2, 1.4], filter: ['brightness(1)', 'brightness(2)', 'brightness(1)', 'brightness(3)'] } : {}}
            transition={{ duration: 1.5 }}
          >
            {/* Hissing text */}
            {ignited && (
              <motion.div 
                className="absolute -top-8 font-pixel text-white text-xs whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Sssssss...
              </motion.div>
            )}

            {/* Head (8x8 proportion) */}
            <div className="w-16 h-16 bg-[#4CAF50] mc-block relative z-20">
              {/* Eyes */}
              <div className="absolute top-[16px] left-[8px] w-[16px] h-[16px] bg-black"></div>
              <div className="absolute top-[16px] right-[8px] w-[16px] h-[16px] bg-black"></div>
              {/* Mouth */}
              <div className="absolute top-[32px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] bg-black"></div>
              <div className="absolute top-[40px] left-[16px] w-[32px] h-[8px] bg-black"></div>
              <div className="absolute top-[48px] left-[16px] w-[8px] h-[16px] bg-black"></div>
              <div className="absolute top-[48px] right-[16px] w-[8px] h-[16px] bg-black"></div>
              {/* Texture */}
              <div className="absolute inset-0 mc-texture opacity-20 pointer-events-none"></div>
            </div>

            {/* Body (8x12 proportion) */}
            <div className="w-16 h-24 bg-[#3d8c40] border-l-4 border-r-4 border-[#2d6a2f] relative z-10 -mt-1">
              <div className="absolute inset-0 mc-texture opacity-20 pointer-events-none"></div>
            </div>

            {/* Legs Container */}
            <div className="flex justify-between w-20 relative z-0 -mt-2">
              {/* Front Legs */}
              <motion.div 
                className="w-8 h-12 bg-[#2d6a2f] border-b-4 border-black/20"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "top center" }}
              />
              <motion.div 
                className="w-8 h-12 bg-[#2d6a2f] border-b-4 border-black/20"
                animate={{ rotate: [10, -10, 10] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "top center" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Creeper;
