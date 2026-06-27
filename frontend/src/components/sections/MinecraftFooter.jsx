import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import Creeper from '../ui/Creeper';

const MinecraftFooter = () => {
  const [time, setTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCreeper, setShowCreeper] = useState(false);
  const [isBlownUp, setIsBlownUp] = useState(false);
  const [explosionFlash, setExplosionFlash] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setShowCreeper(true);
    setIsBlownUp(false);
  };

  const handleCreeperBlast = async () => {
    setShowCreeper(false);
    setExplosionFlash(true);
    setIsBlownUp(true);
    
    // Hide flash after a bit
    setTimeout(() => setExplosionFlash(false), 800);

    try {
      // Wait for both the API call and a 5-second minimum delay
      await Promise.all([
        api.post('/contact', formData),
        new Promise(resolve => setTimeout(resolve, 5000))
      ]);
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
        setIsBlownUp(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || 'UNKNOWN ERROR';
      setErrorMessage(msg.toUpperCase());
      setStatus('error');
      setIsBlownUp(false);
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

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

      {/* Explosion Flash Overlay */}
      <AnimatePresence>
        {explosionFlash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-[999] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main footer content — BEDROCK */}
      <div className="py-16 px-6 relative mc-tex-bedrock">
        {/* Depth indicator */}
        <div className="absolute top-6 right-6 bg-[#111]/80 mc-block px-3 py-2 z-20">
          <span className="font-pixel text-[7px] text-[var(--mc-redstone)]">Y: 0 — BEDROCK</span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">

          {/* Contact CTA */}
          <div className="text-center mb-16 relative">
            {!isBlownUp ? (
              <motion.div 
                className="inline-block bg-[#9C6B30] mc-block p-6 md:p-10 w-full max-w-lg"
                animate={showCreeper ? { x: [-8, 8, -8, 8, 0], transition: { repeat: Infinity, duration: 0.1 } } : {}}
              >
                <h2 className="font-pixel text-sm md:text-xl text-[var(--mc-gold)] mb-6">
                  LET'S BUILD<br />TOGETHER
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  <input
                    type="text"
                    placeholder="NAME"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#222] border-2 border-[#111] border-b-[#444] border-r-[#444] text-white p-3 font-pixel text-[10px] md:text-xs outline-none focus:border-[var(--mc-diamond)] w-full"
                  />
                  <input
                    type="email"
                    placeholder="EMAIL"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#222] border-2 border-[#111] border-b-[#444] border-r-[#444] text-white p-3 font-pixel text-[10px] md:text-xs outline-none focus:border-[var(--mc-diamond)] w-full"
                  />
                  <input
                    type="text"
                    placeholder="SUBJECT"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-[#222] border-2 border-[#111] border-b-[#444] border-r-[#444] text-white p-3 font-pixel text-[10px] md:text-xs outline-none focus:border-[var(--mc-diamond)] w-full"
                  />
                  <textarea
                    placeholder="MESSAGE"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#222] border-2 border-[#111] border-b-[#444] border-r-[#444] text-white p-3 font-pixel text-[10px] md:text-xs outline-none focus:border-[var(--mc-diamond)] w-full resize-none"
                  />

                  {status === 'error' && <div className="text-[var(--mc-redstone)] font-pixel text-[10px] text-center mt-2">ERROR: {errorMessage}</div>}

                  <div className="relative w-full">
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`mc-btn !text-[10px] !bg-[var(--mc-emerald)] block w-full mt-4 ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ color: '#000', textShadow: 'none' }}
                      whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                      whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                    >
                      {status === 'loading' ? 'SENDING...' : '✉ SEND MESSAGE'}
                    </motion.button>
                    {showCreeper && (
                      <Creeper 
                        delay={0} 
                        onBlast={handleCreeperBlast} 
                        className="absolute bottom-0 z-[150] pointer-events-none" 
                        initialX={300} 
                        targetX={20} 
                      />
                    )}
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="inline-flex flex-col items-center justify-center bg-[#111]/80 border-4 border-dashed border-[#333] p-6 md:p-10 w-full max-w-lg min-h-[400px]">
                {status === 'loading' && <div className="font-pixel text-[12px] text-white/50 animate-pulse text-center">SENDING THROUGH THE NETHER...</div>}
                {status === 'success' && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="text-[var(--mc-emerald)] font-pixel text-sm md:text-lg text-center leading-loose"
                  >
                    MESSAGE<br />SENT<br />SUCCESSFULLY!
                  </motion.div>
                )}
              </div>
            )}
            {!isBlownUp && <div className="mx-auto w-6 h-12 bg-[#6B4226] mc-block"></div>}
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            {[
              { label: 'GitHub', icon: '📦', url: 'https://github.com/arman-somani' },
              { label: 'LinkedIn', icon: '🔗', url: 'https://www.linkedin.com/in/arman-somani' },
              { label: 'Email', icon: '✉', url: 'mailto:armansomani786@gmail.com' },
              { label: 'Instagram', icon: '📸', url: 'https://www.instagram.com/arman_somani' },
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
