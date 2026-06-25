import { useState, useEffect } from 'react';

const Footer = () => {
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
    <footer className="bg-black pt-20 pb-6 border-t border-white/10 overflow-hidden">
      
      {/* Marquee */}
      <div className="relative w-full flex overflow-x-hidden border-y border-white/10 py-4 mb-16 opacity-50">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="text-4xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">•</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">•</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">•</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">•</span>
        </div>
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 absolute top-4">
          <span className="text-4xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">•</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">•</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">•</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">AVAILABLE FOR FREELANCE</span>
          <span className="text-4xl font-serif text-white uppercase tracking-widest">•</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors hover-underline">Twitter (X)</a>
          <a href="https://www.linkedin.com/public-profile/settings/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BEuTs%2FanRRGenDOBMyN%2BQKg%3D%3D" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors hover-underline">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors hover-underline">GitHub</a>
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
    </footer>
  );
};

export default Footer;
