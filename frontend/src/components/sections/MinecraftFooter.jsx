import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MinecraftFooter = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="relative">
      {/* Lava ocean layer */}
      <div className="w-full h-8 relative overflow-hidden">
        <motion.div 
          className="w-[200%] h-full absolute"
          style={{ 
            background: 'repeating-linear-gradient(90deg, #CF4913 0px, #FF6B35 40px, #CF4913 80px)',
            boxShadow: '0 -12px 40px rgba(207, 73, 19, 0.6)'
          }}
          animate={{ x: [0, -80] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Lava bubbles */}
        <motion.div 
          className="absolute top-1 left-[20%] w-2 h-2 bg-[#FF9944] rounded-full"
          animate={{ y: [-4, -12, -4], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.div 
          className="absolute top-1 left-[55%] w-2 h-2 bg-[#FFAA55] rounded-full"
          animate={{ y: [-4, -10, -4], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.7 }}
        />
        <motion.div 
          className="absolute top-2 left-[80%] w-1 h-1 bg-[#FF8833] rounded-full"
          animate={{ y: [-2, -8, -2], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 1.2 }}
        />
      </div>

      {/* Main footer content — BEDROCK */}
      <div className="py-16 px-6 relative mc-tex-bedrock">
        {/* Depth indicator */}
        <div className="absolute top-6 right-6 bg-[#111]/80 mc-block px-3 py-2 z-20">
          <span className="font-pixel text-[7px] text-[var(--mc-redstone)]">Y: 0 — BEDROCK</span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Contact CTA */}
          <div className="text-center mb-16">
            <div className="inline-block bg-[#9C6B30] mc-block p-8 md:p-12">
              <h2 className="font-pixel text-sm md:text-xl text-[var(--mc-gold)] mb-6">
                LET'S BUILD<br/>TOGETHER
              </h2>
              <motion.a 
                href="mailto:hello@portfolio.com" 
                className="mc-btn !text-[10px] !bg-[var(--mc-emerald)] block" 
                style={{ color: '#000', textShadow: 'none' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✉ SEND MESSAGE
              </motion.a>
            </div>
            <div className="mx-auto w-6 h-12 bg-[#6B4226] mc-block"></div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'GitHub', icon: '📦', url: 'https://github.com' },
              { label: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com' },
              { label: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
              { label: 'Email', icon: '✉', url: 'mailto:hello@portfolio.com' },
            ].map((link, i) => (
              <motion.a 
                key={i} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer"
                className="mc-slot p-4 flex flex-col items-center gap-2 hover:bg-[#333] transition-colors"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="font-pixel text-[8px] text-white/70">{link.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t-2 border-[#333] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-pixel text-[7px] text-white/40">
              &copy; {new Date().getFullYear()} ARMAN — ALL RIGHTS RESERVED
            </div>
            <div className="font-pixel text-[7px] text-white/40">
              LOCAL TIME: {time}
            </div>
            <div className="font-pixel text-[7px] text-[var(--mc-gold)]">
              BUILT WITH ❤ AND ⛏
            </div>
          </div>
        </div>
      </div>

      {/* Absolute bottom bedrock — unbreakable */}
      <div className="w-full h-4 relative"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage: 'repeating-conic-gradient(#111 0% 25%, #0a0a0a 0% 50%) 0 0 / 8px 8px',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-pixel text-[5px] text-white/10 tracking-widest">YOU HAVE REACHED THE BOTTOM OF THE WORLD</span>
        </div>
      </div>
    </footer>
  );
};

export default MinecraftFooter;
