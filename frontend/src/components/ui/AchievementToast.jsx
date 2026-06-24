import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const achievements = [
  { id: 1, trigger: 0.05, title: 'First Steps', desc: 'You started exploring the portfolio!', icon: '👋' },
  { id: 2, trigger: 0.25, title: 'Getting Deeper', desc: 'You discovered the About section!', icon: '📜' },
  { id: 3, trigger: 0.45, title: 'Skill Check', desc: 'You inspected the inventory!', icon: '⚒' },
  { id: 4, trigger: 0.65, title: 'Time Traveler', desc: 'You reviewed the achievements timeline!', icon: '🏆' },
  { id: 5, trigger: 0.85, title: 'Master Builder', desc: 'You explored all crafted works!', icon: '🔨' },
  { id: 6, trigger: 0.98, title: 'Bedrock Reached', desc: 'You reached the bottom of the world!', icon: '💎' },
];

const AchievementToast = () => {
  const [shown, setShown] = useState(new Set());
  const [active, setActive] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      for (const achievement of achievements) {
        if (scrollPercent >= achievement.trigger && !shown.has(achievement.id)) {
          setShown(prev => new Set([...prev, achievement.id]));
          setActive(achievement);
          setTimeout(() => setActive(null), 5000);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shown]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.id}
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed top-24 right-6 z-[200] max-w-sm"
        >
          <div className="bg-[#2C2C2C] mc-block p-4 flex items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 bg-[var(--mc-gold)]/20 mc-slot flex items-center justify-center text-2xl flex-shrink-0">
              {active.icon}
            </div>
            <div>
              <p className="font-pixel text-[8px] text-[var(--mc-gold)] mb-1">ACHIEVEMENT UNLOCKED!</p>
              <p className="font-pixel text-[9px] text-white">{active.title}</p>
              <p className="text-sm text-white/60 mt-1">{active.desc}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;
