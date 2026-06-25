import { useEffect, useState } from 'react';
import MagneticButton from '../ui/MagneticButton';

const FooterCurtain = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[800px] w-full bg-[#050505] flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 z-[-1]">
        
        <div className="max-w-7xl mx-auto w-full text-center">
          <span className="block font-sans text-white/40 uppercase tracking-widest text-xs mb-8">
            Let's Collaborate
          </span>
          
          <MagneticButton>
            <h2 className="text-[10vw] font-serif text-white leading-[0.9] hover:italic transition-all duration-500 text-center w-full">
              <a href="mailto:hello@portfolio.com">Say Hello.</a>
            </h2>
          </MagneticButton>
        </div>

        {/* Marquee */}
        <div className="relative w-full flex overflow-x-hidden border-y border-white/10 py-6 my-16 opacity-30 pointer-events-none">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
            <span className="text-6xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">•</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">•</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">•</span>
          </div>
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 absolute top-6">
            <span className="text-6xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">•</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">•</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
            <span className="text-6xl font-serif text-white uppercase tracking-widest">•</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <MagneticButton><a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors">Twitter (X)</a></MagneticButton>
            <MagneticButton><a href="https://www.linkedin.com/in/arman-somani" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors">LinkedIn</a></MagneticButton>
            <MagneticButton><a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors">GitHub</a></MagneticButton>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-white/40 font-sans text-xs tracking-widest">LOCAL TIME: {time}</div>
            <div className="text-white/40 font-sans text-xs tracking-widest">&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.</div>
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}} />
      </div>
    </div>
  );
};

export default FooterCurtain;
