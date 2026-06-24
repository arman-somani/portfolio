import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollMinecart = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  
  // Smooth spring for the cart position
  const smoothX = useSpring(0, { stiffness: 80, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(percent);
      // Convert percent to pixels: 0% → 0px, 100% → (window width - cart width)
      smoothX.set(percent * (window.innerWidth - 64));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [smoothX]);

  // Wheel rotation based on scroll
  const wheelRotation = scrollPercent * 360 * 5;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] pointer-events-none">
      {/* Rail Track */}
      <div className="relative w-full">
        {/* Rail ties (wooden planks) */}
        <div className="w-full h-[16px] relative" style={{
          background: `repeating-linear-gradient(90deg, #6B4226 0px, #6B4226 10px, transparent 10px, transparent 30px)`,
        }}>
          {/* Iron rails */}
          <div className="absolute top-[2px] left-0 right-0 h-[3px] bg-[#999]"></div>
          <div className="absolute bottom-[2px] left-0 right-0 h-[3px] bg-[#999]"></div>
        </div>
        
        {/* Minecart */}
        <motion.div 
          style={{ x: smoothX }}
          className="absolute bottom-[12px] w-[64px] h-[48px]"
        >
          {/* Cart body */}
          <div className="relative w-full h-full">
            <div className="absolute bottom-[16px] left-[4px] right-[4px] h-[28px] bg-[#555] mc-block" 
              style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }}>
              <div className="absolute inset-[4px] bg-[#333]"></div>
            </div>
            
            {/* Wheels — they spin! */}
            <div className="absolute bottom-[4px] left-[8px] w-[12px] h-[12px] bg-[#777] rounded-sm border-2 border-[#555]"
              style={{ transform: `rotate(${wheelRotation}deg)` }}>
              <div className="w-[4px] h-[4px] bg-[#999] absolute top-[2px] left-[2px]"></div>
            </div>
            <div className="absolute bottom-[4px] right-[8px] w-[12px] h-[12px] bg-[#777] rounded-sm border-2 border-[#555]"
              style={{ transform: `rotate(${wheelRotation}deg)` }}>
              <div className="w-[4px] h-[4px] bg-[#999] absolute top-[2px] left-[2px]"></div>
            </div>

            {/* Steve head */}
            <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-[16px] h-[16px]">
              <div className="w-full h-full bg-[#C69C6D] border border-[#6B4226]">
                <div className="absolute top-[2px] left-[2px] w-[4px] h-[4px] bg-[#fff]"></div>
                <div className="absolute top-[2px] right-[2px] w-[4px] h-[4px] bg-[#fff]"></div>
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#4A2F12]"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bedrock base */}
      <div className="w-full h-[8px] bg-[#2C2C2C] mc-texture"></div>
    </div>
  );
};

export default ScrollMinecart;
