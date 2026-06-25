import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PixelCloud = ({ duration, top, delayOffset }) => (
  <div 
    className="absolute pointer-events-none animate-cloud left-0"
    style={{ 
      top, 
      animationDuration: `${duration}s`, 
      animationDelay: `-${delayOffset}s` 
    }}
  >
    <div className="relative">
      <div className="flex">
        <div className="w-4 h-4 bg-white/80"></div>
        <div className="w-4 h-4 bg-white/80"></div>
        <div className="w-4 h-4 bg-white/80"></div>
      </div>
      <div className="flex">
        <div className="w-4 h-4 bg-white/60 -ml-2"></div>
        <div className="w-4 h-4 bg-white/80"></div>
        <div className="w-4 h-4 bg-white/80"></div>
        <div className="w-4 h-4 bg-white/80"></div>
        <div className="w-4 h-4 bg-white/60"></div>
      </div>
    </div>
  </div>
);

const PixelStar = ({ x, y, duration, delay, repeatDelay }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white"
    style={{ left: x, top: y }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay, 
      repeatDelay: repeatDelay,
      ease: "easeInOut" 
    }}
  />
);

const Hero = ({ isDark }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax layers
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const groundY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const titleLetters = "ARMAN SOMANI".split("");

  // Generate random stars for night mode
  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 35}%`,
    delay: Math.random() * 3,
    duration: 1 + Math.random() * 2,
    repeatDelay: Math.random() * 5
  }));

  return (
    <section ref={containerRef} id="home" className="h-screen relative overflow-hidden flex items-center justify-center">
      {/* Sky background — changes with day/night */}
      <motion.div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{ 
          y: skyY,
          background: isDark 
            ? 'linear-gradient(180deg, #0a0a2a 0%, #191970 40%, #1a3a1a 40%, #2d5a2d 42%, #4a3520 42%, #3a2510 60%, #2a2a2a 60%, #1a1a1a 100%)'
            : 'linear-gradient(180deg, #7EC8E3 0%, #B8E4F0 40%, #90D26D 40%, #5D8C3E 42%, #8B6E4E 42%, #7A5E3E 60%, #5A5A5A 60%, #2C2C2C 100%)'
        }}
      />

      {/* Stars (night only) */}
      {isDark && stars.map((star, i) => (
        <PixelStar key={i} x={star.x} y={star.y} duration={star.duration} delay={star.delay} repeatDelay={star.repeatDelay} />
      ))}

      {/* Clouds (day only) */}
      {!isDark && (
        <>
          <PixelCloud delayOffset={0} top="8%" duration={30} />
          <PixelCloud delayOffset={15} top="15%" duration={25} />
          <PixelCloud delayOffset={8} top="5%" duration={35} />
          <PixelCloud delayOffset={20} top="20%" duration={28} />
        </>
      )}

      {/* Sun / Moon */}
      <motion.div 
        className="absolute top-[5%] right-[10%] w-16 h-16 transition-all duration-1000"
        style={{ 
          backgroundColor: isDark ? '#ddd' : '#FCDB05',
          borderColor: isDark ? '#bbb' : '#E5C400',
          boxShadow: isDark 
            ? '0 0 60px rgba(200, 200, 255, 0.3)' 
            : '0 0 60px rgba(252, 219, 5, 0.5)',
          borderWidth: '4px',
          borderStyle: 'solid',
        }}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Main Content with parallax */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 text-center px-4">
        <div className="flex justify-center gap-[2px] sm:gap-1 md:gap-2 mb-4 w-full px-2">
          {titleLetters.map((letter, i) => (
            letter === " " ? (
              <div key={i} className="w-2 sm:w-4 md:w-8"></div>
            ) : (
            <motion.div
              key={i}
              className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[var(--mc-stone)] mc-block flex items-center justify-center cursor-pointer"
              initial={{ y: -300, rotate: -180 }}
              animate={{ y: 0, rotate: 0 }}
              whileHover={{ 
                y: -12, 
                scale: 1.1,
                backgroundColor: '#4AEDD9',
                transition: { type: 'spring', stiffness: 400 }
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 15, 
                delay: 0.5 + (i * 0.15) 
              }}
            >
              <span className="text-sm sm:text-xl md:text-4xl lg:text-5xl font-pixel text-[var(--mc-gold)] select-none" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                {letter}
              </span>
            </motion.div>
            )
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-8"
        >
          <div className="inline-block bg-[#2C2C2C]/90 mc-block px-6 py-3">
            <p className="font-pixel text-[10px] md:text-xs text-[var(--mc-diamond)] tracking-wider">
              FULL STACK DEVELOPER
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 text-xl md:text-3xl text-white max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
        >
          Building digital worlds, one block at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-10 flex justify-center gap-4"
        >
          <motion.a 
            href="#projects" 
            className="mc-btn !text-[10px]"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ⛏ View Projects
          </motion.a>
          <motion.a 
            href="#contact" 
            className="mc-btn !text-[10px] !bg-[var(--mc-emerald)]" 
            style={{ color: '#000', textShadow: 'none' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ✉ Contact Me
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="inline-flex flex-col items-center gap-2">
            <span className="font-pixel text-[7px] text-white/50">SCROLL DOWN</span>
            <div className="w-4 h-6 border-2 border-white/30 rounded-sm flex items-start justify-center p-1">
              <motion.div 
                className="w-1 h-1 bg-white/60"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Ground blocks at bottom with parallax */}
      <motion.div className="absolute bottom-0 left-0 right-0" style={{ y: groundY }}>

        <div className="w-full h-4 bg-[#5D8C3E]" style={{ borderTop: '4px solid #7BB446' }}></div>
        <div className="w-full h-12 bg-[#8B6E4E] mc-texture"></div>
        <div className="w-full h-8 bg-[#7F7F7F] mc-texture"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
